const MsSqlDriver = require('./mssql-db-driver');

let credentials;

class MsSqlCloudDatabase {
  static getInstance() {
    if (!credentials) {
      console.log('process.env.MSSQL_CLOUD_CREDENTIALS::', process.env.MSSQL_CLOUD_CREDENTIALS);
      credentials = JSON.parse(JSON.parse(process.env.MSSQL_CLOUD_CREDENTIALS));
    }
    return new MsSqlDriver({
      server: credentials.server,
      database: credentials.database,
      user: credentials.user,
      password: credentials.password
    });
  }
}

module.exports = MsSqlCloudDatabase;
