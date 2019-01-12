const fakeServer = require('../')
const fetch = require('node-fetch')
const path = require('path')

const indexHtml = path.resolve(__dirname, '../index.html')

const model = {
  "port": "8081",
  "api": [{
    "method": "GET",
    "path": "/",
    "response": indexHtml
  }]
}

const server = fakeServer(model)

setTimeout(() => {
  server.stop()
}, 2500)
callToServer()
async function callToServer() {
  const indexHtmlText = await fetch('http://localhost:8081/', {method: 'GET'}).then((res) => res.text())
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //     <title>Document</title>
  //   </head>
  //   <body>
  //     TEST FAKE SERVER
  //     <div>A</div>
  //     <div>B</div>
  //     <div>C</div>
  //     <div>D</div>
  //     <div>E</div>
  //   </body>
  //   </html>
  console.log(indexHtmlText)
}