# gossipmonger-tart-transport

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/gossipmonger-tart-transport.png)](http://npmjs.org/package/gossipmonger-tart-transport)

Tart transport for [Gossipmonger](https://github.com/tristanls/gossipmonger) (an implementation of the Scuttlebutt gossip protocol endpoint for real-time peer-to-peer replication).

## Contributors

[@tristanls](https://github.com/tristanls)


## Usage

```javascript
const GossipmongerTartTransport = require("gossipmonger-tart-transport");
const transport = new GossipmongerTartTransport();

transport.on("deltas", (remotePeer, deltas) =>
    {
        console.log(remotePeer, deltas);
    }
);

transport.on("digest", (remotePeer, digest) =>
    {
        console.log(remotePeer, digest);
    }
);

transport.on("error", error =>
    {
        console.error(error);
        // if error handler is not registered, the error will be thrown
    }
);
```

## Overview

Tart transport for [Gossipmonger](https://github.com/tristanls/node-gossipmonger).

## Documentation

### TartTransport

**Public API**

  * [new TartTransport(\[config\])](#tarttransportconfig)
  * [tartTransport.deltas(remotePeer, localPeer, deltasToSend)](#tarttransportdeltasremotepeer-localpeer-deltastosend)
  * [tartTransport.digest(remotePeer, localPeer, digestToSend)](#tarttransportdigestremotepeer-localpeer-digesttosend)
  * [Event "deltas"](#event-deltas)
  * [Event "digest"](#event-digest)
  * [Event "error"](#event-error)

### new TartTransport([config])

  * `config`: _Object_ Configuration.
    * `authority`: _String_ _(Default: random)_ Tart Ansible protocol authority name to use for this transport.
    * `randomBytes`: _Function_ Allow for replacement of `crypto.randomBytes` in case of need for deterministic testing.
    * `router`: _Function_ Tart-marshal router to register this transport's domain.

Creates a new TartTransport ready to send and receive messages.

### tartTransport.deltas(remotePeer, localPeer, deltasToSend)

  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer sending the message.
  * `deltasToSend`: _Any_ Deltas to send

Sends `deltasToSend` to the `remotePeer`.

### tartTransport.digest(remotePeer, localPeer, digestToSend)

  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer sending the message.
  * `digestToSend`: _Any_ Digest to send

Sends `digestToSend` to the `remotePeer`.

### tartTransport.send(remotePeer, payload)

_**CAUTION: reserved for internal use**_

  * `remotePeer`: _Object_ Peer to send message to.
    * `transport`: _Object_ Tart transport data.
      * `ansible`: _String_ Ansible address of peer to send message to.
  * `payload`: _String_ or _Object_ Payload to send to peer.

Internal common implementation for `tartTransport.deltas(...)` and `tartTransport.digest(...)`.

### Event `deltas`

  * `(remotePeer, deltas) => {}`
    * `remotePeer`: _Object_
      * `id`: _String_ Id of the peer.
      * `transport`: _Any_ Any data identifying this peer to the transport mechanism that is is required for correct transport operation.
    * `deltas`: _Any_ Received deltas.

### Event `digest`

  * `(remotePeer, digest) => {}`
    * `remotePeer`: _Object_
      * `id`: _String_ Id of the peer.
      * `transport`: _Any_ Any data identifying this peer to the transport mechanism that is is required for correct transport operation.
    * `digest`: _Any_ Received digest.

### Event `error`

  * `(error) => {}`
    * `error`: _Object_ An error that occured.

Emitted when TartTransport encounters an error. If no handler is registered, an error will be thrown.
