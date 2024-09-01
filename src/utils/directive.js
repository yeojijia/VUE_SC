export default function directive(app) {
  //只能输入数字
  app.directive('LimitInputNumber', {
    mounted(el) {
      el.oninput = () => {
        el.value = el.value.replace(/[^\d.]/g, "");
      };
    },
  });
  //只能输入正整数
  app.directive('LimitInputInt', {
    mounted(el) {
      el.oninput = () => {
        el.value = el.value.replace(/^0/g, "");
        el.value = el.value.replace(/[^0-9]/g, "");
      };
    },
  });
  //只能输入数字和两位小数
  app.directive('LimitInputNumberTwodecimals', {
    mounted(el) {
      el.oninput = () => {
        // el.value = (el.value.replace(/[^\d.]/g, "").match(/^\d*(.?\d{0,2})/g)[0]) || null
        el.value = ("" + el.value) // 第一步：转成字符串
          .replace(/[^\d^\.]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
          .replace(/^0+(\d)/, "$1") // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
          .replace(/^\./, "0.") // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
          .match(/^\d*(\.?\d{0,2})/g)[0] || ""; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数

      };
    },
  });
}