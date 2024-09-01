import TronWeb from "tronweb";
import USDTABI from "../abi/usdtAbi.json";
import ERC20ABI from "../abi/erc20.json";
export default class Wallet {
  connectIsLoading = false
  accountAddress = '';
  tronWeb = null;
  instance = null;
  tokenDecimals = 0;
  usdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // Base58格式 可转成十六进制
  init = false
  initLoading = false
  //初始化
  async walletInit() {
    if (this.init || this.initLoading) {
      return
    }
    this.initLoading = true

    return new Promise((resolve, reject) => {
      let num = 0;
      const Interval = setInterval(async () => {
        num++;
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(Interval);
          this.tronWeb = window.tronWeb;
          this.accountAddress = this.tronWeb.defaultAddress.base58;
          resolve()
          this.init = true
          this.initLoading = false
        } else {
          if (num > 100) {
            clearInterval(Interval);
            this.initLoading = false
            reject();
            // Toast("Please switch to the trx chain for betting!");
          }
        }
      }, 10);
    })
  }
  //链接钱包
  async connectWallet() {
    if (this.connectIsLoading) return
    this.connectIsLoading = true

    return new Promise(async (resolve, reject) => {
      if (this.tronWeb === null) {
        try {
          await this.walletInit()
          this.accountAddress = this.tronWeb.defaultAddress.base58
          resolve(this.accountAddress)
          this.connectIsLoading = false
        } catch (error) {
          reject(error)
          this.connectIsLoading = false
          return
        }
      }

      // try {
      //   const res = await window.tronLink.request({ method: 'tron_requestAccounts' })

      //   if (res.code === 200) {
      //     this.accountAddress = this.tronWeb.defaultAddress.base58
      //     resolve(this.accountAddress)
      //     this.connectIsLoading = false
      //   } else {
      //     reject(res)
      //     this.connectIsLoading = false
      //   }
      // } catch (error) {
      //   reject(error)
      // }


    });
  }
  //获取签名
  async getSignature(signKey) {
    return new Promise(async (resolve, reject) => {
      try {
        const HexStr = this.tronWeb.toHex(signKey);
        let signature = await this.tronWeb.trx.sign(HexStr);
        resolve(signature);
      } catch (error) {
        reject(error)
      }
    });
  }
  //监听钱包

  async connectWatch() {
    return new Promise((resolve, reject) => {
      try {
        window.addEventListener('message', (e) => {

          if (e.data.message && e.data.message.action == "disconnect") {
            resolve()
          }
          if (e.data.message && e.data.message.action == "changeNetWork") {
            resolve()
          }
          if (e.data.message && e.data.message.action == "accountsChanged") {
            resolve()
          }
          if (e.data.message && e.data.message.action == "selectAccount") {
            resolve()
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  //是否链接
  isConnect() {
    if (!window.tronWeb.defaultAddress) {
      spop({
        template: 'Please connect wallet',
        style: 'warning',
        autoclose: 2000
      })
      return false
    } else {
      return true
    }
  }
  //余额
  async getBalance(tokenAddress) {
    if (!tokenAddress) {
      tokenAddress = this.usdtContract
    }
    try {
      let contract = await this.tronWeb.contract(
        USDTABI,
        tokenAddress
      );
      let _decimals = await contract.decimals().call(); // 获取精度
      let res = await contract.balanceOf(this.accountAddress).call();
      const val = this.tronWeb.toBigNumber(res._hex);
      return val.toNumber() / Math.pow(10, _decimals);
    } catch (error) {
      return ''
    }
  }
  async getBalanceOf(tokenAddress) {
    try {
      let contract = await this.tronWeb.contract(
        ERC20ABI,
        tokenAddress
      );

      let _decimals = await contract.decimals().call(); // 获取精度
      let res = await contract.balanceOf(this.accountAddress).call();
      const val = this.tronWeb.toBigNumber(res._hex);
      return val.toNumber() / Math.pow(10, _decimals);
    } catch (error) {
      return ''
    }
  }
  //钱包初始化
  async tronStart() {
    const fullNode = "https://testhttpapi.tronex.io";
    const solidityNode = "https://testhttpapi.tronex.io";
    const eventServer = "https://testhttpapi.tronex.io";
    const sideOptions = {
      fullNode: "https://suntest.tronex.io",
      solidityNode: "https://suntest.tronex.io",
      eventServer: "https://suntest.tronex.io",
      mainGatewayAddress: "TFLtPoEtVJBMcj6kZPrQrwEdM3W3shxsBU",
      sideGatewayAddress: "TRDepx5KoQ8oNbFVZ5sogwUxtdYmATDRgX",
      sideChainId: "413AF23F37DA0D48234FDD43D89931E98E1144481B",
    };
    this.tronWeb = new TronWeb(fullNode, solidityNode, eventServer, {
      fullNode: sideOptions.fullNode,
      solidityNode: sideOptions.solidityNode,
      eventServer: sideOptions.eventServer,
      mainGatewayAddress: sideOptions.mainGatewayAddress,
      sideGatewayAddress: sideOptions.sideGatewayAddress,
      sideChainId: sideOptions.sideChainId,
    });
    this.instance = await this.tronWeb.contract(USDTABI, this.usdtContract);
  }

  //转账
  async sendTrx({ toAddress, amount, tokenAddress }) {
    if (!tokenAddress) {
      tokenAddress = this.usdtContract
    }
    let contract = await this.tronWeb.contract(
      USDTABI,
      tokenAddress
    );
    let _decimals = await contract.decimals().call(); // 获取精度
    let _amount = 0;
    if (_decimals > 6) {
      _amount = amount * 1000000;
      for (let i = 0; i < _decimals - 6; i++) {
        _amount = _amount + "0";
      }
    } else {
      _amount = amount * 10 ** _decimals;
    }
    let res = await contract["transfer"](toAddress, _amount);
    return new Promise((resolve, reject) => {
      res.send({
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: false,
      }).then(res => {
        resolve(res)
      }, err => {
        let message = err
        if (err.message) {
          message = err.message
        }
        reject()
      })
    })
  }
}
