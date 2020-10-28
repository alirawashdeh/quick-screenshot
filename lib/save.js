const fs = require('fs');

const saveScreenshots = async (config, screenshotArray)  => {

  console.log('👉 Outputtng screenshots')
  for (let i = 0; i < screenshotArray.length; i++){
    await fs.writeFile('Screenshot - ' + config[i].name + '.png', screenshotArray[i], function (err) {
        if (err) return console.log('❌ Error outputting screenshot #' + i + ' ' + err);
      });
  }
  console.log('💾 Finished outputting screenshots')
}


module.exports = saveScreenshots;
