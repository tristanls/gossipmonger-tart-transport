"use strict";

const events = require("events");
const marshal = require("tart-marshal");
const util = require("util");

const TartTransport = module.exports = function(config)
{
    const self = this;
    events.EventEmitter.call(self);

    config = config || {};

    self.domain = marshal.domain();
};

util.inherits(TartTransport, events.EventEmitter);

TartTransport.prototype.deltas = function(remotePeer, localPeer, deltasToSend)
{
    const self = this;
};

TartTransport.prototype.digest = function(remotePeer, localPeer, digestToSend)
{
    const self = this;
};

TartTransport.prototype.rpc = function(remotePeer, payload)
{
    const self = this;
    if (!remotePeer || !remotePeer.transport || !remotePeer.transport.send
        || typof !remotePeer.transport.send != "function")
    {
        return self.emit("error", new Error(`malformed remotePeer: ${util.inspect(remotePeer, {depth: null})}`));
    }

    if (typeof payload != "string")
    {
        payload = JSON.stringify(payload);
    }
}
