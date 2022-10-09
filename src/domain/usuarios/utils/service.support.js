/* eslint-disable no-param-reassign */
// const moment = require('moment');
const xlsx = require('xlsx');
const sqsQueue = require('../../../libs/app.sqs');

module.exports = {

  createXlsFromJson({
    jsonArray, sheetName = 'undefined', type = 'buffer', bookType = 'xlsx'
  }) {
    const workbook = xlsx.utils.book_new();
    workbook.SheetNames.push(sheetName);
    const worksheet = xlsx.utils.json_to_sheet(jsonArray);
    workbook.Sheets[sheetName] = worksheet;
    return {
      workbook,
      worksheet,
      data: xlsx.write(workbook, { bookType, type, bookSST: false })
    };
  },

  async sendMessageQueue(payload) {
    const {
      ruc, reportType, documentType, reportId, commerceCode, startDate, endDate, operationType, operationId
    } = payload;
    const request = {
      origin: 'reporteScheduleProcesar',
      action: 'reporteScheduleProcesar',
      trace: 'channel-cnel-reports',
      payload: {
        reportId,
        ruc,
        commerceCode,
        startDate,
        endDate,
        reportType,
        documentType,
        operationType,
        operationId
      }
    };
    const messageAttributes = {
      ruc: {
        DataType: 'String',
        StringValue: ruc
      }
    };
    const queueUrl = process.env.SQS_AGENDAMIENTO_REPORTE;

    const resultQueue = await sqsQueue.sendMessageQueue(request, messageAttributes, queueUrl);
    return resultQueue;
  },

  getMessageBodyQueue(event) {
    let body;
    event.Records.forEach((item) => {
      ({ body } = item);
    });
    console.log('getMessageBody', body);
    return JSON.parse(body);
  }

};
