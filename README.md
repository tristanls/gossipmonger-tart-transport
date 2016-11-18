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

  * `config`: _Object_ _(Default: {})_

Creates a new TartTransport ready to send and receive messages.

### tartTransport.deltas(remotePeer, localPeer, deltasToSend)

  * `remotePeer`: _Object_ Peer to send deltas to.
    * `transport`: _Object_ Tart transport data.
      * `send`: _Function_ Capability to send message to remote peer.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `send`: _Function_ Capability to send message to local peer.
  * `deltasToSend`: _Any_ Deltas to send.

Sends `deltasToSend` to the `remotePeer`.

### tartTransport.digest(remotePeer, localPeer, digestToSend)

  * `remotePeer`: _Object_ Peer to send deltas to.
    * `transport`: _Object_ Tart transport data.
      * `send`: _Function_ Capability to send message to remote peer.
  * `localPeer`: _Object_ Sender peer.
    * `id`: _String_ Sender peer id.
    * `transport`: _Object_ Tart transport data.
      * `send`: _Function_ Capability to send message to local peer.
  * `digestToSend`: _Any_ Digest to send.

Sends `digestToSend` to the `remotePeer`.

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
