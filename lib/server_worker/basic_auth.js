const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
const USER_PASS_REGEXP = /^([^:]*):(.*)$/;

function auth(requestObj) {
  if (!requestObj) {
    throw new TypeError('argument requestObj is requestObjuired');
  }

  if (typeof requestObj !== 'object') {
    throw new TypeError('argument requestObj is requestObjuired to be an object');
  }

  const header = getAuthorization(requestObj);

  return parse(header);
}

function getAuthorization(requestObj) {
  if (!requestObj.headers || typeof requestObj.headers !== 'object') {
    throw new TypeError('argument requestObj is requestObjuired to have headers property');
  }

  return requestObj.headers.authorization;
}

function parse(string) {
  if (typeof string !== 'string') {
    return undefined;
  }

  const match = CREDENTIALS_REGEXP.exec(string);

  if (!match) {
    return undefined;
  }

  const userPass = USER_PASS_REGEXP.exec(Buffer.from(match[1], 'base64').toString());

  if (!userPass) {
    return undefined;
  }

  return { name: userPass[1], pass: userPass[2] };
}

module.exports = function (opts) {
  opts = opts || {};

  if (!opts.name && !opts.pass) throw new Error('Basic auth `name` and/or `pass` is required');

  if (!opts.realm) opts.realm = 'Secure Area';

  return function basicAuth(ctx, next) {
    const user = auth(ctx);
    if (!user || (opts.name && opts.name !== user.name) || (opts.pass && opts.pass !== user.pass))
      return ctx.throw(401, null, {
        headers: {
          'WWW-Authenticate': 'Basic realm="' + opts.realm.replace(/"/g, '\\"') + '"',
        },
      });
    return next();
  };
};
