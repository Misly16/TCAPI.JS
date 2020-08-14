/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const EventEmitter = require('events');
const fetch = require('node-fetch');

class TCAPI extends EventEmitter {
/**
 *
 * @param {string} token The token for the client to be able to post to the API
 * @param {string} clientid The clients id
 * @param {number} guildcount The amount of guilds the client is in
 * @param {number} shards The amount of shards the client has
 */
  constructor(token, clientid, guildcount, shards) {
    super();

    this.token = token;
    this.clientid = clientid;
    this.guildcount = guildcount;
    this.shards = shards;

    if (!token) throw new Error('[TCAPI] You have not provided an API key.');
    if (!clientid) throw new Error('[TCAPI] You need to provide a client ID.');
    if (!guildcount) throw new Error('[TCAPI] You need to provide the guild count.');
    /**
   * This is emited if the post was successful
 * @event success
 */

    /**
 * This is emited if the post had an error
 * @event error
 * @param {error} error the actual error i guess
 */
    setInterval(() => {
      this.post()
          .then(() => this.emit('success'))
          .catch((e) => this.emit('error', e));
      // Posts every 30 minutes
    }, 1800000);
  }

  /**
 * @param {any} body the body to send to the api
 * @returns body
 */


  async post() {
    if (this.shards) {
      const body = {'guilds': this.guildcount, 'shards': this.shards};
      fetch(`https://topcord.xyz/api/bot/stats/${this.clientid}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token,
        },
      }).then((body) => console.log(body));
    } else {
      const body = {'guilds': this.guildcount, 'shards': 0};
      fetch(`https://topcord.xyz/api/bot/stats/${this.clientid}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token,
        },
      }).then((body) => console.log(body));
    }
  }
}


module.exports = TCAPI;
