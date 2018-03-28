const Service = require("egg").Service;
const puppeteer = require("puppeteer");

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

class CrawlerService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async crawlerVideo(href) {
    console.log("crawler",href);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(href);

    await sleep(5000);

    const vidoehref = await page.evaluate(() => {
      var $ = window.$
      var it = $('.related-pic-video').attr("href");
      return it;
    });

    await page.goto(vidoehref);

    await sleep(5000);

    const videoList = await page.evaluate (() => {
      var $ = window.$;
      var it = $("video source").attr("src");
      return it;
    })
    await browser.close();
    return videoList;
  }
}

module.exports = CrawlerService;