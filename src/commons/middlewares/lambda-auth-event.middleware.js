/* eslint-disable no-param-reassign */
function isOffline(event) {
  return event.isOffline;
}

module.exports = () => {
  return {
    async before(handler) {
      console.log(`handler: ${handler}`);
      const { origin } = handler.event;
      console.log(`handler event: ${JSON.stringify(handler.event)}`);
      console.log(`handler context: ${JSON.stringify(handler.context)}`);
      console.log('app.lambda-event.middleware');
      console.log(`Origin: ${origin}`);

      console.log('LambdaEvent - Request');
      console.log(handler.event);
      console.log(handler.context);

      const { event } = handler;
      process.env.IS_OFFLINE = isOffline(event);
      // const action = getAction(event);
      const action = handler.context.functionName;
      const payload = handler.event;
      handler.event = { action, payload };
      console.log(handler.event);
      // _addXray();
    },
    async after(handler) {
      console.log(`handler ee: ${handler}`);
      const { action, payload } = handler.event;
      const functionToExecute = handler.response[action];
      console.log(`functionToExecute : ${functionToExecute}`);
      const data = await functionToExecute(payload);
      console.log(`LambdaEvent - data${data}`);
      handler.response = data;
      console.log('LambdaEvent - Success Response');
      console.log(handler.response);
    },
    async onError(handler) {
      console.error('LambdaEvent - Error Response');
      console.error(handler.error);
      const error = {
        ...handler.error
      };
      delete error.name;
      error.httpStatus = 400;
      return Promise.reject(JSON.stringify({ error }));
    }
  };
};
