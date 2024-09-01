import SWAPABI from '../abi/swapAbi.json'
import USDTABI from '../abi/usdtAbi.json'
export default {
  //获取最小兑换数量
  async getSwapMinAmount(swapAddress) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(SWAPABI, swapAddress)
    let decimal = await this.wallet.getTokenDecimals(swapAddress)
    const _min_amount = await contract.methods.MINIMAL_U().call({ from: accountAddress });
    const min_amount = this.getValueDivided(_min_amount, 10 ** decimal);

    return Promise.resolve(min_amount)
  },
  //获取授权额度
  async getSwapAllowance({ spenderAddress, swapAddress }) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(USDTABI, spenderAddress)
    let allowance = await contract.methods.allowance(accountAddress, swapAddress).call({ from: accountAddress });
    let _Decimals = await this.wallet.getTokenDecimals(spenderAddress);
    allowance = this.getValueDivided(allowance, 10 ** _Decimals);
    return Promise.resolve(allowance)
  },
  //授权
  async swapApprove({ spenderAddress, swapAddress, amount }) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(USDTABI, spenderAddress)
    return new Promise((resolve, reject) => {
      contract.methods.approve(swapAddress, amount).send({ from: accountAddress })
        .on('receipt', (receipt) => {//授权成功
          resolve(receipt)
        })
        .on('error', (error) => {//失败或拒绝
          reject(error)
        })
    })
  },
  //一种币兑换另一种币的数量
  async getTokenToTokenAmount({ swapAddress, tokenAddress, amount, type }) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(SWAPABI, swapAddress)
    let decimal = await this.wallet.getTokenDecimals(swapAddress)
    let _inp_amount = this.getValueMultip(amount, 10 ** decimal)
    let _out_amount = null
    if (type === 'USDT') {
      _out_amount = await contract.methods.amountUFromToken(tokenAddress, _inp_amount).call({ from: accountAddress });
    } else {
      _out_amount = await contract.methods.amountTokenForU(tokenAddress, _inp_amount).call({ from: accountAddress });
    }
    const out_amount = this.getValueDivided(_out_amount, 10 ** decimal);
    return Promise.resolve(out_amount)
  },

  //兑换交易
  async exchangeTran({ swapAddress, tokenAddress, amount, type }) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(SWAPABI, swapAddress)
    let decimal = await this.wallet.getTokenDecimals(tokenAddress)
    let _amount = this.getValueMultip(amount, 10 ** decimal)
    if (type === 'USDT') {
      return this.depositSwap({ contract, tokenAddress, accountAddress, amount: _amount })
    } else {
      return this.withdrawSwap({ contract, tokenAddress, accountAddress, amount: _amount })
    }

  },

  //存usdt得ut
  async depositSwap({ contract, tokenAddress, accountAddress, amount }) {
    return new Promise((resolve, reject) => {
      contract.methods.deposit(tokenAddress, amount, accountAddress).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })

    })
  },
  //存ut得usdt
  async withdrawSwap({ contract, tokenAddress, accountAddress, amount }) {

    return new Promise((resolve, reject) => {
      contract.methods.withdraw(tokenAddress, amount, accountAddress).send({ from: accountAddress })

        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })

    })
  },

}