const fakeServer = require('../index');

const { expect } = require('chai');
const path = require('path');

describe('DELETE gets', () => {
  let server = null;

  afterEach(async () => {
    await server.stop();
  });

  it('obj response', async function () {
    const model_obj = {
      port: 8888,
      api: [
        {
          method: 'DELETE',
          path: '/user',
          response: {
            user_response_success: 'user_response_success',
          },
        },
      ],
    };
    server = await fakeServer(model_obj);
    const responseBody = await fetch('http://localhost:8888/user', { method: 'DELETE' }).then(res => res.json());
    expect(responseBody.user_response_success).to.eql('user_response_success');
  });

  it('html', async function () {
    const model_obj = {
      port: 8888,
      api: [
        {
          method: 'DELETE',
          path: '/index',
          response: path.resolve(__dirname, './misc/index.html'),
        },
      ],
    };
    server = await fakeServer(model_obj);
    const responseBody = await fetch('http://localhost:8888/index?test=yes', { method: 'DELETE' }).then(res => res.text());
    expect(responseBody).to.contains('<div>test</div>');
  });
});
