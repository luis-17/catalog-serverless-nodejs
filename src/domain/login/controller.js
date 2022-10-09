const Validation = require('./validation');
const Service = require('./service');

module.exports = {
  async login(payload) {
    console.log('----- login -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    await Validation.loginUsuario(payload);
    const result = await Service.loginUsuario(payload);
    return result;
  }
};
