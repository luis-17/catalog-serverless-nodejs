/* eslint-disable import/no-extraneous-dependencies */
const CloudFront = require('aws-sdk/clients/cloudfront');

module.exports = class {
  static async signedUrl(params) {
    try {
      // const cfPrivateKey = fs.readFileSync(path.join(__dirname, 'keycf/private_key.pem'));
      // console.
      const cfPrivateKey = process.env.PRIVATEKEY_CF.replace(/\\n/g, '\n'); // Buffer.from(process.env.PRIVATEKEY_CF.trim());
      const signer = new CloudFront.Signer(process.env.ACCESSKEYID_CF, cfPrivateKey);
      const signedUrl = signer.getSignedUrl({
        url: params.url,
        expires: params.timeExpiration
      });
      console.log('signedUrl::', signedUrl);
      return signedUrl;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
