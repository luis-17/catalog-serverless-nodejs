const Service = require('./service');

module.exports = {

  async authorizer(payload) {
    console.log('----- authorizer -----');
    console.log(`payload: ${JSON.stringify(payload)}`);
    const result = await Service.authorizer(payload);
    console.log(`----- result -----${result}`);
    return result;
  }

};
