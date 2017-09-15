const { expect } = require('chai');

const FakeServer = require('../lib')


const fetch = require("node-fetch");

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
})

describe('FakeServer', () => {
  let server = null
  beforeEach(() => {
    server = new FakeServer(3535)
    server.get('/lol', { LOL: 'LOL' });
    server.put('/lol', { lol1: 'lol1' });
    server.post('/xxx', { LOLXXX: 'LOLXX' }, { error: 'SUPER CUSTOM ERROR' }, true, { a: 'a' });
    server.post('/new', { LOLNEW: 'LOLNEW' });
    server.start();
  });
  afterEach(() => {
    server.restore()
  });
  it('get', async () => {
    const result = await fetch('http://localhost:3535/lol');
    expect(result.status).to.eql(200);
    expect(await result.json()).to.eql({ LOL: 'LOL' });
  });
  it('get negative', async () => {
    {
      const result = await fetch('http://localhost:3535/aaaaa');
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
    {
      const result = await fetch('http://localhost:3535');
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
  });
  it('put ', async () => {
    {
      const result = await fetch('http://localhost:3535/lol', { method: 'PUT' });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ lol1: 'lol1' });
    }
  });
  it('get negative', async () => {
    {
      const result = await fetch('http://localhost:3535/aaaaa', { method: 'PUT' });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
    {
      const result = await fetch('http://localhost:3535', { method: 'PUT' });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
  });
});
