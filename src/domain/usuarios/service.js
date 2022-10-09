const bcrypt = require('bcryptjs');

/* eslint-disable no-param-reassign */
const DataAccess = require('./data-access');
// const ServiceSupport = require('./utils/service.support');
const MapperSupport = require('./utils/mapper.support');
const ErrorConstant = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {

  async crearUsuario(event) {
    console.log('service: crearUsuario');
    let errorMessage = null;
    try {
      const {
        tipoUsuario, email, username, password
      } = event;

      const existUsername = await DataAccess.getUsernames({ username });

      // validacion username único
      if (existUsername.total > 0) {
        errorMessage = 'El usuario ya existe en base de datos';
        throw new CustomException(
          ErrorConstant.ERROR_FUNCIONAL.code,
          ErrorConstant.ERROR_FUNCIONAL.message,
          [errorMessage],
          ErrorConstant.ERROR_FUNCIONAL.httpCode
        );
      }
      const passwordHash = await bcrypt.hash(password, 8);
      const payloadRecord = {
        tipoUsuario,
        email,
        username,
        password: passwordHash
      };
      const result = await DataAccess.registrarUsuario(payloadRecord);
      console.log(`identifier usuario created: ${JSON.stringify(result)}`);

      return MapperSupport.mapperInsertResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:crearUsuario.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  },
  async actualizarUsuario(event) {
    console.log('service: actualizarUsuario');
    const errorMessage = null;
    try {
      const {
        tipoUsuario, email, username, password, id
      } = event;
      const passwordHash = await bcrypt.hash(password, 8);
      const payloadRecord = {
        tipoUsuario,
        email,
        username,
        password: passwordHash,
        id
      };
      const result = await DataAccess.actualizarUsuario(payloadRecord);
      console.log(`identifier usuario updated: ${JSON.stringify(result)}`);

      return MapperSupport.mapperUpdateResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:actualizarUsuario.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  },
  async eliminarUsuario(event) {
    console.log('service: eliminarUsuario');
    const errorMessage = null;
    try {
      const { id } = event;
      const payloadRecord = { id };
      const result = await DataAccess.eliminarUsuario(payloadRecord);
      console.log(`identifier usuario deleted: ${JSON.stringify(result)}`);
      return MapperSupport.mapperDeleteResponse(result);
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ErrorConstant.ERROR_FUNCIONAL.code,
        ErrorConstant.ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:eliminarUsuario.'],
        null,
        ErrorConstant.ERROR_FUNCIONAL.httpCode
      );
    }
  }
};
