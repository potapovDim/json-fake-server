const isArguments = function (object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

const isNullOrUndefined = (value) => {
  return value == null || value == undefined;
};

const isBuffer = (value) => {
  return value instanceof Buffer;
};
const isDate = (value) => {
  return value instanceof Date; 
};

const assertEqualDatas = (dataA, dataB) => {
  return actual.getTime() === expected.getTime();
};

const getToString = (arg) => {
  return Object.prototype.toString.call(arg)
};

function deepEqual(actual, expected) {
  
  if(getToString(actual) !== getToString(expected)) {
    return false
  } else if (actual === expected) {
    return true;
  } else if (isDate(actual) && isDate(expected)) {
    return assertEqualDatas(actual, expected)
  } else {
    return objEquiv(actual, expected);
  };
};

function objEquiv(act, exp) {
  let i, key, keysAct, keysExp;
  if (isNullOrUndefined(act) || isNullOrUndefined(exp)) return false;

  if (act.prototype !== exp.prototype) return false;

  if (isArguments(act)) {
    if (!isArguments(exp)) {
      return false;
    }
    act = Array.prototype.slice.call(act);
    exp = Array.prototype.slice.call(exp);
    return deepEqual(act, exp, opts);
  };
  if (isBuffer(act)) {
    if (!isBuffer(exp)) {
      return false;
    };
    if (act.length !== exp.length) return false;
    for (i = 0; i < act.length; i++) {
      if (act[i] !== exp[i]) return false;
    };
    return true;
  };
  try {
      keysAct = Reflect.ownKeys(act),
      keysExp = Reflect.ownKeys(exp);
  } catch (e) {
    return false;
  };
  if (keysAct.length != keysExp.length) return false;
  keysAct.sort();
  keysExp.sort();
  for (i = keysAct.length - 1; i >= 0; i--) {
    if (keysAct[i] != keysExp[i])
      return false;
  };
  for (i = keysAct.length - 1; i >= 0; i--) {
    key = keysAct[i];
    if (!deepEqual(act[key], exp[key])) return false;
  };
  return typeof act === typeof exp;
};

module.exports = deepEqual;