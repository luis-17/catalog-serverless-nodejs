/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const AWSXRay = require('aws-xray-sdk');
const moment = require('moment-timezone');

let isSqsEvent;

function validateSqsEvent(event) {
  isSqsEvent = false;
  console.log('event', event);
  if (event.Records && event.Records[0]) {
    console.log('event.Records', event.Records);
    const messageQueue = event.Records[0];
    messageQueue.bodyJson = JSON.parse(messageQueue.body);
    isSqsEvent = (messageQueue.eventSource === 'aws:sqs');
  }
}

function _addXray() {
  if (process.env.IS_OFFLINE) {
    AWSXRay.setContextMissingStrategy('LOG_ERROR');
  }
  // eslint-disable-next-line global-require
  AWSXRay.captureHTTPsGlobal(require('http'));
  // eslint-disable-next-line global-require
  AWSXRay.captureHTTPsGlobal(require('https'));
}

module.exports = () => {
  return {
    async before(handler) {
      const { event, context } = handler;

      validateSqsEvent(event);

      if (isSqsEvent) {
        console.log('SQSEvent - Event');
        console.log(event);
        console.log('SQSEvent - Context');
        console.log(context);

        handler.event = event.Records[0].bodyJson;
        const { origin, action, payload } = handler.event;
        console.log('SQSEvent - Origin');
        console.log(origin);
        console.log('SQSEvent - Action');
        console.log(action);
        console.log('SQSEvent - Payload');
        console.log(payload);

        _addXray();
      }
    },
    async after(handler) {
      if (isSqsEvent) {
        const { action, payload } = handler.event;
        const functionToExecute = handler.response[action];
        const data = await functionToExecute(payload);
        handler.response = JSON.stringify({ payload: data });
        console.log('SQSEvent - Success Response');
        console.log(handler.response);
      }
    },
    async onError(handler) {
      if (isSqsEvent) {
        console.log('SQSEvent - Error Response');
        console.log(handler.error);
        const error = {
          ...handler.error
        };
        delete error.name;
        error.httpStatus = 400;

        return Promise.reject(JSON.stringify({ error }));
      }
    }
  };
};
