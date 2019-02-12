//修正できた系。セレクタを#hnaviSearchWordに変更

const puppeteer = require('puppeteer');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか.
    slowMo: 50, // 指定のミリ秒スローモーションで実行する.
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // 秀和システムのページへ遷移.
  await page.goto('http://www.shuwasystem.co.jp/');

  // Googleカスタム検索窓 の表示を待つ.
  await page.waitForSelector('#hnaviSearchWord');

  // Googleカスタム検索窓 に Puppeteer とキーボード入力を行う.
  await page.type('#hnaviSearchWord', 'Puppeteer');

  // buttonタグを特定してクリックする.
  await page.click('#hnaviSearchSubmit');

  // ブラウザの終了.
  // await browser.close();
})();