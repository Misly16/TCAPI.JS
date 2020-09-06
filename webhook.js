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
      const userid = req.body.id;
      const date = req.body.date;
      this.emit('vote', {userID: userid, date: date});
    });
    app.listen(this.port, () => {
      this.emit('listening', {port: this.port, path: this.path || '/tcapijs'});
    });
  }
}


module.exports = TCAPIWebhook;
