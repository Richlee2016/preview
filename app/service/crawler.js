const Service = require("egg").Service;

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

class CrawlerService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async crawlerVideo() {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            dumpio: false
          })
          const page = await browser.newPage()
        
          for (let i = 0; i < movies.length; i++) {
            let doubanId = movies[i].doubanId
        
            await page.goto(base + doubanId, {
              waitUntil: 'networkidle2'
            })
            await sleep(1000)
        
            const result = await page.evaluate(() => {
              var $ = window.$
              var it = $('.related-pic-video')
        
              if (it && it.length > 0) {
                var link = it.attr('href')
                var cover = it.find('img').attr('src')
        
                return {
                  link,
                  cover
                }
              }
        
              return {}
            })
        
            let video
        
            if (result.link) {
              await page.goto(result.link, {
                waitUntil: 'networkidle2'
              })
              await sleep(1000)
        
              video = await page.evaluate(() => {
                var $ = window.$
                var it = $('source')
        
                if (it && it.length > 0) {
                  return it.attr('src')
                }
        
                return ''
              })
            }
            const data = {
              video,
              doubanId,
              cover: result.cover
            }
          }
          browser.close()
    }
}

module.exports = CrawlerService;