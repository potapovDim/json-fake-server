const authorization = {
  "type": "headers", // headers, body, query
  "indicator": "token", // optional will be used
  "value": "test_token"
},

const one_req_res_model = {
  "method": "GET",
  "path": "/user/:user/id/:id",

  "authorization": true, // optional default value is falve

  "authorization": {
    "status": 404,
    "body": {"unauthorized": true}
  },

  "params_response": {
    "value": "testId",
    "id": {
      "response": {
        "testId": "testId"
      }
    },
    "user": {
      "value": "testUser",
      "response": {
        "testId": "testId"
      }
    },
    "response": {
      "full_params_equal": {
        "username": "test user1",
        "password": "test password"
      }
    }
  },
  "response": {
    "example": "example GET"
  }
}