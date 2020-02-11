# aws-url

`aws-url` is a tool that generates AWS console url from the temporary credentials stored in environment variables.

## Installation

```sh
npm install -g aws-url
```

## Usage

```sh
# Set credentials in env variables
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=...

# Execute the command
aws-url

# Output:
# https://signin.aws.amazon.com/federation?Action=login&Destination=https%3A%2F%2Fconsole.aws.amazon.com%2F&SigninToken=...
```

## Usage from node.js

```sh
# In your project dir
npm install --save aws-url
```

```javascript
const getConsoleUrl = require('aws-url');

const credentials = {
  awsAccessKeyId: 'access key id',
  awsSecretAccessKey: 'secret access key,
  awsSessionToken: 'session token',
};

getConsoleUrl(credentials)
  .then(url => console.log(`The console url is ${url}`))
  .catch(err => console.error(`Error: ${err.message}`)
);
```
