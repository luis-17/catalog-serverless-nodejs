const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const { handler } = require('../../../../src/domain/productos/app');
const ConsultarDetalleProductoInput = require('../../input/ConsultarDetalleProductoInput');
const ConsultarDetalleProductoOutput = require('../../output/ConsultarDetalleProductoOutput');
const EventDefault = require('../../util/EventDefault');
const { ACTIONS } = require('../../util/Constants');
const { DATA_PRODUCTO_DETALLE } = require('./mocks/DataMock');

const DataAccess = require('../../../../src/domain/productos/data-access');

describe('API DE PRODUCTOS', () => {
  test('Consulta de detalle de producto', async () => {
    const payloadInput = ConsultarDetalleProductoInput.SUCCESS;
    let response;
    const requestEvent = EventDefault.getEventDefault(ACTIONS.CONSULTAR_DETALLE_PRODUCTO);
    requestEvent.body = payloadInput;
    jest.spyOn(DataAccess, 'getProductoDetalle').mockImplementation(() => DATA_PRODUCTO_DETALLE);
    jest.spyOn(DataAccess, 'actualizarVistasProducto').mockImplementation(() => {});
    try {
      response = await handler(requestEvent);
      response = JSON.parse(response);
    } catch (error) {
      response = JSON.parse(error.toString());
    }
    console.log('response jest -> ', JSON.stringify(response));
    expect(response.data).toBeDefined();
    expect(response.indValidacion).toBe(ConsultarDetalleProductoOutput.SUCCESS.indValidacion);
    expect(response.msj).toBe(ConsultarDetalleProductoOutput.SUCCESS.msj);
  });
});
