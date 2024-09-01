import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import ERC20ABI from "../abi/erc20.json";
import { ethers } from "ethers";
export default class Wallet {
  constructor() {
    this.web3ModalObj = null;
    this.web3Provider = null;
    this.web3 = null;
    this.provider = null;
    this.accountAddress = null;
    this.connectIsLoading = false
    this.initLoading = false
    this.init = false
  }

  getData() {
    return {
      web3: this.web3,
      accountAddress: this.accountAddress,
      ERC20ABI: ERC20ABI,
    };
  }

  connect() {
    return new Promise(async (resolve, reject) => {
      try {
        //检查运行环境
        if (typeof window.ethereum !== "undefined") {
          const { ethereum } = window;
          if (ethereum.networkVersion !== "56" && ethereum.chainId !== "0x38") {
            await this.changeMainet();
          }
          if (this.web3Provider === null) {
            this.web3ModalCreated();
            this.web3Provider = await this.web3ModalObj.connect();
          }
          this.web3 = new Web3(this.web3Provider);
          this.provider = new ethers.providers.Web3Provider(this.web3Provider);
          const accounts = await this.web3.eth.getAccounts();

          this.accountAddress = accounts[0]
          resolve(this.accountAddress)
        } else {
          reject()
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  bitKepConnect() {
    return new Promise(async (resolve, reject) => {
      const provider = window.bitkeep && window.bitkeep.ethereum;
      if (!provider) {
        //安装 BitKeep
        reject('没安装BitKeep')
        return
      }
      this.web3Provider = provider
      this.isConnected = this.web3Provider.isConnected();
      await this.changeMainetBitKeep();
      this.web3Provider.request({ method: 'eth_requestAccounts' })
        .then(async () => {
          this.web3 = new Web3(this.web3Provider);
          const [address] = await this.web3Provider.request({ method: 'eth_requestAccounts' });
          this.accountAddress = address
          this.provider = new ethers.providers.Web3Provider(this.web3Provider);
          resolve(this.accountAddress)
        }) // address or chainId changed
        .catch((error) => {
          if (error.code === 4001) {
            resolve()
          } else {
            reject()
            console.error(error);
          }
        });
    })
  }
  // 为用户生成链路
  async changeMainetBitKeep() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.web3Provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        });
        resolve()
      } catch (switchError) {
        // This error code indicates that the chain has not been added to Bitkeep.
        if (switchError.code === 4902) {
          try {
            await this.web3Provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x38',
                  chainName: 'Binance Smart Chain Mainnet',
                  rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com/"],
                },
              ],
            });
            resolve()
          } catch (addError) {
            reject(addError)
          }
        } else {
          reject(switchError)
        }
      }
    })

  }
  async walletConnect() {
    return new Promise(async (resolve, reject) => {
      try {
        this.web3Provider = new WalletConnectProvider({
          rpc: {
            56: "https://bsc-dataseed1.binance.org/",
          },
          network: "binance",
          chainId: 56,
          infuraId: "52d82fe657a2478fa40b336d286554ac", // required
          appLogoUrl: "",
          name: "Binance Smart Chain Mainnet",

        });
        await this.web3Provider.enable()
        this.web3 = new Web3(this.web3Provider);
        this.provider = new ethers.providers.Web3Provider(this.web3Provider);
        const accounts = await this.web3.eth.getAccounts();
        this.accountAddress = accounts[0]
        resolve(this.accountAddress)
      } catch (error) {
        reject(error)
      }
    })

  }
  async ETHwalletConnect() {
    return new Promise(async (resolve, reject) => {
      try {
        this.web3Provider = new WalletConnectProvider({
          rpc: {
            1: "https://ethereum.publicnode.com",
          },
          network: "Ethereum",
          chainId: 1,
          // infuraId: "52d82fe657a2478fa40b336d286554ac", // required
          appLogoUrl: "",
          name: "11111",

        });
        await this.web3Provider.enable()
        this.web3 = new Web3(this.web3Provider);
        this.provider = new ethers.providers.Web3Provider(this.web3Provider);
        const accounts = await this.web3.eth.getAccounts();
        this.accountAddress = accounts[0]
        resolve(this.accountAddress)
      } catch (error) {
        reject(error)
      }
    })
  }
  //获取签名
  async getSignature(signKey) {
    return new Promise(async (resolve, reject) => {
      try {
        let signer = this.provider.getSigner();
        let signature = await signer.signMessage(signKey, this.accountAddress)
        resolve(signature);
      } catch (error) {
        if (error.action === 'signMessage' && error.code === 'ACTION_REJECTED') {
          resolve()
        } else {
          reject()
        }
      }
    })
  }
  //链接监听
  connectWatch() {
    return new Promise((resolve) => {
      this.web3Provider.on("accountsChanged", async (accounts) => {

        if (this.web3Provider && this.web3Provider.removeAllListeners) {
          this.web3Provider.removeAllListeners('accountsChanged')
          this.web3Provider.removeAllListeners('chainChanged')
          resolve()
        }
        if (accounts.length === 0) {
          resolve()
        }
      }, err => {
        console.log({ err })
      });
      // Subscribe to chainId change
      this.web3Provider.on("chainChanged", (chainId) => {
        resolve()
      });
      this.web3Provider.on("disconnect", () => {
        resolve()
      });
    })

  }

  //创建web3Modal实例
  async web3ModalCreated() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed1.binance.org/",
          },
          network: "binance",
          chainId: 56,
          infuraId: "52d82fe657a2478fa40b336d286554ac",
          appLogoUrl: "",
          name: "Binance Smart Chain Mainnet"
        }
      },
    };
    this.web3ModalObj = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      disableInjectedProvider: false,
    });
    return this.web3ModalObj
  }
  // 为用户生成链路
  async changeMainet() {
    const { ethereum } = window;
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x38", // 必须将链的整数 ID 指定为十六进制字符串
          // 56 转16进制：a = 56,a = '0x' + a.toString(16)
          chainName: "Binance Smart Chain Mainnet",
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18, // 必须是非负整数
          },
          // iconUrls: ['../assets/images/bsc.png'],
          rpcUrls: ["https://bsc-dataseed1.binance.org/"],
          // rpcUrls: ['https://bsc-dataseed1.binance.org/'],
          blockExplorerUrls: ["https://bscscan.com/"],
          // 注释参考：https://eips.ethereum.org/EIPS/eip-3085
        },
      ],
    });
    // 无法监听用户取消/确定动作
    return new Promise((resolve, reject) => {
      let num = 0;
      let ethInter = setInterval(() => {
        num++;
        if (num >= 20) {
          clearInterval(ethInter);
          reject("error:超时40000");
        }
        if (ethereum.networkVersion == "56" || ethereum.chainId == "0x38") {
          clearInterval(ethInter);
          // const res = await this.connectWallet()
          resolve();
        }
      }, 200);
    });
  }

  //创建合约
  contractCreated(ABI, contract) {
    return new this.web3.eth.Contract(ABI, contract);
  }
  //获取授权额度
  async getAllowance(tokenAddress, spenderAddress) {
    let erc20Contract = this.contractCreated(ERC20ABI, tokenAddress);
    var allowance = await erc20Contract.methods
      .allowance(this.accountAddress, spenderAddress)
      .call({ from: this.accountAddress });
    let _Decimals = await this.getTokenDecimals(tokenAddress);
    allowance = this.getValueDivided(allowance, 10 ** _Decimals);
    return Promise.resolve(allowance);
  }

  //获取某种代币的精度  传入参数：1，token的合约地址
  async getTokenDecimals(tokenAddress) {
    const erc20Contract = new this.web3.eth.Contract(ERC20ABI, tokenAddress);
    try {
      const decimals = await erc20Contract.methods
        .decimals()
        .call({ from: this.accountAddress });

      return Promise.resolve(decimals);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
