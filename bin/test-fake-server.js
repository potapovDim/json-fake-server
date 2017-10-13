#!/usr/bin/env node
const FakeServer = require('../index');
const fakeServer = new FakeServer()//.serveStatic()
fakeServer.serveStatic()