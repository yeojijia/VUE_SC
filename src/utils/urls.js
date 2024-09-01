export default {
  common: {
    ads: '/admin/index/ads',
    articles_detail: '/admin/articles',
    articlesCategory: '/admin/articles/category',
    articles_index: '/admin/articles/index',
    articles_page: '/admin/articles/page',
    getBulletinType: '/admin/bulletin/getBulletinType',
    getByPageAndLikeAndOrder: '/admin/bulletin/getByPageAndLikeAndOrder',
    bulletin: '/admin/bulletin',
    leaveMessage: '/admin/index/leaveMessage',
    getActivityCategory: '/activity/activity/category/list',
    getByCategory: '/activity/activity/list',
    activityInfo: '/activity/activity/info',
    getCode: '/admin/zxUserLogin/code',
    checkVerifyCode: '/admin/zxUserLogin/checkVerifyCode',
    message: '/admin/message/list',
    messageDetail: '/admin/message',
    rewardsDraw: '/activity/activity/rewards/draw',
    rewardsList: '/activity/activity/rewards/list',
    exchangeWinnings: 'activity/activity/exchange/winnings',
    langList: '/admin/index/language/list',
    systemConfigLogoInfo: '/admin/systemConfig/logoInfo',
    appContentGetServiceLink: '/admin/systemConfig/getServiceLink',
  },
  user: {
    register: '/admin/zxUserApp/register',
    token: '/auth/oauth/token',
    loginSignKey: '/admin/zxUserApp/sign/key',
    walletLogin: '/auth/wallet/token/login',
    refreshToken: '/auth/oauth/token',
    userAllMessage: '/admin/appContent/userAllMessage',
    userInfo: '/admin/zxUserApp/getUserInfo',
    upload: '/admin/zxUserApp/upload ',
    updateAvatar: '/admin/zxUserApp/updateAvatar',
    logout: '/auth/token/logout',
    getBillPage: '/admin/appWalletBill/getBillPage',
    getBillType: '/admin/appWalletBill/getBillType',
    sendEmailCode: '/admin/zxUser/sendEmailCode',
    setFundPassword: '/admin/zxUser/setFundPassword',
    updateFundPassword: '/admin/zxUser/updateFundPassword',
    findPassword: '/admin/zxUser/findPassword',
    updatePassword: '/admin/zxUser/updatePassword',
    bindEmail: '/admin/zxUser/bindEmail',
    updateNickName: '/admin/zxUserApp/updateNickName',
    sendEmailCodeByAddress: '/admin/zxUser/sendEmailCodeByAddress',
    updateUserInfo: '/admin/zxUserApp/update/userInfo',
    googleQr: '/admin/zxUserApp/google/qr/url',
    googleBind: '/admin/zxUserApp/google/band',
    googleReset: '/admin/zxUserApp//google/reset',
    loginLog: '/admin/zxUser/login/log',
    updateEmail: '/admin/zxUserApp/updateEmail',
    turntableInfo: '/activity/activity/turntable/info',
    turntableDraw: '/activity/activity/turntable/draw',
    turntableRecord: '/activity/activity/turntable/record',
    turntableTimes: '/activity/activity/turntable/times/record',
    turntableRecordAll: '/activity/activity/turntable/record/all',
  },
  money: {
    exchangePayCoinList: '/defi/coin/exchange/pay/list',
    exchangeReturnCoinList: '/defi/coin/exchange/return/list',
    wallet_exchange: '/defi/coin/exchange',
    exchange_info: '/defi/coin/exchange/info',
    coin_exchange_list: '/defi/coin/exchange/list',
    coinBalance: '/defi/coin/wallet/balance',
    chargeInit: '/defi/coin/charge/init/account',
    chargeCoins: '/defi/coin/charge/list',
    chargeRecord: '/defi//coin/charge/record',
    coinWithDraw: '/defi/coin/withDraw',
    withDrawInfo: '/defi/coin/withDraw/info',
    withDrawAddressAdd: '/defi/coin/withDraw/address',
    withDrawAddressList: '/defi/coin/withDraw/address/list',
    delWithDrawType: '/defi/coin/withDraw',
    coinWithDrawList: '/defi/coin/withDraw/list',
    asset: '/defi/coin/wallet/balance',
    totalBalance: '/defi/coin/wallet/totalBalance',
    exchangeRecord: '/defi/coin/exchange/record',
    rechargeRecord: '/defi/coin/recharge/record',
    withdrawRecord: '/defi/coin/withdraw/record',
    backwaterRecord: '/admin/zxUserApp/backwater',
    pledgeShareRecord: '/defi/pledge/share'
  },
  game: {
    getSports: '/games/app/getSports',
    getSportEvents: '/games/app/getSportEvents',
    gameUrl: '/games/app/getJumpUrl',
    // gameUrl: '/games/app/getUrl',
    getMyBetRecord: '/games/app/getMyBetRecord',
    allBalanceToOffice: '/games/app/allBalanceToOffice',
    getAllPlatformBalance: '/games/app/getAllPlatformBalance',
    getAllPlatformInfo: '/games/app/getAllPlatformInfo',
    transferBalance: '/games/app/transferBalance',
    totalBalance: '/games/app/totalBalance',
    gameType: '/games/app/game/type',
    gameList: '/games/app/games',
    initGameTypes: '/games/app/initGameTypes',
    gamesParticipation: '/games/app/games/participation'
  },
  defi: {
    deposit: '/defi/pledge/deposit',
    pledge_page: '/defi/pledge/page',
    receive: '/defi/pledge/receive',
    record_list: '/defi/pledge/record/list',
    type: '/defi/pledge/type',
    redemption: '/defi/pledge/redemption',
    statistics: '/defi/pledge/statistics',
    pledge_share: '/defi/pledge/share',
    pledge_share_draw: '/defi/pledge/share/draw',
  },
  invite: {
    washInfo: '/admin/zxUserApp/wash/info',
    levelInfo: '/admin/zxUserApp/level/info',
    agencyInfo: '/admin/zxUserApp/agency/level/info',
    userTeamInfo: '/admin/zxUserApp/user/team/info',
    teamInfo: '/admin/zxUserApp/team/info',
    backwaterDraw: '/admin/zxUserApp/backwater/draw',
    inviteCodeAdd: '/admin/zxUserApp/inviteCode/add'
  },
  lottery: {
    allLotteryInfoList: '/lottery/lotteryinfo/allLotteryInfoList',
    allLotteryInfoMap: '/lottery/lotteryinfo/allLotteryInfoMap',
    getLotteryInfo: '/lottery/lotteryinfo/getLotteryInfo',
    initLotteryInfoList: '/lottery/lotteryinfo/initLotteryInfoList',
    getLotteryPlayTypeList: '/lottery/playType/getLotteryPlayTypeList',
    getUserOdds: '/lottery/lotteryBet/getUserOdds',
    getOpenHistory: '/lottery/lotteryperiods/getOpenHistory',
    getCurrentInfo: '/lottery/lotteryperiods/getCurrentInfo',
    bet: '/lottery/lotteryBet/bet',
    getMyBetRecordPage: '/lottery/lotteryBet/getMyBetRecordPage',
    batchBet: '/lottery/lotteryBet/batchBet',
    statistics: '/lottery/lotteryBet/statistics'
  }
}