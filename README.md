# TCAPI.JS
An API wrapper for topcord.xyz

[![npm](https://img.shields.io/npm/v/tcapi.js?style=for-the-badge)](https://npmjs.com/package/tcapi.js)

Usage

```js

const TCAPI = require('tcapi.js');
const tcapi = new TCAPI('tcapi-token', 'clientid', guildcount, shardcount-optional);

tcapi.on('success', () => {
  console.log('Your bots stats have been posted');
});

tcapi.on('error', (e) => {
  console.log(`Error: ${e}`);
});

```
