// const fakeServer = require('../index')
//
// const {expect} = require('chai')
// const path = require('path')

// describe('PUT gets', () => {
//   let server = null

//   afterEach(() => {
//     server.stop()
//   })

//   it('obj response', async function ()  {
//     const model_obj = {
//       "port": 8888,
//       "api": [
//         {
//           "method": "PUT",
//           "path": "/user",
//           "response": {
//             "user_response_success": "user_response_success"
//           }
//         }
//       ]
//     }
//     server = fakeServer(model_obj)
//     const responseBody = await fetch('http://localhost:8888/user', {method: 'PUT'}).then((res) => res.json())
//     expect(responseBody.user_response_success).to.eql('user_response_success')
//   })

//   it('html', async function ()  {
//     const model_obj = {
//       "port": 8888,
//       "api": [
//         {
//           "method": "PUT",
//           "path": "/index",
//           "response": path.resolve(__dirname, './misc/index.html')
//         }
//       ]
//     }
//     server = fakeServer(model_obj)
//     const responseBody = await fetch('http://localhost:8888/index?test=yes', {method: 'PUT'}).then((res) => res.text())
//     expect(responseBody).to.contains('<div>test</div>')
//   })
// })
