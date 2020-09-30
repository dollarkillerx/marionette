# marionette
Fast dynamic site crawling based on puppeteer (基于puppeteer的动态网站抓取)

### Result API
- SSR 浏览器渲染
``` 
GET /ssr?q=http://google.com

RESPONSE:
HTML  返回标准HTML
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
