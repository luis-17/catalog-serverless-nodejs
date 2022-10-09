const Validation = require('./validation');
const Service = require('./service');

module.exports = {
  async consultarDetalleProducto(payload) {
    console.log('----- consultarDetalleProducto -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.consultarDetalleProducto(payload);
    const result = await Service.consultarDetalleProducto(payload);
    return result;
  },

  async crearProducto(payload) {
    console.log('----- crearProducto -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.crearProducto(payload);
    const result = await Service.crearProducto(payload);
    return result;
  },

  async actualizarProducto(payload) {
    console.log('----- actualizarProducto -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.actualizarProducto(payload);
    const result = await Service.actualizarProducto(payload);
    return result;
  },

  async eliminarProducto(payload) {
    console.log('----- eliminarProducto -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.eliminarProducto(payload);
    const result = await Service.eliminarProducto(payload);
    return result;
  }
};
