"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var lib_1 = __importDefault(require("./lib"));
var app = new koa_1.default();
var router = new koa_router_1.default();
router.get('/', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = "Fast dynamic site crawling based on puppeteer (基于puppeteer的动态网站抓取) https://github.com/dollarkillerx/marionette";
        return [2 /*return*/];
    });
}); });
router.get('/ssr', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a, html, code, cookies;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                path = "" + ctx.request.querystring;
                return [4 /*yield*/, getUrl(path)];
            case 1:
                path = _b.sent();
                return [4 /*yield*/, crawler(path)];
            case 2:
                _a = _b.sent(), html = _a.html, code = _a.status, cookies = _a.cookies;
                ctx.body = html;
                ctx.status = code;
                cookies.forEach(function (item) {
                    ctx.cookies.set(item.name, item.value);
                });
                return [2 /*return*/];
        }
    });
}); });
router.get('/avaricious', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a, html, code, cookies;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                path = "" + ctx.request.querystring;
                return [4 /*yield*/, getUrl(path)];
            case 1:
                path = _b.sent();
                return [4 /*yield*/, crawler(path)];
            case 2:
                _a = _b.sent(), html = _a.html, code = _a.status, cookies = _a.cookies;
                // console.log(html, code, cookies)
                ctx.body = { html: html, statusCode: code, cookies: cookies };
                return [2 /*return*/];
        }
    });
}); });
function getUrl(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            path = path.substring(path.indexOf("q=") + 2);
            if (path.indexOf("http") === -1) {
                path = "http://" + path;
            }
            return [2 /*return*/, path];
        });
    });
}
function crawler(url) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, c, resp, html, cookies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    browser = globalThis.browser;
                    return [4 /*yield*/, browser.newPage()];
                case 1:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1920, height: 1080 })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, randUserAgent()];
                case 3:
                    c = _a.sent();
                    return [4 /*yield*/, page.setUserAgent(c)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.goto(url)
                        // const status = await p
                        // await page.waitFor(1000);
                        // Scrape
                    ];
                case 5:
                    resp = _a.sent();
                    return [4 /*yield*/, page.content()];
                case 6:
                    html = _a.sent();
                    return [4 /*yield*/, page.cookies()];
                case 7:
                    cookies = _a.sent();
                    // console.log(cookies)
                    // let code = await page.status();
                    // console.log(code);
                    return [4 /*yield*/, page.close()];
                case 8:
                    // console.log(cookies)
                    // let code = await page.status();
                    // console.log(code);
                    _a.sent();
                    // @ts-ignore
                    return [2 /*return*/, { html: html, status: resp.status(), cookies: cookies }];
            }
        });
    });
}
function randUserAgent() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, random(0, lib_1.default.length)];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, lib_1.default[r]];
            }
        });
    });
}
function random(min, max) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Math.floor(Math.random() * (max - min)) + min];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // @ts-ignore
                    _a = globalThis;
                    return [4 /*yield*/, puppeteer_1.default.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] })];
                case 1:
                    // @ts-ignore
                    _a.browser = _b.sent();
                    app.use(router.routes());
                    app.listen(3030);
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function (r) {
    console.log('server is running in', 3030);
});
