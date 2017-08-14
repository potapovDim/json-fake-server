export const fakePost = (response, condition, responseError) => {
  if(!response || !condition || !responseError) {
    throw Error("All requested arguments should be present");
  };
  return  async (ctx) => {
    const {body} = ctx.request;
    if(typeof condition == 'function') {
      const result = condition(body);
      if(result) {
        ctx.status = response.status;
        ctx.body = response.body;
      } else {
        ctx.status = responseError.status;
        ctx.body = responseError.body;
      };
    };
    return ctx;
  };
};

export const fakeGet = (response, condition, responseError) => {
  if(!response || !condition || !responseError) {
    throw Error("All requested arguments should be present");
  };
  return  async (ctx) => {
    const {headers} = ctx.request;
    if(typeof condition == 'function') {
      const result = condition(headers);
      if(result) {
        ctx.status = response.status;
        ctx.body = response.body;
      } else {
        ctx.status = responseError.status;
        ctx.body = responseError.body;
      };
    };
    return ctx;
  };
};