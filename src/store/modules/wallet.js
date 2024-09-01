/****
 *  wallet相关
 * ***/
import contract from "@/contract";
// import { _login } from 'apiB/modules/user'
// import { _tokenList, _getSignKey } from 'apiB/modules/common'
// import { _getSign } from "api/modules/user";
const { BSC, TRON } = contract


let chainId = 56

let walletAddress = ''
let walletToken = ''
let signature = ''
let loginWallet = ''
try {
  if (localStorage.chainId) {
    chainId = Number(localStorage.chainId)
  }
  if (localStorage.walletAddress) {
    walletAddress = localStorage.walletAddress
  }
  if (localStorage.walletToken) {
    walletToken = localStorage.walletToken
  }
  if (localStorage.signature) {
    signature = localStorage.signature
  }
  if (localStorage.loginWallet) {
    loginWallet = localStorage.loginWallet
  }
} catch (error) { }

const wallet = {
  namespaced: true, // 命名开启
  state: {
    walletInit: {
      bsc: false,
      tron: false
    },
    chainId,
    chainList: [
      {
        id: 56,
        title: "BSC",
        src: require("@/assets/images/common/icon_BSC.png"),
      },
    ],
    tokenList: [],
    tokens_balance: [],
    walletFailShow: false,
    walletInitLoading: false,
    isWalletLoginShow: false,//是否进行钱包登录
    walletAddress,
    signature,
    walletToken,
    walletLoginChain: 56,
    loginWallet

  },
  mutations: {
    SET_WALLET_LOGIN_CHAIN(state, chain) {
      state.walletLoginChain = chain
    },
    //保存钱包信息
    SET_WALLET_DATA(state, data) {
      for (const key in data) {
        state[key] = data[key]
        localStorage[key] = data[key]
      }
    },

    SET_WALLET_INIT_LOADING(state, loading) {
      state.walletInitLoading = loading
    },
    SET_WALLET_FAIL(state, show) {
      state.walletFailShow = show
      if (!show) {
        // window.location.reload();
      }
    },
    SET_TOKENS_BALANCE(state, list) {
      state.tokens_balance = list
    },
    SET_TOKEN_LIST(state, list) {
      state.tokenList = list
    },

    SET_CHAIN_ID(state, id) {
      state.chainId = id
      localStorage.chainId = id
    },
    SET_CHAIN_DATA(state, data) {
      for (let i = 0; i < state.chainList.length; i++) {
        let item = state.chainList[i];
        if (item.id === state.chainId) {
          for (const key in data) {
            item[key] = data[key]
            localStorage[key] = data[key]
          }
          break
        }
      }
      localStorage.chainList = JSON.stringify(state.chainList)
    },
    DISCONNECT_WALLET(state) {
      state.walletAddress = ''
      state.signature = ''
      state.walletToken = ''
      state.loginWallet = ''
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('signature')
      localStorage.removeItem('walletToken')
      localStorage.removeItem('loginWallet')
    },
    SET_TOKEN(state, data) {
      for (const key in data) {
        state[key] = data[key]
        localStorage[key] = data[key]
      }
      localStorage.token = state.token
      for (let i = 0; i < state.chainList.length; i++) {
        let item = state.chainList[i];
        if (item.id === state.chainId) {
          item.token = state.token

          break
        }
      }
      localStorage.chainList = JSON.stringify(state.chainList)
    }
  },
  actions: {
    //链接钱包
    connectWallet({ commit }, chainId) {
      return new Promise(async (resolve, reject) => {
        if (chainId === 56) {
          try {
            const walletAddress = await BSC.wallet
              .connectWallet()
            if (walletAddress) {
              commit("SET_WALLET_DATA", {
                walletAddress,
                chainId
              })
              resolve({
                address: walletAddress
              })
            } else {
              reject()
            }

          } catch (error) {
            if (error && error.message === 'User Rejected') {
              reject()
            } else {
              reject()
              commit('SET_WALLET_FAIL', true)
            }
          }
        } else {
          try {
            let walletAddress = ''
            try {
              walletAddress = await TRON.wallet.connectWallet()
            } catch (error) {
              if (error.code === 4001) {
                reject()
                window.location.reload();
                return
              } else {
                reject()
                commit('SET_WALLET_FAIL', true)
                return
              }
            }

            if (walletAddress) {
              commit("SET_WALLET_DATA", {
                walletAddress,
                chainId
              })
              resolve({ address: walletAddress })
            } else {
              reject()
            }

          } catch (error) {
            if (error && error === 'Confirmation declined by user') {
              reject()
              window.location.reload();
            } else {
              reject()
              commit('SET_WALLET_FAIL', true)
            }
          }
        }
      });
    },
    //链接钱包登录
    async connectWalletLogin({ commit }, { chainId, wallet }) {

      return new Promise(async (resolve, reject) => {
        if (chainId === 56) {
          let walletAddress = ''
          try {
            switch (wallet) {
              case 'BitKeep':
                walletAddress = await BSC.wallet
                  .bitKepConnect()
                break;
              case 'WalletConnect':
                walletAddress = await BSC.wallet
                  .walletConnect()
                break;
              default:
                walletAddress = await BSC.wallet
                  .connect()
                break;
            }
            let signStr = ''
            try {
              const { data } = await _getSign({
                address: walletAddress,
                walletType: 1
              })
              signStr = data
            } catch (error) {
              reject()
              return
            }
            const signature = await BSC.wallet.getSignature(signStr)
            if (walletAddress && signature) {
              const { token } = await _login({
                address: walletAddress,
                chainType: "BSC",
              })
              commit("SET_WALLET_DATA", {
                walletAddress,
                signature,
                walletToken: token,
                chainId,
                loginWallet: wallet
              })
              resolve({
                address: walletAddress,
                walletType: 1,
                signature,
              })
            } else {
              reject()
            }

          } catch (error) {
            console.log({ error })
            if (error && error.message === 'User Rejected') {
              reject()
            } else if (error && error.message === 'User closed modal') {
              window.location.reload();
            } else {
              reject()
              commit('SET_WALLET_FAIL', true)
            }
          }

        } else {
          try {
            let walletAddress = ''
            try {
              walletAddress = await TRON.wallet.connectWallet()
            } catch (error) {
              if (error.code === 4001) {
                reject()
                return
              } else {
                reject()
                commit('SET_WALLET_FAIL', true)
                return
              }
            }
            let signStr = ''
            try {
              const { data } = await _getSign({
                address: walletAddress,
                walletType: 2
              })
              signStr = data
            } catch (error) {
              reject()
              return
            }
            const signature = await TRON.wallet.getSignature(signStr)

            if (walletAddress && signature) {

              const { token } = await _login({
                address: walletAddress,
                chainType: "TRX",
              })
              commit("SET_WALLET_DATA", {
                walletAddress,
                signature,
                walletToken: token,
                chainId
              })
              resolve({
                address: walletAddress,
                walletType: 2,
                signature,
              })
            } else {
              reject()
            }

          } catch (error) {
            if (error && error === 'Confirmation declined by user') {
              reject()
            } else {
              reject()
              commit('SET_WALLET_FAIL', true)
            }
          }
        }
      });
    },
    //获取签名
    async getSignKey() {
      const signKey = await _getSignKey();
      const signature = await BSC.wallet.getSignature(signKey)
      return signature
    },
    //获取币种列表
    async getTokenList({ commit }) {
      const res = await _tokenList()
      commit('SET_TOKEN_LIST', res)
    },
    //获取币种余额
    async getTokenBalance({ commit, state }) {
      if (!state.walletAddress) {
        return []
      }
      let tokenList = state.tokenList
      let list = []
      if (state.chainId === 56) {
        for (let i = 0; i < tokenList.length; i++) {
          let item = tokenList[i];
          try {
            item.balance = await BSC.getBalance(item.contractAddress)
            list.push(item)
          } catch (error) {
            continue

          }
        }
      } else {
        const item = tokenList.find(item => {
          return item.symbol === 'USDT'
        })
        list.push(item)
      }
      commit('SET_TOKENS_BALANCE', list)

    }
  },
};

export default wallet;
