class CommonUtils {
  static getHeaderToken(event) {
    let headerToken = '';
    if (event && event.headers && event.headers.Authorization) {
      headerToken = event.headers.Authorization; // flow of api gateway
    } else {
      headerToken = event.authorizationToken; // without api gateway
    }
    return headerToken.replace('Bearer ', '');
  }

  static generatePolicy(principalId, effect, resource) {
    const authResponse = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
    }

    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
      stringKey: 'stringval',
      numberKey: 123,
      booleanKey: true
    };
    return authResponse;
  }
}

module.exports = CommonUtils;
