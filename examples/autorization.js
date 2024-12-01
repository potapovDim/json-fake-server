const fakeServer = require('../index');

const model = {
  port: 8081,
  authorization: {
    type: 'headers',
  },
  api: [
    {
      method: 'GET',
      path: '/example',
      response: {
        example: 'example GET',
      },
      authorization: {
        status: 401,
        token: 'testToken',
      },
    },
  ],
};
const server = fakeServer(model);

setTimeout(() => {
  server.stop();
}, 2500);

async function callToServer() {
  const withoutTokenData = await fetch('http://localhost:8081/example', { method: 'GET' }).then(res => res.json());
  // {unauthorized: 'unauthorized'}
  console.log(withoutTokenData);
  const withTokenData = await fetch('http://localhost:8081/example', {
    headers: {
      Authorization: 'Bearer testToken',
    },
    method: 'GET',
  }).then(res => res.json());
  console.log(withTokenData);
  // {example: "example GET"}
}
callToServer();
