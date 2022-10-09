/* eslint-disable no-param-reassign */
const MySQLCloudDatabase = require('../../libs/database/mysql-cloud-database');
const DatabaseConstant = require('./utils/database.constant');

module.exports = {
  async getSKUProductos(params) {
    console.log('INI getSKUProductos----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeQuery({
      values: params,
      statement: DatabaseConstant.GET_SKU_PRODUCTOS
    });
    console.log(`getSKUProductos result: ${JSON.stringify(result)}`);
    return result.data[0];
  },
  async getProductoDetalle(params) {
    console.log('INI getProductoDetalle----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeQuery({
      values: params,
      statement: DatabaseConstant.GET_PRODUCTO_DETALLE
    });
    console.log(`getProductoDetalle result: ${JSON.stringify(result)}`);
    return result.data[0];
  },
  async getCorreosAdmin(params) {
    console.log('INI getCorreosAdmin----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeQuery({
      values: params,
      statement: DatabaseConstant.GET_CORREOS_ADMIN
    });
    console.log(`getCorreosAdmin result: ${JSON.stringify(result)}`);
    return result.data;
  },
  async registrarProducto(params) {
    console.log('INI registrarProducto----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeInsert({
      values: params,
      statement: DatabaseConstant.REGISTRAR_PRODUCTO
    });
    console.log(`registrarProducto result: ${JSON.stringify(result)}`);
    return result;
  },
  async actualizarProducto(params) {
    console.log('INI actualizarProducto----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeUpdate({
      values: params,
      statement: DatabaseConstant.ACTUALIZAR_PRODUCTO
    });
    console.log(`actualizarProducto result: ${JSON.stringify(result)}`);
    return result;
  },
  async actualizarVistasProducto(params) {
    console.log('INI actualizarVistasProducto----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeUpdate({
      values: params,
      statement: DatabaseConstant.ACTUALIZAR_VISTAS_PRODUCTO
    });
    console.log(`actualizarVistasProducto result: ${JSON.stringify(result)}`);
    return result;
  },
  async eliminarProducto(params) {
    console.log('INI eliminarProducto----- ');
    const db = await MySQLCloudDatabase.getInstance();
    const result = await db.executeUpdate({
      values: params,
      statement: DatabaseConstant.ANULAR_PRODUCTO
    });
    console.log(`eliminarProducto result: ${JSON.stringify(result)}`);
    return result;
  }
};
