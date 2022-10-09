const Validation = require('./validation');
const Service = require('./service');

module.exports = {

  async crearUsuario(payload) {
    console.log('----- crearUsuario -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.crearUsuario(payload);
    const result = await Service.crearUsuario(payload);
    return result;
  },

  async actualizarUsuario(payload) {
    console.log('----- actualizarUsuario -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.actualizarUsuario(payload);
    const result = await Service.actualizarUsuario(payload);
    return result;
  },

  async eliminarUsuario(payload) {
    console.log('----- eliminarUsuario -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.eliminarUsuario(payload);
    const result = await Service.eliminarUsuario(payload);
    return result;
  }
};
