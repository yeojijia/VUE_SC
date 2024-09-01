import BigNumber from "bignumber.js";
export default {
  //获取某种代币的数量  传入参数：1，token的合约地址
  async getBalance(tokenAddress) {
    const { ERC20ABI, accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(ERC20ABI, tokenAddress)
    let balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });

    let _Decimals = await this.wallet.getTokenDecimals(tokenAddress);
    balance = this.getValueDivided(balance, 10 ** _Decimals);

    return balance;
  },
  //转账
  async transfer({ decimal, tokenAddress, toAddress, amount }) {
    const { ERC20ABI, accountAddress } = this.wallet.getData()
    let value = this.getValueMultip(amount, 10 ** decimal)
    let contract = this.wallet.contractCreated(ERC20ABI, tokenAddress);
    return new Promise((resolve, reject) => {
      contract.methods.transfer(toAddress, value).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })
    })


  },
  //获取某种代币的精度  传入参数：1，token的合约地址
  async getTokenDecimals({ contract, accountAddress }) {
    try {
      const _decimals = await contract.methods
        .decimals()
        .call({ from: accountAddress });

      return Promise.resolve(_decimals);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  //除法
  getValueDivided(value, value2) {
    let bg1 = new BigNumber(value);
    let bg2 = new BigNumber(value2);
    let amount = bg1.dividedBy(bg2).toFixed();
    return amount;
  },
  //乘法
  getValueMultip(value, value2) {
    let params1 = new BigNumber(value);
    let valueDecimals = params1.multipliedBy(value2).toFixed();
    return valueDecimals;
  },
  // 减法
  getValueMinus(value, value2) {
    let bg1 = new BigNumber(value);
    let bg2 = new BigNumber(value2);
    let amount = bg1.minus(bg2).toFixed();
    return amount;
  },
  //加法
  getValueAdd(value, value2) {
    var bg1 = new BigNumber(value);
    var bg2 = new BigNumber(value2);
    let amount = bg1.plus(bg2).toFixed();
    return amount;
  },
}