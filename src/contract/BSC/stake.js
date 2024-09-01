
import StakingPoolABI from '../abi/StakingPoolAbi.json'
export default {
  //获取授权额度
  async getStakeAllowance(tokenAddress, spenderAddress) {
    const { ERC20ABI, accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(ERC20ABI, tokenAddress)
    let allowance = await contract.methods.allowance(accountAddress, spenderAddress).call({ from: accountAddress });
    let _Decimals = await this.wallet.getTokenDecimals(tokenAddress);
    allowance = this.getValueDivided(allowance, 10 ** _Decimals);
    return Promise.resolve(allowance)
  },
  //获取用户信息
  async getStakeUserInfo(stakePoolContract, pid, pledgeTokenAddress) {
    const { accountAddress } = this.wallet.getData()
    let pledgeDecimals = await this.wallet.getTokenDecimals(pledgeTokenAddress);
    let contract = this.wallet.contractCreated(StakingPoolABI, stakePoolContract)

    let info = await contract.methods.userInfo(pid, accountAddress).call({ from: accountAddress });
    let amount = this.getValueDivided(info.amount, 10 ** pledgeDecimals)

    let _lockAmount = await contract.methods.lockedToken(pid, accountAddress).call({ from: accountAddress });
    let lockAmount = this.getValueDivided(_lockAmount, 10 ** pledgeDecimals)

    let poolInfo = await contract.methods.poolInfo(pid).call({ from: accountAddress })
    let totalPool = this.getValueDivided(poolInfo.totalAmount, 10 ** pledgeDecimals)
    let myRate = Number(totalPool) ? (Number(amount) / Number(totalPool)) * 100 : 0
    let _lending = await contract.methods.pendingLend(pid, accountAddress).call({ from: accountAddress });
    let lending = this.getValueDivided(_lending, 10 ** pledgeDecimals)

    let _maxlend = await contract.methods.maxLendAllowed(pid, accountAddress).call({ from: accountAddress });
    let maxlend = this.getValueDivided(_maxlend, 10 ** pledgeDecimals)

    // 可赎回

    let _canWithdrawAmount = await contract.methods.maxWithdrawQuota(pid, accountAddress).call({ from: accountAddress });
    let canWithdrawAmount = this.getValueDivided(_canWithdrawAmount, 10 ** pledgeDecimals)

    return Promise.resolve({ amount, lockAmount, totalPool, myRate, lending, maxlend, canWithdrawAmount })
  },
  //获取用户借贷信息
  getUserLendInfo({ contractAddress }) {
    let contract = this.wallet.contractCreated(StakingPoolABI, contractAddress)
  },
  //查询用户订单借贷信息
  async getUserLendOrderInfo({ contractAddress, pid, orderId }) {
    const { accountAddress } = this.wallet.getData()
    let decimals = 18// await this.wallet.getTokenDecimals(tokenAddress);
    let contract = this.wallet.contractCreated(StakingPoolABI, contractAddress)
    let info = await contract.methods.userLendingInfo(pid, accountAddress, orderId).call({ from: accountAddress });
    let lendAmount = this.getValueDivided(info.amount, 10 ** decimals)
    let repayAmount = this.getValueDivided(info.repayAmount, 10 ** decimals)
    return Promise.resolve({ orderTime: info.orderTime, lendAmount, repayAmount, status: info.status })
  },

  //借贷
  async setLend({ pid, amount, stakePoolContract, pledgeTokenAddress }) {
    const { accountAddress } = this.wallet.getData()
    let pledgeDecimals = await this.wallet.getTokenDecimals(pledgeTokenAddress);
    let contract = this.wallet.contractCreated(StakingPoolABI, stakePoolContract)
    let _amount = this.getValueMultip(amount, 10 ** pledgeDecimals)
    return new Promise((resolve, reject) => {
      contract.methods.lend(pid, _amount).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  },

  //还款
  async repay({ pid, payPid, payTokenAmount, lendIndex, contractAddress, payTokenAddress }) {
    const { accountAddress } = this.wallet.getData()
    let pledgeDecimals = await this.wallet.getTokenDecimals(payTokenAddress);
    let contract = this.wallet.contractCreated(StakingPoolABI, contractAddress)
    let _amount = this.getValueMultip(payTokenAmount, 10 ** pledgeDecimals)
    return new Promise((resolve, reject) => {
      contract.methods.repay(pid, payPid, _amount, lendIndex).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  },

  // 查询待领取额度
  async getStakePending(stakePoolContract, pid, rewardTokenAddress) {
    const { accountAddress } = this.wallet.getData()
    let rewardDecimals = await this.wallet.getTokenDecimals(rewardTokenAddress);
    let contract = this.wallet.contractCreated(StakingPoolABI, stakePoolContract)
    let info = await contract.methods.pending(pid, accountAddress).call({ from: accountAddress });
    let amount = this.getValueDivided(info['0'], 10 ** rewardDecimals)
    return Promise.resolve(amount)
  },
  //授权
  async stakeApprove(tokenAddress, spenderAddress, amount) {
    const { accountAddress, ERC20ABI } = this.wallet.getData()
    let contract = this.wallet.contractCreated(ERC20ABI, tokenAddress)
    return new Promise((resolve, reject) => {
      contract.methods.approve(spenderAddress, amount).send({ from: accountAddress })
        .on('receipt', (receipt) => {//授权成功
          resolve(receipt)
        })
        .on('error', (error) => {//失败或拒绝
          reject(error)
        })
    })
  },
  // deposit 参数： 池子id---pid---amount amount传0代表领取
  async stakeDepositAndClaim({ stakePoolContract, pid, amount }) {
    const { accountAddress } = this.wallet.getData()
    let contract = this.wallet.contractCreated(StakingPoolABI, stakePoolContract)
    return new Promise((resolve, reject) => {
      contract.methods.deposit(pid, amount).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)

        })
        .on('error', (error) => {
          reject(error)
        })
    })
  },
  //发起质押
  async stakePledge({ lpTokenAddress, pledgeVal, stakePoolContract, pid }) {
    let decimal = await this.wallet.getTokenDecimals(lpTokenAddress)
    let amount = this.getValueMultip(pledgeVal, 10 ** decimal)
    return await this.stakeDepositAndClaim({ stakePoolContract, pid, amount })
  },

  //单币质押的取回功能  withdraw
  //参数：同上
  async stakeWithDraw({ lpTokenAddress, ransomVal, stakePoolContract, pid }) {
    const { accountAddress } = this.wallet.getData()
    let decimal = await this.wallet.getTokenDecimals(lpTokenAddress)
    let amount = this.getValueMultip(ransomVal, 10 ** decimal)
    let contract = this.wallet.contractCreated(StakingPoolABI, stakePoolContract)
    return new Promise((resolve, reject) => {
      contract.methods.withdraw(pid, amount).send({ from: accountAddress })
        .on('receipt', (receipt) => {
          resolve(receipt)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  },
}