/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const AWSXRay = require('aws-xray-sdk');
const { Buffer } = require('buffer/');

let isKinesisEvent;

function validateKinesisEvent(event) {
  isKinesisEvent = false;
  if (event.Records && event.Records[0]) {
    const messageKinesis = event.Records[0];
    isKinesisEvent = (messageKinesis.eventSource === 'aws:kinesis');
  }
}

function decodeKinesisData(event) {
  console.log('function decode: ', event);
  console.log('function decode: ', event.data);
  return JSON.parse(Buffer.from(event.data, 'base64').toString('ascii'));
}

function getAction(dataKinesis) {
  let result;
  if (dataKinesis.metadata.operation === 'insert') {
    result = 'rysProcessorInsert';
  } else if (dataKinesis.metadata.operation === 'update') {
    result = 'rysProcessorUpdate';
  }
  return result;
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
      console.log('app.kinesis-event.middleware');

      validateKinesisEvent(event);

      if (isKinesisEvent) {
        console.log('KinesisEvent - Event');
        console.log(event);
        console.log('KinesisEvent - Records - Kinesis');
        console.log(event.Records[0].kinesis);
        console.log('KinesisEvent - Context');
        console.log(context);

        const dataKinesis = decodeKinesisData(event.Records[0].kinesis);
        const action = getAction(dataKinesis);

        handler.event = { action, origin: event.Records[0].eventSource, payload: dataKinesis };
        const { origin, payload } = handler.event;
        console.log('KinesisEvent - Origin');
        console.log(origin);
        console.log('KinesisEvent - Payload');
        console.log(payload);
        console.log('KinesisEvent - Action');
        console.log(action);

        _addXray();
      }
    },
    async after(handler) {
      if (isKinesisEvent) {
        const { action, payload } = handler.event;
        const functionToExecute = handler.response[action];
        const data = await functionToExecute(payload);
        handler.response = JSON.stringify({ payload: data });
        console.log('KinesisEvent - Success Response');
        console.log(handler.response);
      }
    },
    async onError(handler) {
      if (isKinesisEvent) {
        console.log('KinesisEvent - Error Response');
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
