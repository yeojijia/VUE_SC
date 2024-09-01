import Wallet from "./wallet";
import common from "./common";
import stake from './stake'
import swap from './swap'
const wallet = new Wallet();
export default {
  wallet,
  ...common,
  ...stake,
  ...swap,

};
