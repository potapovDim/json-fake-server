const fs = require('fs')

// temporary solution
function get_JSON_model() {
  const JSON_model = require('../examples/test.example.json')
  return JSON_model
}

module.exports = {
  get_JSON_model
}