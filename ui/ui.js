function validateJson(jsom_model) {
  jsom_model
}

const worker = (function() {
  let currentJsonModel = null



  return {
    getJsonModel: function() {
      return currentJsonModel
    },
    createNewServer: function() {

    },
    setJsonModel: function(model) {
      currentJsonModel = model
    }
  }
}())

