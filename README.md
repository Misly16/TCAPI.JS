# TCAPI.JS
An API wrapper for topcord.xyz

[![npm](https://img.shields.io/npm/v/tcapi.js?style=for-the-badge)](https://npmjs.com/package/tcapi.js)

Usage

Sending Stats
```js

const TCAPI = require('tcapi.js');
const tcapi = new TCAPI('tcapi_token', client);

tcapi.on('success', () => {
  console.log('Your bots stats have been posted');
});

tcapi.on('error', (e) => {
  console.log(`Error: ${e}`);
});

```

Receiving Votes
```js
const TCAPI = require('tcapi.js');
const tcapi = new TCAPI('tcapi_token', {port: 5000});

tcapi.webhook.on('listening', (info) => {
  console.log(`Listening on port: ${info.port} and on path: ${info.path}`);
});

tcapi.webhook.on('vote', (info) => {
  console.log(`${info.userID} voted at ${info.date}`);
});

```

