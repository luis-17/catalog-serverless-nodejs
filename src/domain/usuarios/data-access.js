/* eslint-disable no-param-reassign */
const MySQLCloudDatabase = require('../../libs/database/mysql-cloud-database');
const DatabaseConstant = require('./utils/database.constant');

module.exports = {
  async getUsernames(params) {
    console.log('INI getUsernames----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeQuery({
      values: params,
      statement: DatabaseConstant.GET_USERNAME_USER
    });
    console.log(`getUsernames result: ${JSON.stringify(result)}`);
    return result.data[0];
  },
  async registrarUsuario(params) {
    console.log('INI registrarUsuario----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeInsert({
      values: params,
      statement: DatabaseConstant.REGISTRAR_USUARIO
    });
    console.log(`registrarUsuario result: ${JSON.stringify(result)}`);
    return result;
  },
  async actualizarUsuario(params) {
    console.log('INI actualizarUsuario----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeUpdate({
      values: params,
      statement: DatabaseConstant.ACTUALIZAR_USUARIO
    });
    console.log(`actualizarUsuario result: ${JSON.stringify(result)}`);
    return result;
  },
  async eliminarUsuario(params) {
    console.log('INI eliminarUsuario----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeUpdate({
      values: params,
      statement: DatabaseConstant.ANULAR_USUARIO
    });
    console.log(`eliminarUsuario result: ${JSON.stringify(result)}`);
    return result;
  }
};
