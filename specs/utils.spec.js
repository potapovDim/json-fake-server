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
  it('formResult' ,() => {
    expect(formResult({})).to.eql({});
    expect(formResult({
      path: 'a'
    })).to.eql({});
    expect(formResult({
      a: 'a'
    })).to.eql({a: 'a'});
  });
  it('getCurrentAction', () => {
    expect(getCurrentAction('','', [])).to.eql({})
    expect(getCurrentAction('/a','TEST', [{
      path: '/a',
      method: 'TEST1',
      calledArgs: []
    }])).to.eql({});
    expect(getCurrentAction('/a','TEST', [{
      path: '/b',
      method: 'TEST',
      calledArgs: []
    }])).to.eql({});
    expect(getCurrentAction('/a','TEST', [{
      path: '/a',
      method: 'TEST',
      calledArgs: []
    }])).to.eql({
      method: 'TEST',
      calledArgs: [],
      path: '/a'
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