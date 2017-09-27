const {expect} = require('chai');

const {
  formResult,
  parseJson,
  killServer,
  getCurrentAction
} = require('../lib/util')

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
    }])).to.eql({})
    expect(getCurrentAction('/a','TEST', [{
      path: '/b',
      method: 'TEST',
      calledArgs: []
    }])).to.eql({})
    expect(getCurrentAction('/a','TEST', [{
      path: '/a',
      method: 'TEST',
      calledArgs: []
    }])).to.eql({
      method: 'TEST',
      calledArgs: [],
      path: '/a'
    })
  });
});