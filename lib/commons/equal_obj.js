const is_arguments = function(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]'
}

const is_null_or_undefined = (value) => {
  return value == null || value == undefined
}

const is_buffer = (value) => {
  return value instanceof Buffer
}

const is_date = (value) => {
  return value instanceof Date
}

const assert_equal_dates = (dataA, dataB) => {
  return dataA.getTime() === dataB.getTime()
}

const get_to_string = (arg) => {
  return Object.prototype.toString.call(arg)
}

function deep_equal(actual, expected) {
  if(get_to_string(actual) !== get_to_string(expected)) {
    return false
  } else if(actual === expected) {
    return true
  } else if(is_date(actual) && is_date(expected)) {
    return assert_equal_dates(actual, expected)
  } else {
    return obj_equiv(actual, expected)
  }
}

function obj_equiv(act, exp) {
  let i, key, keysAct, keysExp
  if(is_null_or_undefined(act) || is_null_or_undefined(exp)) return false

  if(act.prototype !== exp.prototype) return false

  if(is_arguments(act)) {
    if(!is_arguments(exp)) {return false}
    act = Array.prototype.slice.call(act)
    exp = Array.prototype.slice.call(exp)
    return deep_equal(act, exp, opts)
  }
  if(is_buffer(act)) {
    if(!is_buffer(exp)) {return false}
    if(act.length !== exp.length) return false
    for(i = 0; i < act.length; i++) {
      if(act[i] !== exp[i]) return false
    }
    return true
  }
  try {
    keysAct = Reflect.ownKeys(act), keysExp = Reflect.ownKeys(exp)
  } catch(e) {
    return false
  }
  if(keysAct.length != keysExp.length) {return false}
  keysAct.sort()
  keysExp.sort()
  for(i = keysAct.length - 1; i >= 0; i--) {
    if(keysAct[i] != keysExp[i]) {return false}
  }
  for(i = keysAct.length - 1; i >= 0; i--) {
    key = keysAct[i];
    if(!deep_equal(act[key], exp[key])) {return false}
  }
  return typeof act === typeof exp
}

module.exports = {deep_equal}
