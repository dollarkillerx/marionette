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
    const { html, status: code, cookies } = await crawler(path);

    ctx.body = html
    ctx.status = code
    cookies.forEach(item => {
        ctx.cookies.set(item.name, item.value)
    })
})

router.get('/avaricious', async (ctx) => {
    let path = `${ctx.request.querystring}`;
    path = await getUrl(path)

    const { html, status: code, cookies } = await crawler(path);
    console.log(html, code, cookies)
    ctx.body = { html, statusCode: code, cookies }
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


    const resp = await page.goto(url)

    // const status = await p
    // await page.waitFor(1000);
    // Scrape
    let html = await page.content();
    const cookies = await page.cookies();
    // console.log(cookies)
    // let code = await page.status();
    // console.log(code);
    page.close();
    return { html, status: resp.status(), cookies }
}

async function main() {
    const browser = await puppeteer.launch({ headless: true });
    globalThis.browser = browser
    app.use(router.routes());
    app.listen(3000);
}

main()
console.log('server is running in', 3000)
