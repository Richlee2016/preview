const Service = require("egg").Service;
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const rp = require("request-promise-native")
const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})
class CrawlerService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async crawlerVideo(href){
    const movieHtml = await rp(href);
    const videoHref = this._htmlMovie(movieHtml);
    if(!videoHref) return;
    const videoHtml = await rp(videoHref);
    const videoSrc = this._htmlVideo(videoHtml);
    console.log("videoSrc",videoSrc);
    return videoSrc;
  }

  _htmlMovie(html){
    const $ = cheerio.load(html);
    return $('.related-pic-video').attr("href");
  }

  _htmlVideo(html){
    const $ = cheerio.load(html);
    return $("video source").attr("src");
  }

  // async crawlerVideo(href) {
    // console.log(href);
  //   console.log("crawler",href);
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(href);

  //   await sleep(5000);

  //   const vidoehref = await page.evaluate(() => {
  //     var $ = window.$
  //     var it = $('.related-pic-video').attr("href");
  //     return it;
  //   });

  //   await page.goto(vidoehref);

  //   await sleep(5000);

  //   const videoList = await page.evaluate (() => {
  //     var $ = window.$;
  //     var it = $("video source").attr("src");
  //     return it;
  //   })
  //   await browser.close();
  //   return videoList;
  // }
}

module.exports = CrawlerService;