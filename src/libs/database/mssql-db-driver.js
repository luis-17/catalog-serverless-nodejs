/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

const sql = require('mssql');
const DataRepositoryException = require('./exceptions/data-repository.exception');
const ExceptionConstant = require('./exceptions/exception.constant');

let pool = null;

class MySqlDriver {
  constructor({
    server, database, user, password
  }) {
    this._server = server;
    this._database = database;
    this._user = user;
    this._password = password;
    console.log(`Server: ${this._server}`);
    console.log(`Database: ${this._database}`);
    console.log(`User: ${this._user}`);
  }

  async closePool() {
    // const closePool = async () => {
    try {
      // try to close the connection pool
      await pool.close();

      // set the pool to null to ensure
      // a new one will be created by getConnection()
      pool = null;
    } catch (err) {
      // error closing the connection (could already be closed)
      // set the pool to null to ensure
      // a new one will be created by getConnection()
      pool = null;
      console.log(['error', 'data'], 'closePool error');
      console.log(['error', 'data'], err);
      new DataRepositoryException(
        ExceptionConstant.DATABASE_EXCEPTION.code,
        ExceptionConstant.DATABASE_EXCEPTION.message
      ).throw();
    }
  }

  async getConnection() {
    // const getConnection = async () => {
    try {
      if (pool) {
        // has the connection pool already been created?
        // if so, return the existing pool
        return pool;
      }

      const config = {
        user: this._user,
        password: this._password,
        server: this._server,
        database: this._database,
        requestTimeout: 2000,
        options: {
          encrypt: true,
          enableArithAbort: true
        },
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 2000
        }
      };
      // create a new connection pool
      pool = await sql.connect(config);

      // catch any connection errors and close the pool
      pool.on('error', async (err) => {
        console.log(['error', 'data'], 'connection pool error');
        console.log(['error', 'data'], err);
        await this.closePool();
      });
      return pool;
    } catch (err) {
      // error connecting to SQL Server
      console.log(['error', 'data'], 'error connecting to sql server');
      console.log(['error', 'data'], err);
      pool = null;
      new DataRepositoryException(
        ExceptionConstant.DATABASE_EXCEPTION.code,
        ExceptionConstant.DATABASE_EXCEPTION.message
      ).throw();
    }
  }

  async getEntityId({ values, statement }) {
    // get a connection to SQL Server
    const cnx = await this.getConnection();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('SE_CONCILIA', sql.Int, values.conciliaSE);
    request.input('TEL_REFERENCE_ID', sql.VarChar(50), values.telReferenceId);

    // return the executed query
    return request.query(statement);
  }

  async getHistoricalData({ values, statement }) {
    // get a connection to SQL Server
    const cnx = await this.getConnection();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('RETRIEVALREFNO', sql.VarChar(50), values.retrievalRefNo);

    // return the executed query
    return request.query(statement);
  }

  async getDescServiceByCustomerServiceId({ values, statement }) {
    // get a connection to SQL Server
    const cnx = await this.getConnection();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('CUSTOMER_SERVICE_ID', sql.VarChar(50), values.customerServiceId);

    // return the executed query
    return request.query(statement);
  }

  async getCustomIdByCardAcceptOrId({ values, statement }) {
    // get a connection to SQL Server
    const cnx = await this.getConnection();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('CARD_ACCEPT_OR_ID', sql.VarChar(50), values.cardAcceptOrId);

    // return the executed query
    return request.query(statement);
  }

  async getComplementaryCode({ values, statement }) {
    // get a connection to SQL Server
    const cnx = await this.getConnection();

    // create a new request
    const request = await cnx.request();

    // configure sql query parameters
    request.input('CORE_ACCOUNT_NUMBER', sql.VarChar(50), values.coreAccountNumber);
    request.input('OWNER_ID', sql.VarChar(50), values.ownerId);

    // return the executed query
    return request.query(statement);
  }
}

module.exports = MySqlDriver;
