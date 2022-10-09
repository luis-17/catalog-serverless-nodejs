/* eslint-disable no-param-reassign */
const MySQLCloudDatabase = require('../../libs/database/mysql-cloud-database');
const DatabaseConstant = require('./utils/database.constant');

module.exports = {
  async getUsuarioPorUsername(params) {
    console.log('INI getUsuarioPorUsername----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeQuery({
      values: params,
      statement: DatabaseConstant.GET_USUARIO_POR_USERNAME
    });
    console.log(`getUsuarioPorUsername result: ${JSON.stringify(result)}`);
    return result.data[0];
  },
};
