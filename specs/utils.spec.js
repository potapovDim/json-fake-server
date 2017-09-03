const {expect} = require('chai');

const {
  formResult,
  parseJson,
  killServer
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
  })
});