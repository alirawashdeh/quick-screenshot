const puppeteer = require('puppeteer')

const screenshot = async (config) => {

  var screenshotArray = [config.length]
  // Launch and Setup Chromium
  const browser = await puppeteer.launch()
  // Fun with puppeteer
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()
  page.setJavaScriptEnabled(false)

  const promises = []
  for (let j = 0; j < config.length; j++) {

    // only proceed if there is an element
    if (config[j] !== undefined) {
      // Promise to take Screenshots
      // promises push
      console.log('🖖 I promise to screenshot: ' + config[j].name)
      promises.push(browser.newPage().then(async page => {
        await page.setViewport({ width: 1280, height: 800 })
        try {

          const username = config[j].username
          const password = config[j].password
          if(username && password){
            await page.setExtraHTTPHeaders({ 'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64') })
          }

          // Only create screenshot if page.goto get's no error
          await page.goto(config[j].url)

          const buffer = await page.screenshot({ fullPage: true, encoding: "binary" });// as Buffer;
          screenshotArray[j] = buffer;
          console.log('🤞 I have kept my promise to screenshot ' + config[j].name)

        } catch (err) {
          console.log(err)
          console.log('❌ Sorry! I couldn\'t keep my promise to screenshot ' + config[j].name)
        }
      }
    ))
  }
}

// await promise all and close browser
await Promise.all(promises)
await browser.close()
return screenshotArray
}

module.exports = screenshot;
