
import Koa from 'koa'
import KoaRouter from 'koa-router'
import puppeteer from 'puppeteer'
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

const router = new KoaRouter()

router.get('/ssr', async (ctx, next) => {
    let path = `${ctx.request.querystring}`;
    path = await getUrl(path)


    ctx.body = path
})

router.get('/avaricious', async (ctx, next) => {
    let path = `${ctx.request.querystring}`;
    path = await getUrl(path)


    ctx.body = path
})

async function getUrl(path: string) {
    path = path.substring(path.indexOf("q=") + 2);
    if (path.indexOf("http") === -1) {
        path = `http://${path}`
    }
    return path
}

async function crawler(url: string) {
    // 爬取数据的代码
    // 返回数据
    const browser = await puppeteer.launch({headless: true});
    // globalThis.

    const page = await browser.newPage();

    page.on('response',
        function (response) {
            if (response.url() === url) {
                console.log(response.status());
            }
        }
    )
    await page.goto(url);
    // await page.waitFor(1000);
    // Scrape
    let html = await page.content();
    const cookies = await page.cookies();
    console.log(cookies)
    // let code = await page.status();
    // console.log(code);
    browser.close();
    return [html, cookies]
}


app.use(router.routes());
app.listen(3000);