const {expect} = require('chai');

const {
  formResult,
  parseJson,
  killServer,
  getCurrentAction
} = require('../lib/util');
const deepEqual = require('../lib/equalObj');

describe('util', () => {
  it('parseJson', () => {
    expect(parseJson('{"a": "a"}')).to.eql({a: 'a'});
    expect(parseJson({"a": "a"})).to.eql(null);
  });
  it('getCurrentAction', () => {
    expect(getCurrentAction('','', [])).to.eql('Path didnt call')
    expect(getCurrentAction('/a','TEST', [{
      path: '/a',
      method: 'TEST1',
      calledArgs: []
    }])).to.eql('Path didnt call');
    expect(getCurrentAction('/a','TEST', [{
      path: '/b',
      method: 'TEST',
      calledArgs: []
    }])).to.eql('Path didnt call');
    expect(getCurrentAction('/a','TEST', [{
      path: '/a',
      method: 'TEST',
      calledArgs: []
    }])).to.eql({
      method: 'TEST',
      calledArgs: []
    });
  });
  it('deepEqual', () => {
    expect(deepEqual({}, {})).to.eql(true)
    expect(deepEqual({}, [])).to.eql(false)
    expect(deepEqual([], {})).to.eql(false)
    expect(deepEqual([], '')).to.eql(false)
    expect(deepEqual('', [])).to.eql(false)
  })
});