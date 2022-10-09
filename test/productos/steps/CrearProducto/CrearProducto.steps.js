const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const { handler } = require('../../../../src/domain/productos/app');
const CrearProductoInput = require('../../input/CrearProductoInput');
const CrearProductoOutput = require('../../output/CrearProductoOutput');
const EventDefault = require('../../util/EventDefault');
const { ACTIONS } = require('../../util/Constants');
const { DATA_SKU_TOTAL, DATA_REGISTRO } = require('./mocks/DataMock');

const DataAccess = require('../../../../src/domain/productos/data-access');

describe('API DE PRODUCTOS', () => {
  test('Creación de producto', async () => {
    const payloadInput = CrearProductoInput.SUCCESS;
    let response;
    const requestEvent = EventDefault.getEventDefault(ACTIONS.CREAR_PRODUCTO);
    requestEvent.body = payloadInput;
    jest.spyOn(DataAccess, 'getSKUProductos').mockImplementation(() => DATA_SKU_TOTAL);
    jest.spyOn(DataAccess, 'registrarProducto').mockImplementation(() => DATA_REGISTRO);
    try {
      response = await handler(requestEvent);
      response = JSON.parse(response);
    } catch (error) {
      response = JSON.parse(error.toString());
    }
    console.log('response jest -> ', JSON.stringify(response));
    expect(response.data).toBeDefined();
    expect(response.indValidacion).toBe(CrearProductoOutput.SUCCESS.indValidacion);
    expect(response.msj).toBe(CrearProductoOutput.SUCCESS.msj);
  });
});
