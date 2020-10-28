
const config = require('./config.json')
const screenshot = require('./lib/simple-screenshot.js')
const saveScreenshots = require('./lib/save.js')

const start = async () => {
  var screenshotArray = await screenshot(config)
  await saveScreenshots(config, screenshotArray)
}

start()
