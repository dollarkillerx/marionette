# marionette
Fast dynamic site crawling based on puppeteer (基于puppeteer的动态网站抓取)

### Run
node >= 14
``` 
npm i
npm start
```

### Result API
- SSR 浏览器渲染
``` 
GET /ssr?q=http://google.com

RESPONSE:
HTML  
Status
Cookie
```
- 获取更多数据
``` 
GET /avaricious?q=http://google.com

RESPONSE:
{
    "body": string,
    "status": int,
    "cookie": [
         {
            name: string,
            value: string,
            domain: string,
            path: string,
            expires: int,
            size: int,
            httpOnly: bool,
            secure: bool,
            session: bool
          }
    ]
}
```
