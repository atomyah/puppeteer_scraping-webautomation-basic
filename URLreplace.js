const url = 'https://mainichi.jp/graphs/20180612/hpj/00m/040/001000g/1';
const imageurlheader = 'https://cdn.mainichi.jp/vol1/';
const imageurlmainwithg1 = url.split('graphs').pop().replace('/', ''); // graphsで区切って後ろの要素を取り出し最初のスラッシュだけをヌルに置換
 // すべてのスラッシュをヌルに置換したい場合：.replace(/\u002f/g,''); エスケープを併用してユニコードを使う。半角スラッシュのコードは0x002f、全角スラッシュのコードは0xff0f


console.log(imageurlmainwithg1); // '20180612/hpj/00m/040/001000g/1'
const imageurldate = imageurlmainwithg1.substring(0, 4) + '/' + imageurlmainwithg1.substring(4, 6) + '/' + imageurlmainwithg1.substring(6, 8);
console.log(imageurldate); // '2018/06/12'

const imageurlmain = imageurlmainwithg1.substring(0, imageurlmainwithg1.length-2);
console.log(imageurlmain); // '20180612/hpj/00m/040/001000g' ← imageurlmainwithg1のうしろ'/1'を抜いている。

const imageurl = imageurlheader + imageurldate + imageurlmain + 'q/9.jpg';
console.log(imageurl);  // https://cdn.mainichi.jp/vol1/2018/06/1220180612/hpj/00m/040/001000gq/9.jpg
