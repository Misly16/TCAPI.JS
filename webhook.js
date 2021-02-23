/* eslint-disable require-jsdoc */
const EventEmitter = require('events');
const express = require('express');
const app = express();

class TCAPIWebhook extends EventEmitter {
  /**
 *
 * @param {number} port The port the server should work on
 * @param {string} path the path the server will be listening on
 */
  constructor(port, path) {
    super();
    this.port = port;
    this.path = path;
    this.listening();
  }

  listening() {
    app.use(express.json());
    app.post(this.path || '/tcapijs', (req, res) => {
      this.emit('vote', {userID: req.body.User.ClientID, date: req.body.User.Date});
    });
    app.listen(this.port, () => {
      this.emit('listening', {port: this.port, path: this.path || '/tcapijs'});
    });
  }
}


module.exports = TCAPIWebhook;
