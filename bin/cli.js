#!/usr/bin/env node

const getConsoleUrl = require('../getConsoleUrl');

const credentials = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsSessionToken: process.env.AWS_SESSION_TOKEN,
};

getConsoleUrl(credentials)
  .then(url => console.log(url))
  .catch(err => console.error(`Error: ${err.message}`));
