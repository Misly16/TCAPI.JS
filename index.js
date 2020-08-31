/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const EventEmitter = require('events');
const fetch = require('node-fetch');


const isalibrary = (library, client) => {
  try {
    const alib = require.cache[require.resolve(library)];
    return alib && client instanceof alib.exports.Client;
  } catch (e) {
    return false;
  }
};

const isCompatible = (client) => isalibrary('discord.js', client) || isalibrary('eris', client);
class TCAPI extends EventEmitter {
/**
 *
 * @param {string} token The token for the client to be able to post to the API
 * @param {any} client the bots client
 */
  constructor(token, client) {
    super();

    this.token = token;
    this.client = client;
    if (!token) throw new Error('[TCAPI] You have not provided an API key.');
    if (client && isCompatible(client)) {
    /**
   * This is emited if the post was successful
 * @event success
 */

      /**
 * This is emited if the post had an error
 * @event error
 * @param {error} error the actual error i guess
 */
      client.on('ready', () =>{
        this.post()
            .then(() => this.emit('success'))
            .catch((e) => this.emit('error', e));
      });
      setInterval(() => {
        this.post()
            .then(() => this.emit('success'))
            .catch((e) => this.emit('error', e));
      // Posts every 30 minutes
      }, 1800000);
    } else {
      throw new Error('[TCAPI] Your client is not compatible, to post your stats please read https://docs.topcord.xyz/#/API');
    }
  }

  /**
 * @param {any} body the body to send to the api
 * @returns body
 */


  post() {
    const body = {'guilds': this.client.guilds.size || this.client.guilds.cache.size, 'shards': this.client.ws.shards.size ? this.client.shard.count : 0};
    return fetch(`https://topcord.xyz/api/bot/stats/${this.client.user.id}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token,
      },
    }).then((body) => {
      console.log(`[TCAPI.JS API RESPONSE] ${body.statusText}`); return body;
    });
  }
}


module.exports = TCAPI;
