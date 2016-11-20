"use strict";

const crypto = require("crypto");
const events = require("events");
const util = require("util");

/*
  * `config`: _Object_ Configuration.
    * `authority`: _String_ _(Default: random)_ Tart Ansible protocol authority
        name to use for this transport.
    * `randomBytes`: _Function_ Allow for replacement of `crypto.randomBytes` in
        case of need for deterministic testing.
    * `router`: _Function_ Tart-marshal router to register this transport's
        domain.
*/
const TartTransport = module.exports = function(config)
{
    const self = this;
    events.EventEmitter.call(self);

    config = config || {};

    self.randomBytes = config.randomBytes || crypto.randomBytes;

    self.authority = config.authority || self.randomBytes(42).toString("base64");
    self.capability = config.capability || self.randomBytes(42).toString("base64");
    self.address = `ansible://${self.authority}/#${self.capability}`;

    self._domain = config.router.domain(`ansible://${self.authority}/`);
    self._domain.bindLocal(self.address, message =>
        {
            if (message.deltas)
            {
                self.emit("deltas", message.sender, message.deltas);
            }
            else if (message.digest)
            {
                self.emit("digest", message.sender, message.digest);
            }
        }
    );
};

util.inherits(TartTransport, events.EventEmitter);

/*
  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer sending the message.
  * `deltasToSend`: _Any_ Deltas to send
*/
TartTransport.prototype.deltas = function(remotePeer, localPeer, deltasToSend)
{
    const self = this;
    self.send(remotePeer,
        {
            deltas: deltasToSend,
            sender:
            {
                id: localPeer.id,
                transport:
                {
                    ansible: self.address
                }
            }
        }
    );
};

/*
  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer sending the message.
  * `digestToSend`: _Any_ Digest to send
*/
TartTransport.prototype.digest = function(remotePeer, localPeer, digestToSend)
{
    const self = this;
    self.send(remotePeer,
        {
            digest: digestToSend,
            sender:
            {
                id: localPeer.id,
                transport:
                {
                    ansible: self.address
                }
            }
        }
    );
};

/*
  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `payload`: _String_ or _Object_ Payload to send to peer.
*/
TartTransport.prototype.send = function(remotePeer, payload)
{
    const self = this;
    if (!remotePeer || !remotePeer.transport || !remotePeer.transport.ansible)
    {
        return self.emit("error", new Error(`Malformed remotePeer: ${util.inspect(remotePeer, {depth: null})}`));
    }

    self._domain.remoteToLocal(remotePeer.transport.ansible)(payload);
}
