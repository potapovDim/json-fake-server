const fs = require('fs')

/** // sync implementation
  * @param {string} fs_path path to file, where it should be created
  * @param {string} data stringified object ets
  * @returns {void}
  */
function fs_write_sync(fs_path, data) {
  fs.writeFileSync(fs_path, data)
}

/** // async implementation
  * @param {string} fs_path path to file, where it should be created
  * @param {string} data stringified object ets
  * @returns {void}
  */
async function fs_write_async(fs_path, data) {
  await new Promise((res) => {
    fs.writeFile(fs_path, data, (err) => {
      if(err) throw new Error('Something wend wrong with file creation process')
      res()
    })
  })
}

module.exports = {
  fs_write_async,
  fs_write_sync
}
