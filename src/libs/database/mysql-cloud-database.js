const MySqlDriver = require('./mysql-db-driver');

// let credentials;

class MySqlCloudDatabase {
  static getInstance() {
    // if (!credentials) {
    //   console.log('process.env.MYSQL_CLOUD_CREDENTIALS::', process.env.MYSQL_CLOUD_CREDENTIALS);
    //   credentials = JSON.parse(JSON.parse(process.env.MYSQL_CLOUD_CREDENTIALS));
    // }
    return new MySqlDriver({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    });
  }
}

module.exports = MySqlCloudDatabase;
