
const puppeteer = require('puppeteer')
const urls = require('./urls').list
const parallel = 4

const screenshotColleges = async (urls, parallel) => {
  const parallelBatches = Math.ceil(urls.length / parallel)

  console.log('\nI have gotten the task of taking screenshots of ' + urls.length + ' Wikipedia articles on colleges in Cologne and will take ' + parallel + ' of them in paralell.')
  console.log(' This will result in ' + parallelBatches + ' batches.')

  // Split up the Array of colleges
  let k = 0
  for (let i = 0; i < urls.length; i += parallel) {
    k++
    console.log('\nBatch ' + k + ' of ' + parallelBatches)
    // Launch and Setup Chromium
    const browser = await puppeteer.launch()
    // Fun with puppeteer
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()
    page.setJavaScriptEnabled(false)

    const promises = []
    for (let j = 0; j < parallel; j++) {
      const elem = i + j
      // only proceed if there is an element
      if (urls[elem] !== undefined) {
        // Promise to take Screenshots
        // promises push
        console.log('🖖 I promise to screenshot: ' + urls[elem].name)
        promises.push(browser.newPage().then(async page => {
          await page.setViewport({ width: 1280, height: 800 })
          try {

            if(urls[elem].username && urls[elem].password){
            await page.setExtraHTTPHeaders({ 'Authorization': 'Basic ' + Buffer.from(urls[elem].username + ':' + urls[elem].password).toString('base64') })
            }

            // Only create screenshot if page.goto get's no error
            await page.goto(urls[elem].url)
            await page.screenshot({ path: 'Screenshot - ' + urls[elem].name + '.png', fullPage: true}).then(console.log('🤞 I have kept my promise to screenshot ' + urls[elem].name))
          } catch (err) {
            console.log(err)
            console.log('❌ Sorry! I couldn\'t keep my promise to screenshot ' + urls[elem].name)
          }
        }))
      }
    }

    // await promise all and close browser
    await Promise.all(promises)
    await browser.close()

    console.log('\nI finished this batch. I\'m ready for the next batch')
  }
}

screenshotColleges(urls, parallel)
