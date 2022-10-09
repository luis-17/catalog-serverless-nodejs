/* eslint-disable import/no-extraneous-dependencies */
const SecretsManager = require('aws-sdk/clients/secretsmanager');

const secretManager = new SecretsManager({});

module.exports = class {
  static async getSecretValue(secretId) {
    try {
      const result = await secretManager.getSecretValue({ SecretId: secretId }).promise();
      return result.SecretString;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
