module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android >= 4.0",
        "IOS >=10.0",
        "Chrome > 51",
        "ff > 51",
        "ie > 10",
      ],
    },
    // "postcss-pxtorem": {
    //   rootValue: 75,
    //   propList: ["*"],
    // },
  },
};
