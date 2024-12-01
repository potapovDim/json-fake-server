const fakeServer = require('../index');

const { expect } = require('chai');
const path = require('path');

describe('Get gets', () => {
  let server = null;

  afterEach(async () => {
    await server.stop();
  });

  it('obj response', async function () {
    const model_obj = {
      port: 8887,
      api: [
        {
          method: 'GET',
          path: '/user',
          response: {
            user_response_success: 'user_response_success',
          },
        },
      ],
    };
    server = await fakeServer(model_obj);
    const responseBody = await fetch('http://localhost:8887/user').then(res => res.json());
    expect(responseBody.user_response_success).to.eql('user_response_success');
  });

  it('html', async function () {
    const model_obj = {
      port: 8887,
      api: [
        {
          method: 'GET',
          path: '/index',
          response: path.resolve(__dirname, './misc/index.html'),
        },
      ],
    };
    server = await fakeServer(model_obj);
    const responseBody = await fetch('http://localhost:8887/index?test=yes').then(res => res.text());
    expect(responseBody).to.contains('<div>test</div>');
  });
});
