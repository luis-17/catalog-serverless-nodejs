// eslint-disable-next-line import/no-extraneous-dependencies
const { performance } = require('perf_hooks');
const SecretManager = require('../../libs/app.secret-manager');

const isLoaded = false;

module.exports = () => {
  return {
    async before() {
      console.log('Getting parameters');
      console.log(`isLoaded: ${isLoaded}`);
      const t0 = performance.now();

      try {
        const result = await SecretManager.getSecretValue(process.env.MYSQL_SECRET_MANAGER_ID);
        console.log('result Secretmanager:: ', result);
        process.env.MYSQL_CLOUD_CREDENTIALS = JSON.stringify(result);
      } catch (e) {
        console.error('ERROR Getting SecretManagers parameters');
        console.error(e);
      }
      const t1 = performance.now();

      console.log(`Call to get parameters took ${t1 - t0} milliseconds.`);
    }
  };
};
