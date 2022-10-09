/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const DataAccess = require('./data-access');
// const ServiceSupport = require('./utils/service.support');
const MapperSupport = require('./utils/mapper.support');
const { ERROR_FUNCIONAL } = require('./utils/error.constant');
const CustomException = require('./utils/custom.exception');

module.exports = {
  async loginUsuario(event) {
    console.log('service: loginUsuario');
    let errorMessage = null;
    try {
      const result = await DataAccess.getUsuarioPorUsername({ username: event.username });
      if (!result) {
        errorMessage = 'Usuario no existe en base de datos.';
        throw new CustomException(
          ERROR_FUNCIONAL.code, ERROR_FUNCIONAL.message, [errorMessage], {}, ERROR_FUNCIONAL.httpCode
        );
      }
      const isValidPassword = await bcrypt.compare(event.password, result.password);
      console.log('event.password: ', event.password);
      console.log('result.password: ', result.password);
      console.log('isValidPassword: ', isValidPassword);
      if (!isValidPassword) {
        errorMessage = 'La contraseña del usuario es incorrecta. Intente nuevamente.';
        throw new CustomException(
          ERROR_FUNCIONAL.code, ERROR_FUNCIONAL.message, [errorMessage], {}, ERROR_FUNCIONAL.httpCode
        );
      }
      const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
      const tokenJWT = await jwt.sign({ email: result.email, id: result.id, rol: result.tipoUsuario }, secret, {
        expiresIn: 86400 // expira en 24 horas
      });
      // const token = await signToken(user);
      console.log(`token generated: ${JSON.stringify(tokenJWT)}`);
      return MapperSupport.mapperDataResponse({ token: tokenJWT, auth: true });
    } catch (err) {
      console.error(err);
      throw new CustomException(
        ERROR_FUNCIONAL.code,
        ERROR_FUNCIONAL.message,
        [errorMessage != null ? errorMessage : 'Error en service:crearProducto.'],
        null,
        ERROR_FUNCIONAL.httpCode
      );
    }
  }
};
