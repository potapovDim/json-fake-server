const fakeServer = require('../index');

const model = {
  port: 8081,
  api: [
    {
      method: 'GET',
      path: '/example',
      response: {
        example: 'example GET',
      },
    },
    {
      method: 'POST',
      path: '/example',
      response: {
        example: 'example POST',
      },
    },
    {
      method: 'DELETE',
      path: '/example',
      response: {
        example: 'example DELETE',
      },
    },
    {
      method: 'PUT',
      path: '/example',
      response: {
        example: 'example PUT',
      },
    },
  ],
};

const server = fakeServer(model);

setTimeout(() => {
  server.stop();
}, 2500);

async function callToServer() {
  const postData = await fetch('http://localhost:8081/example', { method: 'POST' }).then(res => res.json());
  // {example: "example POST"}
  console.log(postData);
  const getData = await fetch('http://localhost:8081/example', { method: 'GET' }).then(res => res.json());
  // {example: "example GET"}
  console.log(getData);
  const putData = await fetch('http://localhost:8081/example', { method: 'PUT' }).then(res => res.json());
  // {example: "example PUT"}
  console.log(putData);
  const deleteData = await fetch('http://localhost:8081/example', { method: 'DELETE' }).then(res => res.json());
  // {example: "example DELETE"}
  console.log(deleteData);
}
callToServer();
