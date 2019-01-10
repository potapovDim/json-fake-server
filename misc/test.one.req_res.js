const authorization = {
  "type": "headers", // headers, body, query
  "indicator": "token", // optional will be used

}

const one_req_res_model = {
  "method": "GET",
  "path": "/user/:user/id/:id",

  "authorization": {
    "token": "test_token",
    "status": 404,
    "unauthorized": {"unauthorized": true}
  },

  "response_from_url": {
    "req_body": {},
    "req_headers": {},
    "status": 201,
    "method": "GET",
    "url": "http://localhost:8888/user/:user", // example
    "merge_with": {
      "test_merge": "test"
    }
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