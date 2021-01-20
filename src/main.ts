import Koa from 'koa'
import KoaRouter from 'koa-router'
import puppeteer from 'puppeteer'
import userAgents from "./lib";
const app = new Koa();

const router = new KoaRouter()

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
  // console.log(html, code, cookies)
  ctx.body = { html, statusCode: code, cookies }
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

  // @ts-ignore
  const browser = globalThis.browser as puppeteer.Browser

  const page = await browser.newPage();


  await page.setViewport({width: 1920, height: 1080})
  let c = await randUserAgent();
  await page.setUserAgent(c);
  const resp = await page.goto(url)

  // const status = await p
  // await page.waitFor(1000);
  // Scrape
  let html = await page.content();
  const cookies = await page.cookies();
  // console.log(cookies)
  // let code = await page.status();
  // console.log(code);
  await page.close();
  // @ts-ignore
  return { html, status: resp.status(), cookies }
}

async function randUserAgent(){
  let r = await random(0,userAgents.length);
  return userAgents[r]
}

async function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  // @ts-ignore
  globalThis.browser = browser
  app.use(router.routes());
  app.listen(5000);
}

main().then(r => {
  console.log('server is running in', 5000)
})
