/**
 * This little program prints out the url to the AWS console
 * generated from the local AWS credentials stored in environment variables:
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 * AWS_SESSION_TOKEN
 *
 * Steps:
 * 1. Create a JSON object
 *  session = JSON.stringify({
 *    sessionId: <access key>,
 *    sessionKey: <secret access key},
 *    sessionToken: <session token>
 *   })
 * 2. Send GET request to the following URL
 *    https://signin.aws.amazon.com/federation?Action=getSigninToken&Session=<session JSON object from the step above>
 * 3. Use the "SigninToken" value returned by the above url to generate the console login URL
 *    https://signin.aws.amazon.com/federation?Action=login&Destination=<https://console.aws.amazon.com/>&SigninToken=<SigninToken retrieved in step 2>
 */
const https = require('https');

const baseUrl = 'https://signin.aws.amazon.com/federation'

const getSigninToken = (credentials) => new Promise((resolve, reject) => {
    const session = JSON.stringify({
      sessionId: credentials.awsAccessKeyId,
      sessionKey: credentials.awsSecretAccessKey,
      sessionToken: credentials.awsSessionToken,
    });
    const conn = https.get(`${baseUrl}?Action=getSigninToken&Session=${encodeURIComponent(session)}`, (res) => {
    res.setEncoding('utf8');
    let response = '';
    res.on('data', (chunk) => {
      response = response + chunk;
    });
    res.on('end', () => {
      if (res.statusCode !== 200) {
        reject(new Error(`Invalid response from ${baseUrl}`))
      } else {
        resolve(JSON.parse(response).SigninToken);
      }
    });
  });
  conn.on('error', reject);
});

const getConsoleUrl = (credentials) => getSigninToken(credentials)
  .then(signinToken => {
    const destination = 'https://console.aws.amazon.com/';
    return `${baseUrl}?Action=login&Destination=${encodeURIComponent(destination)}&SigninToken=${encodeURIComponent(signinToken)}`;
  });

module.exports = getConsoleUrl;
