const fakeServer = require('../');

const model = {
  port: '8081',
  debug: true,
  api: [
    {
      method: 'GET',
      // after : name of param shoulb be used in params_response object
      // lets check :user
      path: '/user/:user/id/:id',

      params_response: {
        id: [
          {
            value: 'testId1',
            status: '404',
            response: {
              testId: 'testId1',
            },
          },
          {
            value: 'testId2',
            response: {
              testId: 'testId2',
            },
          },
        ],
        // user
        // if user will contain /user/testUser/id/:id
        // we will get next response from user object
        user: {
          value: 'testUser',
          response: {
            user: 'testId',
          },
        },

        // if we have full uquals between params
        // we will get general response - response property from params_response object
        // in this case we heed
        // http://localhost:8081/user/testUser/id/testId
        response: {
          full_params_equal: {
            username: 'test user1',
            password: 'test password',
          },
        },
      },
      // this response will be used in other cases
      // as example http://localhost:8081/user/unknown/id/unknown
      response: {
        example: 'example GET',
      },
    },
  ],
};
const server = fakeServer(model);

setTimeout(() => {
  server.stop();
}, 2500);

callToServer();
async function callToServer() {
  const defaultGetData = await fetch('http://localhost:8081/user/unknown/id/unknown', { method: 'GET' }).then(res =>
    res.text(),
  );
  // {"example": "example GET"}
  console.log(defaultGetData);

  const fullPramsEqual = await fetch('http://localhost:8081/user/testUser/id/testId1', { method: 'GET' }).then(res =>
    res.text(),
  );
  // {"full_params_equal": {
  //   "username": "test user1",
  //   "password": "test password"
  // }}
  console.log(fullPramsEqual);

  const userEqualParamEqual = await fetch('http://localhost:8081/user/testUser/id/unknown', { method: 'GET' }).then(
    res => res.text(),
  );
  // {"user": "testId"}
  console.log(userEqualParamEqual);

  const idEqualParamEqual = await fetch('http://localhost:8081/user/unknown/id/testId2', { method: 'GET' }).then(res =>
    res.text(),
  );
  // {"testId": "testId"}
  console.log(idEqualParamEqual);
}
