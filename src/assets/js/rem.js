(function (doc, win) {
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = () => {
      const clientWidth = docEl.clientWidth;
      if (clientWidth > 1536) {
        docEl.style.fontSize = `${clientWidth * 100 / 1920}px` //'100px';
      } else if (clientWidth >= 1200 && clientWidth <= 1536) {
        docEl.style.fontSize = '80px';
      } else if (clientWidth >= 750 && clientWidth < 1200) {
        docEl.style.fontSize = '80px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



