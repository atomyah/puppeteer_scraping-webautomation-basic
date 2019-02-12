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
  await page.goto('https://toyokeizai.net/articles/-/196238?page=2');

  const imageid = '#article-body-inner > div > div > img'

  // imgタグの取得. (取得した要素は ElementHandle というオブジェクトで取得できる.)
  const image = await page.$(imageid);
  // 結果の出力.
  console.log('イメージは、' + image); // 'イメージは、JSHandle@node' ElementHandleオブジェクトの全貌は直下に。

  // 取得したタグのsrc属性を取得する. (取得した属性は JSHandle というオブジェクトで取得できる.)
  const src = await image.getProperty('src');
  // console.log(src);

  // JSHandleオブジェクトの内容をjsonValueで取り出す. (この場合は文字列がsrcに指定しているurlを取得できる.)
  const targetUrl = await src.jsonValue();
  console.log(`targetUrl=${targetUrl}`); // 'targetUrl=https://tk.ismcdn.jp/mwimgs/2/d/1040/img_2d213ce8ebfbba4041461bc57c73486e501891.jpg'

  // URLで形式で取得できたパスのファイル名部分を取り出す.
  const filename = targetUrl.split('/').pop(); 

  const localfilefullpath = path.join(__dirname, filename);
  console.log(`filename=${filename}`);                      // 'filename=img_2d213ce8ebfbba4041461bc57c73486e501891.jpg'
  console.log(`localfilename=${localfilefullpath}`); // 'localfilename=/home/atom/Git/Puppeteer入門/basic/img_2d213ce8ebfbba4041461bc57c73486e501891.jpg'

  const viewSource = await page.goto(targetUrl); 
  fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => { // fs.writeFile(ファイルパス,書き込みたい内容,コールバック)
    if (error) {
      console.log(`error=${error}`);
      return;
    }
    console.log('The file was saved!');
  });

  // ブラウザの終了.
  await browser.close();
})();


/*
ElementHandle {
  _context:
   ExecutionContext {
     _client:
      CDPSession {
        _events: [Object],
        _eventsCount: 27,
        _maxListeners: undefined,
        _callbacks: Map {},
        _connection: [Connection],
        _targetType: 'page',
        _sessionId: '29BF80CFE6638BDC3608F0E4FDAD8DF7' },
     _world:
      DOMWorld {
        _frameManager: [FrameManager],
        _frame: [Frame],
        _timeoutSettings: [TimeoutSettings],
        _documentPromise: [Promise],
        _contextResolveCallback: null,
        _contextPromise: [Promise],
        _waitTasks: Set {},
        _detached: false },
     _contextId: 3 },
  _client:
   CDPSession {
     _events:
      [Object: null prototype] {
        'Network.requestWillBeSent': [Function: bound _onRequestWillBeSent],
        'Network.requestIntercepted': [Function: bound _onRequestIntercepted],
        'Network.requestServedFromCache': [Function: bound _onRequestServedFromCache],
        'Network.responseReceived': [Function: bound _onResponseReceived],
        'Network.loadingFinished': [Function: bound _onLoadingFinished],
        'Network.loadingFailed': [Function: bound _onLoadingFailed],
        'Page.frameAttached': [Function],
        'Page.frameNavigated': [Function],
        'Page.navigatedWithinDocument': [Function],
        'Page.frameDetached': [Function],
        'Page.frameStoppedLoading': [Function],
        'Runtime.executionContextCreated': [Function],
        'Runtime.executionContextDestroyed': [Function],
        'Runtime.executionContextsCleared': [Function],
        'Page.lifecycleEvent': [Function],
        'Target.attachedToTarget': [Function],
        'Target.detachedFromTarget': [Function],
        'Page.domContentEventFired': [Function],
        'Page.loadEventFired': [Function],
        'Runtime.consoleAPICalled': [Function],
        'Runtime.bindingCalled': [Function],
        'Page.javascriptDialogOpening': [Function],
        'Runtime.exceptionThrown': [Function],
        'Security.certificateError': [Function],
        'Inspector.targetCrashed': [Function],
        'Performance.metrics': [Function],
        'Log.entryAdded': [Function] },
     _eventsCount: 27,
     _maxListeners: undefined,
     _callbacks: Map {},
     _connection:
      Connection {
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        _url:
         'ws://127.0.0.1:44537/devtools/browser/5e301745-bea7-490c-9727-ef9f7edaa59a',
        _lastId: 22,
        _callbacks: Map {},
        _delay: 50,
        _transport: [WebSocketTransport],
        _sessions: [Map],
        _closed: false },
     _targetType: 'page',
     _sessionId: '29BF80CFE6638BDC3608F0E4FDAD8DF7' },
  _remoteObject:
   { type: 'object',
     subtype: 'node',
     className: 'HTMLImageElement',
     description: 'img',
     objectId: '{"injectedScriptId":3,"id":2}' },
  _disposed: false,
  _page:
   Page {
     _events: [Object: null prototype] {},
     _eventsCount: 0,
     _maxListeners: undefined,
     _closed: false,
     _client:
      CDPSession {
        _events: [Object],
        _eventsCount: 27,
        _maxListeners: undefined,
        _callbacks: Map {},
        _connection: [Connection],
        _targetType: 'page',
        _sessionId: '29BF80CFE6638BDC3608F0E4FDAD8DF7' },
     _target:
      Target {
        _targetInfo: [Object],
        _browserContext: [BrowserContext],
        _targetId: '7ADE988C46D175994372B0AE088AD1C4',
        _sessionFactory: [Function],
        _ignoreHTTPSErrors: false,
        _defaultViewport: [Object],
        _screenshotTaskQueue: [TaskQueue],
        _pagePromise: [Promise],
        _initializedCallback: [Function],
        _initializedPromise: [Promise],
        _closedCallback: [Function],
        _isClosedPromise: [Promise],
        _isInitialized: true },
     _keyboard:
      Keyboard { _client: [CDPSession], _modifiers: 0, _pressedKeys: Set {} },
     _mouse:
      Mouse {
        _client: [CDPSession],
        _keyboard: [Keyboard],
        _x: 0,
        _y: 0,
        _button: 'none' },
     _timeoutSettings:
      TimeoutSettings { _defaultTimeout: null, _defaultNavigationTimeout: null },
     _touchscreen: Touchscreen { _client: [CDPSession], _keyboard: [Keyboard] },
     _accessibility: Accessibility { _client: [CDPSession] },
     _networkManager:
      NetworkManager {
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        _client: [CDPSession],
        _frameManager: [FrameManager],
        _requestIdToRequest: [Map],
        _requestIdToRequestWillBeSentEvent: Map {},
        _extraHTTPHeaders: {},
        _offline: false,
        _credentials: null,
        _attemptedAuthentications: Set {},
        _userRequestInterceptionEnabled: false,
        _protocolRequestInterceptionEnabled: false,
        _requestHashToRequestIds: [Multimap],
        _requestHashToInterceptionIds: [Multimap] },
     _frameManager:
      FrameManager {
        _events: [Object],
        _eventsCount: 3,
        _maxListeners: undefined,
        _client: [CDPSession],
        _page: [Circular],
        _networkManager: [NetworkManager],
        _timeoutSettings: [TimeoutSettings],
        _frames: [Map],
        _contextIdToContext: [Map],
        _isolatedWorlds: [Set],
        _mainFrame: [Frame] },
     _emulationManager:
      EmulationManager {
        _client: [CDPSession],
        _emulatingMobile: false,
        _hasTouch: false },
     _tracing:
      Tracing { _client: [CDPSession], _recording: false, _path: '' },
     _pageBindings: Map {},
     _ignoreHTTPSErrors: false,
     _coverage:
      Coverage { _jsCoverage: [JSCoverage], _cssCoverage: [CSSCoverage] },
     _javascriptEnabled: true,
     _viewport: { width: 1200, height: 800 },
     _screenshotTaskQueue: TaskQueue { _chain: [Promise] },
     _workers: Map { '1F3FE587FDFBA8D11C4642A8CA7BDDA1' => [Worker] } },
  _frameManager:
   FrameManager {
     _events:
      [Object: null prototype] {
        [Symbol(Events.FrameManager.FrameAttached)]: [Function],
        [Symbol(Events.FrameManager.FrameDetached)]: [Function],
        [Symbol(Events.FrameManager.FrameNavigated)]: [Function] },
     _eventsCount: 3,
     _maxListeners: undefined,
     _client:
      CDPSession {
        _events: [Object],
        _eventsCount: 27,
        _maxListeners: undefined,
        _callbacks: Map {},
        _connection: [Connection],
        _targetType: 'page',
        _sessionId: '29BF80CFE6638BDC3608F0E4FDAD8DF7' },
     _page:
      Page {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        _closed: false,
        _client: [CDPSession],
        _target: [Target],
        _keyboard: [Keyboard],
        _mouse: [Mouse],
        _timeoutSettings: [TimeoutSettings],
        _touchscreen: [Touchscreen],
        _accessibility: [Accessibility],
        _networkManager: [NetworkManager],
        _frameManager: [Circular],
        _emulationManager: [EmulationManager],
        _tracing: [Tracing],
        _pageBindings: Map {},
        _ignoreHTTPSErrors: false,
        _coverage: [Coverage],
        _javascriptEnabled: true,
        _viewport: [Object],
        _screenshotTaskQueue: [TaskQueue],
        _workers: [Map] },
     _networkManager:
      NetworkManager {
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        _client: [CDPSession],
        _frameManager: [Circular],
        _requestIdToRequest: [Map],
        _requestIdToRequestWillBeSentEvent: Map {},
        _extraHTTPHeaders: {},
        _offline: false,
        _credentials: null,
        _attemptedAuthentications: Set {},
        _userRequestInterceptionEnabled: false,
        _protocolRequestInterceptionEnabled: false,
        _requestHashToRequestIds: [Multimap],
        _requestHashToInterceptionIds: [Multimap] },
     _timeoutSettings:
      TimeoutSettings { _defaultTimeout: null, _defaultNavigationTimeout: null },
     _frames:
      Map {
        '7ADE988C46D175994372B0AE088AD1C4' => [Frame],
        'A1AB799FF57C2C818903E282D37FE2A2' => [Frame],
        '1E5EE0657210B51D75E100872D79EA0D' => [Frame],
        '1FAC9FEDEA03D1D8D907DAF2C8D74BB8' => [Frame],
        '78EC67342457AC427D6AB7A24856D54E' => [Frame],
        '2ACD79C32160DD4EEC435B23D18E7EA4' => [Frame],
        'AC7A2AFDD83655596C26F680C603C1CA' => [Frame],
        'F50B3216D6EF62603C08F80AE5103D28' => [Frame],
        '8F462384E182F70257F1EC3B17B5A257' => [Frame],
        'B5793EAB9746D1E44D82792A1E65DD92' => [Frame],
        '7FD091FEDCDA0ED9F0E657D0451CB746' => [Frame],
        '80AEB27F5241EFEC084315EC3E3A175C' => [Frame],
        'EAEACE84926062F70312782604DDD4BA' => [Frame],
        'D8663CDBA0F418284FC24F747CDB5F08' => [Frame],
        'F81E80209D6C51182F9D49F6FD188CD3' => [Frame],
        '47C32478742589C4FDBC90CA8B02E773' => [Frame],
        'A184DECDACCD3F94A5114165120759AB' => [Frame],
        '3183D0E25F1101DE3FC6BA8CFC281B1F' => [Frame],
        'C022323DED4841E1FF55B73ACBFCBDA9' => [Frame],
        '3EC2F153A6EDB865B077AA9A57F3617E' => [Frame],
        '09189F18770B778D6A6983BF8CCFAA02' => [Frame],
        'D3E7EBF17A97C69E53E8865071E9BB99' => [Frame],
        '101FBF600D20FD5E4621CC872AFB95F7' => [Frame],
        '9E00864C1E0A9F5E55EE34A648970FFE' => [Frame],
        '98569CE124057BD5D9D7B0455E655C46' => [Frame],
        '51F4C3B14ED44512C0ECFB5A0C43EB41' => [Frame],
        '9C5F9FBDEEA0A1881E3791BA0C212972' => [Frame],
        'F65AED59EFD2A83D349FC3E36937BF2C' => [Frame],
        '5FCC59592DD0FB3BF04C782DC69A3556' => [Frame],
        '5C8336FEC06EF25F077A87D1D1BA0B0E' => [Frame],
        '9A1A5163E1DEC0AF1B8DBE47ED21D109' => [Frame],
        'E6399D7ADDFBB2ADC6413A3FA6A5CF07' => [Frame],
        'C609AE86197521BDF078B0B0C0024109' => [Frame],
        '7F81F782CD92DA0582F529C6F4E21FC2' => [Frame],
        '09559D160A82D8B74057B26A600DAD33' => [Frame],
        '19FF098094F6BA03D87E962F6CA50313' => [Frame],
        'E926970073871D8EE2050AC1B9ACF684' => [Frame],
        '8367A521BB12389C35593F74C7FFED22' => [Frame],
        'A654DEE18AF228AC006D507665A79BAF' => [Frame],
        '36E2AF7D10AB962D34C5B8CF5F9A1423' => [Frame],
        '10CC99AB3803FCFDF57852C5486AA3C7' => [Frame],
        'C81F8E3D93067BD3900B88BB1A2D2E81' => [Frame],
        '73D5BB25DBE3106C2E9F6BACEBD0E2F0' => [Frame],
        '17AE18F54C70E751035B955C853CF56D' => [Frame],
        'CC6FDB2282103FFCB38E70A0D92410C2' => [Frame],
        '8859446DAA489282737DF33449F9E989' => [Frame],
        'BF6E87531CAC202369568CC04874A38E' => [Frame],
        '1637C6E69DB28FED9BDC712B0FAF4CC7' => [Frame],
        '528E2770A31A2CABC0A8DC00A5F4E484' => [Frame],
        '0496B3EC695878DC44CB7CEB413961A2' => [Frame],
        'ADFF0E3BA7E6CC3D6CB621C9C1A8D921' => [Frame],
        'AE3B4D6A1274D077AE11C40E426348ED' => [Frame],
        '861869B2B6178FD8C35AC30D1D63FB19' => [Frame],
        '49AAD170FE358CD5219B6B07BFCA3778' => [Frame],
        '8A198CEF55F8B1B5E376E7AF6366883E' => [Frame],
        'CEE94ECA45894F91A65D1A143F3D518D' => [Frame],
        '7507A750C4395B5DCDA43D074967074C' => [Frame],
        '5AFF7CEF75304EDA60136C2C967D3733' => [Frame],
        'A56846F928DC385323004A2907D51D63' => [Frame],
        '34D4B59AF639DC87573D9959FA374192' => [Frame],
        '8EE68A2425ADE0B8BDF0F0B2EE923E58' => [Frame],
        '12AF2DE4D0EB314FF988910148F6687C' => [Frame],
        '7644F9D36F60E83D082105C10E4810E8' => [Frame],
        'B5387525D50DE9E605A67160C62DA7F3' => [Frame],
        '82D41968855B3B4C4D162994ECF20FAE' => [Frame],
        'C0D4C33097EB0ED4759EB3DE13028630' => [Frame],
        '935006567AB41786E92D95AFD022F047' => [Frame],
        '8AF2364F2FD8D31610B630FA35EE9D12' => [Frame],
        '48D09C5F8062F490B6823AB7536B4465' => [Frame],
        '7A31B391A9A79BEFE818F0ABCDE7C9BF' => [Frame],
        '46B8CF30B701AF580CBDB23E5FECEF26' => [Frame],
        'DFCA8258497B894E8C3D0FEE3210000D' => [Frame],
        'DE3154A0CC20AA07FA22545641146A82' => [Frame],
        '3EAED113E679B88A2CBC646AA0C001C2' => [Frame],
        '568BBD3A99FB775756992953CDFED16A' => [Frame],
        '18476C5E2C5BE1156A98416CDCC7749D' => [Frame],
        '63084F21480C28A59FAC8E3B81B07A02' => [Frame],
        '0345435364F9FD7584FCAA4CCAB00BE0' => [Frame],
        '4B43DC8172439371D8A27CABF91D735F' => [Frame],
        '992850032F893DE425251572C3308202' => [Frame],
        '230C9DD9CEF6E1720BBD3DE294E2303A' => [Frame],
        '38E5C4CD960DE753131BC9EF5297913A' => [Frame],
        '33F0648A9B9ACA3C8C83816402835D26' => [Frame],
        '19A67899D26D1E6F4CA3B5E1373EB6E8' => [Frame],
        '5CA13B8EDFD47D08786595880F70467A' => [Frame],
        'BC3630B8587B5A6FDC5FEBFFAABEF7D2' => [Frame],
        'C89590DB384E8E407F16527F2DE9C10C' => [Frame],
        '515A305ED3BBEA53BCAEC3DE4BA9E87B' => [Frame],
        '675D8EDC0FCE089DCCD20851C8083709' => [Frame],
        '11A8949CD4AD48267F60CDE59021699F' => [Frame],
        '3DAE34B24879BF9EBF5D0A1685313164' => [Frame],
        '5CEE8B87EDCEB207EA1C878D0F10AEC7' => [Frame],
        '0DEBC68EB51C84F54949E5BE91FA3E11' => [Frame],
        '80BBC46E6F2C47584542A209530A48C8' => [Frame] },
     _contextIdToContext:
      Map {
        3 => [ExecutionContext],
        4 => [ExecutionContext],
        9 => [ExecutionContext],
        10 => [ExecutionContext],
        12 => [ExecutionContext],
        13 => [ExecutionContext],
        14 => [ExecutionContext],
        15 => [ExecutionContext],
        18 => [ExecutionContext],
        19 => [ExecutionContext],
        20 => [ExecutionContext],
        21 => [ExecutionContext],
        22 => [ExecutionContext],
        23 => [ExecutionContext],
        36 => [ExecutionContext],
        37 => [ExecutionContext],
        38 => [ExecutionContext],
        39 => [ExecutionContext],
        46 => [ExecutionContext],
        47 => [ExecutionContext],
        121 => [ExecutionContext],
        122 => [ExecutionContext],
        123 => [ExecutionContext],
        124 => [ExecutionContext],
        125 => [ExecutionContext],
        126 => [ExecutionContext],
        127 => [ExecutionContext],
        128 => [ExecutionContext],
        129 => [ExecutionContext],
        130 => [ExecutionContext],
        131 => [ExecutionContext],
        132 => [ExecutionContext],
        133 => [ExecutionContext],
        134 => [ExecutionContext],
        135 => [ExecutionContext],
        136 => [ExecutionContext],
        137 => [ExecutionContext],
        138 => [ExecutionContext],
        139 => [ExecutionContext],
        140 => [ExecutionContext],
        141 => [ExecutionContext],
        142 => [ExecutionContext],
        143 => [ExecutionContext],
        144 => [ExecutionContext],
        145 => [ExecutionContext],
        146 => [ExecutionContext],
        147 => [ExecutionContext],
        148 => [ExecutionContext],
        149 => [ExecutionContext],
        150 => [ExecutionContext],
        151 => [ExecutionContext],
        152 => [ExecutionContext],
        153 => [ExecutionContext],
        154 => [ExecutionContext],
        155 => [ExecutionContext],
        156 => [ExecutionContext],
        157 => [ExecutionContext],
        158 => [ExecutionContext],
        159 => [ExecutionContext],
        160 => [ExecutionContext],
        161 => [ExecutionContext],
        162 => [ExecutionContext],
        163 => [ExecutionContext],
        164 => [ExecutionContext],
        165 => [ExecutionContext],
        166 => [ExecutionContext],
        167 => [ExecutionContext],
        168 => [ExecutionContext],
        169 => [ExecutionContext],
        170 => [ExecutionContext],
        171 => [ExecutionContext],
        172 => [ExecutionContext],
        173 => [ExecutionContext],
        174 => [ExecutionContext],
        175 => [ExecutionContext],
        176 => [ExecutionContext],
        177 => [ExecutionContext],
        178 => [ExecutionContext],
        181 => [ExecutionContext],
        182 => [ExecutionContext],
        185 => [ExecutionContext],
        186 => [ExecutionContext],
        187 => [ExecutionContext],
        188 => [ExecutionContext],
        189 => [ExecutionContext],
        190 => [ExecutionContext],
        191 => [ExecutionContext],
        192 => [ExecutionContext],
        193 => [ExecutionContext],
        194 => [ExecutionContext],
        198 => [ExecutionContext],
        199 => [ExecutionContext],
        200 => [ExecutionContext],
        201 => [ExecutionContext],
        202 => [ExecutionContext],
        203 => [ExecutionContext],
        204 => [ExecutionContext],
        205 => [ExecutionContext],
        206 => [ExecutionContext],
        207 => [ExecutionContext],
        208 => [ExecutionContext],
        209 => [ExecutionContext],
        210 => [ExecutionContext],
        211 => [ExecutionContext],
        213 => [ExecutionContext],
        214 => [ExecutionContext],
        215 => [ExecutionContext],
        216 => [ExecutionContext],
        217 => [ExecutionContext],
        218 => [ExecutionContext],
        224 => [ExecutionContext],
        225 => [ExecutionContext],
        226 => [ExecutionContext],
        227 => [ExecutionContext],
        228 => [ExecutionContext],
        229 => [ExecutionContext],
        230 => [ExecutionContext],
        231 => [ExecutionContext],
        232 => [ExecutionContext],
        233 => [ExecutionContext],
        234 => [ExecutionContext],
        235 => [ExecutionContext],
        244 => [ExecutionContext],
        245 => [ExecutionContext],
        246 => [ExecutionContext],
        247 => [ExecutionContext],
        248 => [ExecutionContext],
        249 => [ExecutionContext],
        250 => [ExecutionContext],
        251 => [ExecutionContext],
        252 => [ExecutionContext],
        253 => [ExecutionContext],
        254 => [ExecutionContext],
        255 => [ExecutionContext],
        256 => [ExecutionContext],
        257 => [ExecutionContext],
        265 => [ExecutionContext],
        266 => [ExecutionContext],
        267 => [ExecutionContext],
        268 => [ExecutionContext],
        269 => [ExecutionContext],
        270 => [ExecutionContext],
        271 => [ExecutionContext],
        272 => [ExecutionContext],
        273 => [ExecutionContext],
        274 => [ExecutionContext],
        275 => [ExecutionContext],
        282 => [ExecutionContext],
        283 => [ExecutionContext],
        284 => [ExecutionContext],
        285 => [ExecutionContext],
        286 => [ExecutionContext],
        287 => [ExecutionContext],
        288 => [ExecutionContext],
        289 => [ExecutionContext] },
     _isolatedWorlds: Set { '__puppeteer_utility_world__' },
     _mainFrame:
      Frame {
        _frameManager: [Circular],
        _client: [CDPSession],
        _parentFrame: null,
        _url: 'https://toyokeizai.net/articles/-/196238?page=2',
        _id: '7ADE988C46D175994372B0AE088AD1C4',
        _detached: false,
        _loaderId: 'EC1983F02F05BE8630D8C22032B6E459',
        _lifecycleEvents: [Set],
        _mainWorld: [DOMWorld],
        _secondaryWorld: [DOMWorld],
        _childFrames: [Set],
        _name: undefined,
        _navigationURL: 'https://toyokeizai.net/articles/-/196238?page=2' } } }

*/