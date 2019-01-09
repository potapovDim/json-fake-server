const random_number = () => {
  return Math.floor(Math.floor(9) * Math.random()).toString()
}

const fake_data_responses = {
  array: {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
  },
  object: {
    '0': {},
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    '7': {},
    '8': {},
    '9': {},
  },
  string: {
    '0': {},
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
    '6': {},
    '7': {},
    '8': {},
    '9': {},
  }
}

/**
 * @param {string} data_type one of data type array,object,string
 * @returns {object|array|string} returns one of fake data by type
*/
function get_random_response_data(data_type) {
  return random_number[data_type][random_number()]
}

module.exports = {
  get_random_response_data
}
