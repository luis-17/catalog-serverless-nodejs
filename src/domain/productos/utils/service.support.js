/* eslint-disable no-param-reassign */
const aws = require('aws-sdk');

const ses = new aws.SES({ region: process.env.REGION });

module.exports = {

  enviarCorreoActualizacionProductos(correos, producto) {
    const params = {
      Destination: {
        ToAddresses: correos
      },
      Message: {
        Body: {
          Text: { Data: `Se ha actualizado la información del producto: ${producto.nombre}` }
        },
        Subject: { Data: 'Notificación de actualización de producto.' }
      },
      Source: 'luisls1717@gmail.com'
    };

    return ses.sendEmail(params).promise();
  }
};
