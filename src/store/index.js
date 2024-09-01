import { createStore } from "vuex";
// import vuexPersistedstate from "vuex-persistedstate";
import global from './modules/global'
import user from "./modules/user";
import money from "./modules/money";
import wallet from "./modules/wallet";
export default createStore({
  modules: {
    global,
    user,
    money,
    wallet
  },

});
