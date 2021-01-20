const Koa = require('koa');
const router = require('koa-router')();
const puppeteer = require("puppeteer");
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

router.get('/', async (ctx) => {
    ctx.body = "Fast dynamic site crawling based on puppeteer (基于puppeteer的动态网站抓取) https://github.com/dollarkillerx/marionette"
})

router.get('/ssr', async (ctx) => {
    let path = `${ctx.request.querystring}`;
    path = await getUrl(path)
    const {html, status: code, cookies} = await crawler(path);

    ctx.body = html
    ctx.status = code
    cookies.forEach(item => {
        ctx.cookies.set(item.name, item.value)
    })
})

router.get('/avaricious', async (ctx) => {
    let path = `${ctx.request.querystring}`;
    path = await getUrl(path)

    const {html, status: code, cookies} = await crawler(path);
    ctx.body = {html, statusCode: code, cookies}
})

async function getUrl(path) {
    path = path.substring(path.indexOf("q=") + 2);
    if (path.indexOf("http") === -1) {
        path = `http://${path}`
    }
    return path
}

async function crawler(url) {
    // 爬取数据的代码
    // 返回数据
    const browser = globalThis.browser

    const page = await browser.newPage();

    page.setViewport({width:1920, height:1080});
    let c = await randUserAgent();
    page.setUserAgent(c);
    const resp = await page.goto(url);

    // const status = await p
    // await page.waitFor(1000);
    // Scrape
    let html = await page.content();
    const cookies = await page.cookies();
    // console.log(cookies)
    // let code = await page.status();
    // console.log(code);
    page.close();
    return {html, status: resp.status(), cookies}
}

// async function crawler(url) {
//     // 爬取数据的代码
//     // 返回数据
//
//     const browser = await puppeteer.launch(
//         {headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage']}
//     );
//
//     const page = await browser.newPage();
//
//     page.setViewport({width:1920, height:1080});
//     let c = await randUserAgent();
//     page.setUserAgent(c);
//     const resp = await page.goto(url);
//
//     // const status = await p
//     // await page.waitFor(1000);
//     // Scrape
//     let html = await page.content();
//     const cookies = await page.cookies();
//     // console.log(cookies)
//     // let code = await page.status();
//     // console.log(code);
//     page.close();
//     browser.close();
//     return {html, status: resp.status(), cookies}
// }

async function main() {
    const browser = await puppeteer.launch(
        {headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage']}
    );
    // const browser = await puppeteer.launch(
    //     {headless: true}
    // );
    globalThis.browser = browser
    app.use(router.routes());
    app.listen(3000);
}

// async function main() {
//     app.use(router.routes());
//     app.listen(3000);
// }

async function randUserAgent()  {
    let r = await random(0,userAgents.length);
    return userAgents[r]
}

async function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// const userAgents= [
//     "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36/8mqQhSuL-09"
// ]

const userAgents = [
    "Mozilla/5.0 (compatible, MSIE 10.0, Windows NT, DigExt)",
    "Mozilla/4.0 (compatible, MSIE 7.0, Windows NT 5.1, 360SE)",
    "Mozilla/4.0 (compatible, MSIE 8.0, Windows NT 6.0, Trident/4.0)",
    "Mozilla/5.0 (compatible, MSIE 9.0, Windows NT 6.1, Trident/5.0,",
    "Opera/9.80 (Windows NT 6.1, U, en) Presto/2.8.131 Version/11.11",
    "Mozilla/4.0 (compatible, MSIE 7.0, Windows NT 5.1, TencentTraveler 4.0)",
    "Mozilla/5.0 (Windows, U, Windows NT 6.1, en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
    "Mozilla/5.0 (Macintosh, Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
    "Mozilla/5.0 (Macintosh, U, Intel Mac OS X 10_6_8, en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
    "Mozilla/5.0 (Linux, U, Android 3.0, en-us, Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
    "Mozilla/5.0 (iPad, U, CPU OS 4_3_3 like Mac OS X, en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
    "Mozilla/4.0 (compatible, MSIE 7.0, Windows NT 5.1, Trident/4.0, SE 2.X MetaSr 1.0, SE 2.X MetaSr 1.0, .NET CLR 2.0.50727, SE 2.X MetaSr 1.0)",
    "Mozilla/5.0 (iPhone, U, CPU iPhone OS 4_3_3 like Mac OS X, en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
    "MQQBrowser/26 Mozilla/5.0 (Linux, U, Android 2.3.7, zh-cn, MB200 Build/GRJ22, CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/44.0.2403.155 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.3319.102 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2117.157 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0",
    "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:63.0) Gecko/20100101 Firefox/63.0",
    "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.10; rv:62.0) Gecko/20100101 Firefox/62.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:10.0) Gecko/20100101 Firefox/62.0",
    "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.13; ko; rv:1.9.1b2) Gecko/20081201 Firefox/60.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/58.0.1",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/58.0",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:52.59.12) Gecko/20160044 Firefox/52.59.12",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20120121 Firefox/46.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.66.18) Gecko/20177177 Firefox/45.66.18",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1",
    "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:28.0) Gecko/20100101 Firefox/31.0",
    "Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20120101 Firefox/29.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0",
    "Mozilla/5.0 (Windows NT 6.1; rv:27.3) Gecko/20130101 Firefox/27.3",
    "Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:27.0) Gecko/20121011 Firefox/27.0",
    "Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/26.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0"
]

main()
console.log('server is running in', 3000)
