//　動きます。

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * メインロジック.
 */
(async () => {
  // Puppeteerの起動.
  const browser = await puppeteer.launch({
    headless: false, // Headlessモードで起動するかどうか.
    slowMo: 50, // 指定のミリ秒スローモーションで実行する
  });

  // 新しい空のページを開く.
  const page = await browser.newPage();

  // view portの設定.
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // 該当ページへ遷移する.
  await page.goto('https://mainichi.jp/graphs/20180612/hpj/00m/040/001000g/1');

  // imgタグの取得. (取得した要素は ElementHandle というオブジェクトで取得できる.)
  const image = await page.$('#main > article > div > figure > div > img');
  // 結果の出力.
  console.log('イメージは、' + image);    // 'イメージは、JSHandle@node'

  // 取得したタグのsrc属性を取得する. (取得した属性は JSHandle というオブジェクトで取得できる.)
  const src = await image.getProperty('src');
  console.log('srcは、' + src); // 'srcは、JSHandle:https://cdn.mainichi.jp/vol1/2018/06/12/20180612hpj00m040001000q/9.jpg?1'

  // JSHandleオブジェクトの内容をtargeturlに取り出す. (この場合は文字列がsrcに指定しているurlを取得できる.)
  const targeturl = await src.jsonValue();
  console.log(`targeturl=${targeturl}`); // 'targeturl=https://cdn.mainichi.jp/vol1/2018/06/12/20180612hpj00m040001000q/9.jpg?1'

  // URLで形式で取得できたパスのファイル名部分を取り出す.
  const filename = targeturl.split('/').pop().split('?').shift(); // split('/').pop()までで'9.jpg?1'1となる

  const localfilefullpath = path.join(__dirname, filename);
  console.log(`filename=` + filename);                      // 'filename=9.jpg'
  console.log(`localfilename=` + localfilefullpath);        // 'localfilename=/home/atom/Git/Puppeteer入門/basic/9.jpg'

  const viewSource = await page.goto(targeturl);
  fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => {
    if (error) {
      console.log(`error=${error}`);
      return;
    }
    console.log('The file was saved!');
  });

  // ブラウザの終了.
  await browser.close();
})();