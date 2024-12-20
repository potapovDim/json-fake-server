const fakeServer = require('../index');

const { expect } = require('chai');

describe('Body equal gets allow_partial_expected_body', () => {
  let server = null;
  const model_obj = {
    port: 8888,
    api: [
      {
        method: 'POST',
        path: '/user',
        request_body_equal: {
          status: 404,
          allow_partial_expected_body: true,
          expected_body: {
            username: 'test',
            password: 'test_pass',
          },
        },
        response: {
          success: true,
        },
      },
    ],
  };
  beforeEach(async () => {
    server = await fakeServer(model_obj);
  });
  afterEach(async () => {
    await server.stop();
  });

  it('success', async function () {
    const responseBody = await fetch('http://localhost:8888/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test', password: 'test_pass' }),
    }).then(res => res.json());
    expect(responseBody.success).to.eql(true);
  });

  it('[more_than_required_keys] success', async function () {
    const responseBody = await fetch('http://localhost:8888/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test', password: 'test_pass', x: 2, Y: 2 }),
    }).then(res => res.json());
    expect(responseBody.success).to.eql(true);
  });

  it('invalid', async function () {
    const responseBody = await fetch('http://localhost:8888/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test---', password: 'test_pass' }),
    }).then(res => res.json());
    expect(responseBody.data).to.eql('invalid request');
  });
});
