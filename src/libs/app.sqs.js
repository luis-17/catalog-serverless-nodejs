/* eslint-disable import/no-extraneous-dependencies */
const SQS = require('aws-sdk/clients/sqs');

const sqs = new SQS({});

module.exports = class {
  /**
   * Enviar mensaje a la cola, si es exitoso devuelve el MessageId, sino devuelve null
   * @param {*} params parametros
   */
  static async sendMessage(params) {
    try {
      const data = await sqs.sendMessage(params).promise();
      return data.MessageId;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Función para enviar mensaje a la cola aws
   *
   * @param {Object} request request enviada a la cola
   * @param {*} messageAttributes atributo del mensaje
   * @param {*} queueUrl url de la cola
   */
  static async sendMessageQueue(request, messageAttributes, queueUrl) {
    const paramsSendMessaggeSTD = {
      DelaySeconds: 10,
      MessageAttributes: messageAttributes,
      MessageBody: JSON.stringify(request, null, 2),
      QueueUrl: queueUrl
    };
    /** Datos para la cola */
    console.log(paramsSendMessaggeSTD);
    // encolamos en la cola correspondiente
    const resultQueue = await this.sendMessage(paramsSendMessaggeSTD);
    return resultQueue;
  }
};
