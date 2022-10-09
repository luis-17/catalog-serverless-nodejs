const jwt = require('jsonwebtoken');

const CommonUtils = require('./utils/common.utils');

module.exports = {
  async authorizer(event) {
    let SSOResponse = '';
    console.log('Service - authorizer');
    console.log(`event :${JSON.stringify(event)}`);
    try {
      const headerToken = CommonUtils.getHeaderToken(event);
      const secret = Buffer.from(process.env.JWT_SECRET, "base64");
      const decoded = jwt.verify(headerToken, secret);
      console.log('decoded token: ', decoded);
      if (decoded && decoded.id) {
        SSOResponse = CommonUtils.generatePolicy('user', 'Allow', '*');
      } else {
        SSOResponse = CommonUtils.generatePolicy('user', 'Deny', '*');
      }
    } catch (e) {
      console.log(`error general: ${JSON.stringify(e)}`);
      SSOResponse = CommonUtils.generatePolicy('user', 'Deny', '*');
    }
    return SSOResponse;
  }
};
