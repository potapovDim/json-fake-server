const { expect } = require('chai');
const fetch = require("node-fetch");
const FakeServer = require('../lib');


describe('FakeServer', () => {
  let server = null
  beforeEach(() => {
    server = new FakeServer(3535)
    server.get('/lol', { LOL: 'LOL' });
    server.put('/lol', { lol1: 'lol1' });
    server.post('/xxx', { LOLXXX: 'LOLXX' }, { error: 'SUPER CUSTOM ERROR' }, true, { a: 'a' });
    server.post('/ggg', { LOLGGG: 'LOLGGG' });
    server.post('/new', { LOLNEW: 'LOLNEW' });
    server.del('/nnn', { NNN: 'NNN' });
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
      expect(result.status).to.eql(400);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
    {
      const result = await fetch('http://localhost:3535');
      expect(result.status).to.eql(400);
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
  it('put negative', async () => {
    {
      const result = await fetch('http://localhost:3535/aaaaa', { method: 'PUT' });
      expect(result.status).to.eql(400);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
    {
      const result = await fetch('http://localhost:3535', { method: 'PUT' });
      expect(result.status).to.eql(400);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
  });
  it('post ', async () => {
    {
      const result = await fetch('http://localhost:3535/ggg', { method: 'POST' });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ LOLGGG: 'LOLGGG' });
    }
    {
      const result = await fetch('http://localhost:3535/xxx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 'a' })
      }); //headers["Content-Type"] = "application/json";
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ LOLXXX: 'LOLXX' });
    }
  });
  it('post negative', async () => {
    {
      const result = await fetch('http://localhost:3535/xxx', { method: 'POST' });
      expect(result.status).to.eql(400);
      expect(await result.json()).to.eql({ error: 'SUPER CUSTOM ERROR' });
    }
    {
      const result = await fetch('http://localhost:3535', { method: 'POST' });
      expect(result.status).to.eql(400);
      expect(await result.json()).to.eql({ error: 'api.notfound' });
    }
  });
  it('del', async () => {
    {
      const result = await fetch('http://localhost:3535/nnn', { method: 'DELETE' });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ NNN: 'NNN' });
    }
    {
      const result = await fetch('http://localhost:3535/nnn', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'test' })
      });
      expect(result.status).to.eql(200);
      expect(await result.json()).to.eql({ NNN: 'NNN' });
    }
  });
  it('del negative', async () => {
    const result = await fetch('http://localhost:3535', { method: 'DELETE' });
    expect(result.status).to.eql(400);
    expect(await result.json()).to.eql({ error: 'api.notfound' });
  });
});
