/* eslint-disable no-param-reassign */
const DataAccess = require('./data-access');
const MapperSupport = require('./utils/mapper.support');
const ServiceSupport = require('./utils/service.support');
const ErrorConstant = require('./utils/error.constant');
const { ROLES } = require('./utils/domain.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {
  async consultarDetalleProducto(event) {
    console.log('service: consultarDetalleProducto');
    let errorMessage = null;
    try {
      const result = await DataAccess.getProductoDetalle(event);
      console.log(`identifier product selected: ${JSON.stringify(result)}`);
      if (event.session.rol === ROLES.ANONIMO) {
        await DataAccess.actualizarVistasProducto({ id: event.id }); // rastrear vistas
      }
      return MapperSupport.mapperDataResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:consultarDetalleProducto.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  },
  async crearProducto(event) {
    console.log('service: crearProducto');
    let errorMessage = null;
    try {
      const { sku, nombre, precio, marca } = event;

      const existSKU = await DataAccess.getSKUProductos({ sku });

      // validacion sku único
      if (existSKU.total > 0) {
        errorMessage = 'El SKU del producto ya existe';
        throw new CustomException(
          ErrorConstant.ERROR_FUNCIONAL.code,
          ErrorConstant.ERROR_FUNCIONAL.message,
          [errorMessage], {},
          ErrorConstant.ERROR_FUNCIONAL.httpCode
        );
      }
      const payloadRecord = {
        sku,
        nombre,
        precio,
        marca
      };
      const result = await DataAccess.registrarProducto(payloadRecord);
      console.log(`identifier product created: ${JSON.stringify(result)}`);

      return MapperSupport.mapperInsertResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:crearProducto.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  },
  async actualizarProducto(event) {
    console.log('service: actualizarProducto');
    let errorMessage = null;
    try {
      const { sku, nombre, precio, marca, id, session } = event;
      const payloadRecord = {
        sku,
        nombre,
        precio,
        marca,
        id
      };
      const result = await DataAccess.actualizarProducto(payloadRecord);
      console.log(`identifier product updated: ${JSON.stringify(result)}`);
      const correosAdmin = await DataAccess.getCorreosAdmin({ id: session.id });
      const arrCorreos = [];
      correosAdmin.forEach(element => {
        arrCorreos.push(element.email);
      });
      await ServiceSupport.enviarCorreoActualizacionProductos(arrCorreos, { nombre });
      return MapperSupport.mapperUpdateResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:actualizarProducto.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  },
  async eliminarProducto(event) {
    console.log('service: eliminarProducto');
    let errorMessage = null;
    try {
      const { id } = event;
      const payloadRecord = { id };
      const result = await DataAccess.eliminarProducto(payloadRecord);
      console.log(`identifier product deleted: ${JSON.stringify(result)}`);
      return MapperSupport.mapperDeleteResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:eliminarProducto.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  }
};
