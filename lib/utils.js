const fs = require('fs')

function fs_write_sync(fs_path, data) {
  fs.writeFileSync(fs_path, data)
}

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
