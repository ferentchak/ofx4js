(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/domain/data/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  banking: require("./banking/index"),
  common: require("./common/index"),
  creditcard: require("./creditcard/index"),
  investment: require("./investment/index"),
  profile: require("./profile/index"),
  seclist: require("./seclist/index"),
  signon: require("./signon/index"),
  signup: require("./signup/index"),
  tax1099: require("./tax1099/index"),

  ApplicationSecurity: require("./ApplicationSecurity"),
  MessageSetProfile: require("./MessageSetProfile"),
  MessageSetType: require("./MessageSetType"),
  RequestEnvelope: require("./RequestEnvelope"),
  RequestMessage: require("./RequestMessage"),
  RequestMessageSet: require("./RequestMessageSet"),
  ResponseEnvelope: require("./ResponseEnvelope"),
  ResponseMessage: require("./ResponseMessage"),
  ResponseMessageSet: require("./ResponseMessageSet"),
  SignonProfile: require("./SignonProfile"),
  TransactionWrappedRequestMessage: require("./TransactionWrappedRequestMessage"),
  TransactionWrappedResponseMessage: require("./TransactionWrappedResponseMessage")
};

},{"./ApplicationSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/ApplicationSecurity.js","./MessageSetProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetProfile.js","./MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","./RequestEnvelope":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestEnvelope.js","./RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js","./RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js","./ResponseEnvelope":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseEnvelope.js","./ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js","./ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js","./SignonProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/SignonProfile.js","./TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./banking/index":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/index.js","./common/index":"/Users/aolson/Developer/ofx4js/src/domain/data/common/index.js","./creditcard/index":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/index.js","./investment/index":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/index.js","./profile/index":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/index.js","./seclist/index":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/index.js","./signon/index":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/index.js","./signup/index":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/index.js","./tax1099/index":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/index.js"}],"/Users/aolson/Developer/ofx4js/node_modules/uuid/rng-browser.js":[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/Users/aolson/Developer/ofx4js/node_modules/uuid/uuid.js":[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":"/Users/aolson/Developer/ofx4js/node_modules/uuid/rng-browser.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/ApplicationSecurity.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @author Ryan Heaton
 * @see "Section 4, OFX spec"
 */
var ApplicationSecurity = {

  NONE: 0,

  TYPE1: 1
};


module.exports = ApplicationSecurity;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetProfile.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @class
 */
function MessageSetProfile() {
}

/**
 * Version of the message set.
 *
 * @return {String} The version of the message set.
 */
MessageSetProfile.prototype.getVersion = function() { throw new Error("not implemented"); };

/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @return {String} The name of the service provider (sometimes the message set processing is outsourced).
 */
MessageSetProfile.prototype.getServiceProviderName = function() { throw new Error("not implemented"); };

/**
 * The URL at which the message set is processed.
 *
 * @return {String} The URL at which the message set is processed.
 */
MessageSetProfile.prototype.getUrl = function() { throw new Error("not implemented"); };

/**
 * The application-level security required for this message set.
 *
 * @return {ApplicationSecurity} The application-level security required for this message set.
 */
MessageSetProfile.prototype.getSecurity = function() { throw new Error("not implemented"); };

/**
 * Whether transport-level security is required for this message set.
 *
 * @return {boolean} Whether transport-level security is required for this message set.
 */
MessageSetProfile.prototype.isSslRequired = function() { throw new Error("not implemented"); };

/**
 * The sign-on realm.
 *
 * @return {String} The sign-on realm.
 */
MessageSetProfile.prototype.getRealm = function() { throw new Error("not implemented"); };

/**
 * The language.
 *
 * @return {String} The language.
 * @see java.util.Locale#getISO3Language()
 */
MessageSetProfile.prototype.getLanguage = function() { throw new Error("not implemented"); };

/**
 * The synchronization capability for this message set.
 *
 * @return {SynchronizationCapability} The synchronization capability for this message set.
 */
MessageSetProfile.prototype.getSyncCapability = function() { throw new Error("not implemented"); };

/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @return {boolean} Whether there exists support for resposne-file based error recovery.
 */
MessageSetProfile.prototype.hasFileBasedErrorRecoverySupport = function() { throw new Error("not implemented"); };


module.exports = MessageSetProfile;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * The message set type, used to define message set order in the envelope.
 *
 * @enum
 * @see "Section 2.4.5.2, OFX spec"
 */
var MessageSetType = {

  signon: 0,

  signup: 1,

  banking: 2,

  creditcard: 3,

  investment: 4,

  interbank_transfer: 5,

  wire_transfer: 6,

  payments: 7,

  email: 8,

  investment_security: 9,

  profile: 10,

  tax1099: 11

};


module.exports = MessageSetType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/RequestEnvelope.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../meta/Aggregate");
var ChildAggregate = require("../../meta/ChildAggregate");
var Header = require("../../meta/Header");
var ApplicationSecurity = require("./ApplicationSecurity");
var UUID = require("uuid");

/**
 * Envelope for enclosing an OFX request.
 *
 * @class
 * @see "Section 2.4.3, OFX Spec"
 */
function RequestEnvelope () {

  /**
   * @name RequestEnvelope#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = ApplicationSecurity.NONE;

  /**
   * @name RequestEnvelope#UID
   * @type String
   * @access private
   */
  this.UID = null;

  /**
   * @name RequestEnvelope#lastProcessedUID
   * @type String
   * @access private
   */
  this.lastProcessedUID = null;

  /**
   * @name RequestEnvelope#messageSets
   * @type SortedSet<RequestMessageSet>
   * @access private
   */
  this.messageSets = null;
}



Aggregate.add("OFX", RequestEnvelope);


//headers
//content
RequestEnvelope.prototype.RequestEnvelope = function() {
  this.UID = UUID.v4();
};


RequestEnvelope.prototype.RequestEnvelope = function(/*String*/ UID) {
  this.UID = UID;
};


/**
 * The security of this envelope.
 *
 * @return {ApplicationSecurity} The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getSecurity = function() {
  return this.security;
};
Header.add({name: "SECURITY", owner: RequestEnvelope, /*type: ApplicationSecurity,*/ fcn: "getSecurity"});


/**
 * The security of this envelope.
 *
 * @param {ApplicationSecurity} security The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * The UID for the envelope.
 *
 * @return {String} The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getUID = function() {
  return this.UID;
};
Header.add({name: "NEWFILEUID", owner: RequestEnvelope, /*type: String,*/ fcn: "getUID"});


/**
 * The UID for the envelope.
 *
 * @param {String} UID The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setUID = function(UID) {
  this.UID = UID;
};


/**
 * The UID of the last-processed request/response (used for file-based error recovery).
 *
 * @return {String} The UID of the last-processed request/response (used for file-based error recovery).
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getLastProcessedUID = function() {
  return this.lastProcessedUID;
};
Header.add({name: "OLDFILEUID", owner: RequestEnvelope, /*type: String,*/ fcn: "getLastProcessedUID"});


/**
 * The UID of the last-processed request/response (used for file-based error recovery).
 *
 * @param {String} lastProcessedUID The UID of the last-processed request/response (used for file-based error recovery).
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setLastProcessedUID = function(lastProcessedUID) {
  this.lastProcessedUID = lastProcessedUID;
};


/**
 * The message sets that make up the content of this request.
 *
 * @return {SortedSet<RequestMessageSet>} The message sets that make up the content of this request.
 * @see "Section 2.4.5, OFX Spec"
 */
RequestEnvelope.prototype.getMessageSets = function() {
  return this.messageSets;
};
ChildAggregate.add({order: 1, owner: RequestEnvelope, /*type: SortedSet<RequestMessageSet>,*/ fcn: "getMessageSets"});


/**
 * The message sets that make up the content of this request.
 *
 * @param {SortedSet<RequestMessageSet>} messageSets The message sets that make up the content of this request.
 * @see "Section 2.4.5, OFX Spec"
 */
RequestEnvelope.prototype.setMessageSets = function(messageSets) {
  this.messageSets = messageSets;
};




module.exports = RequestEnvelope;

},{"../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../meta/Header":"/Users/aolson/Developer/ofx4js/src/meta/Header.js","./ApplicationSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/ApplicationSecurity.js","uuid":"/Users/aolson/Developer/ofx4js/node_modules/uuid/uuid.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../util/inherit");

/**
 * A message applicable to a request message set.
 *
 * @class
 */
function RequestMessage () {
}







module.exports = RequestMessage;

},{"../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * A message set enclosed in an OFX request envelope.
 *
 * @class
 */
function RequestMessageSet () {

  /**
   * @name RequestMessageSet#version
   * @type String
   * @access private
   */
  this.version = "1";
}


RequestMessageSet.prototype.getType = function() { throw new Error("not implemented"); };

/**
 * The version of this request message.
 *
 * @return {String} The version of this request message.
 */
RequestMessageSet.prototype.getVersion = function() {
  return this.version;
};

/**
 * The version of this request message.
 *
 * @param {String} version The version of this request message.
 */
RequestMessageSet.prototype.setVersion = function(version) {
  this.version = version;
};

/**
 * The request messages for this request message set.
 *
 * @return {RequestMessage[]} The request messages for this request message set.
 */
RequestMessageSet.prototype.getRequestMessages = function() { throw new Error("not implemented"); };

// Inherited.
RequestMessageSet.prototype.compareTo = function(/*RequestMessageSet*/ o) {
  return this.getType().compareTo(o.getType());
};




module.exports = RequestMessageSet;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseEnvelope.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../meta/Aggregate");
var ChildAggregate = require("../../meta/ChildAggregate");
var Header = require("../../meta/Header");
var MessageSetType = require("./MessageSetType");

/**
 * Envelope for enclosing an OFX response.
 *
 * @class
 * @see "Section 2.4.3, OFX Spec"
 */
function ResponseEnvelope () {

  /**
   * @name ResponseEnvelope#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = null;

  /**
   * @name ResponseEnvelope#UID
   * @type String
   * @access private
   */
  this.UID = null;

  /**
   * @name ResponseEnvelope#messageSets
   * @type SortedSet<ResponseMessageSet>
   * @access private
   */
  this.messageSets = null;
}



Aggregate.add("OFX", ResponseEnvelope);


/**
 * The security of this envelope.
 *
 * @return {ApplicationSecurity} The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.getSecurity = function() {
  return this.security;
};
Header.add({name: "SECURITY", owner: ResponseEnvelope, /*type: ApplicationSecurity,*/ fcn: "getSecurity"});


/**
 * The security of this envelope.
 *
 * @param {ApplicationSecurity} security The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * The UID for the envelope.
 *
 * @return {String} The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.getUID = function() {
  return this.UID;
};
Header.add({name: "NEWFILEUID", owner: ResponseEnvelope, /*type: String,*/ fcn: "getUID"});


/**
 * The UID for the envelope.
 *
 * @param {String} UID The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.setUID = function(UID) {
  this.UID = UID;
};


/**
 * The message sets that make up the content of this response.
 *
 * @return {SortedSet<ResponseMessageSet>} The message sets that make up the content of this response.
 * @see "Section 2.4.5, OFX Spec"
 */
ResponseEnvelope.prototype.getMessageSets = function() {
  return this.messageSets;
};
ChildAggregate.add({order: 1, owner: ResponseEnvelope, /*type: SortedSet<ResponseMessageSet>,*/ fcn: "getMessageSets"});


/**
 * The message sets that make up the content of this response.
 *
 * @param {SortedSet<ResponseMessageSet>} messageSets The message sets that make up the content of this response.
 * @see "Section 2.4.5, OFX Spec"
 */
ResponseEnvelope.prototype.setMessageSets = function(messageSets) {
  this.messageSets = messageSets;
};


/**
 * Helper method for looking up the signon response.
 *
 * @return {SignonResponse} The signon response, or null if none found.
 */
ResponseEnvelope.prototype.getSignonResponse = function() {
  var type = MessageSetType.signon;
  var message = this.getMessageSet(type);

  if (message !== null) {
    return message.getSignonResponse();
  }
  else {
    return null;
  }
};


/**
 * Get the message set of the specified type.
 *
 * @param {MessageSetType} type The type.
 * @return {ResponseMessageSet} The message set, or null.
 */
ResponseEnvelope.prototype.getMessageSet = function(type) {
  var message = null;
  if (this.messageSets !== null) {
    for (var messageSet in this.messageSets) {
      if (messageSet.getType() == type) {
        message = messageSet;
        break;
      }
    }
  }
  return message;
};




module.exports = ResponseEnvelope;

},{"../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../meta/Header":"/Users/aolson/Developer/ofx4js/src/meta/Header.js","./MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * A message applicable to a response message set.
 *
 * @class
 */
function ResponseMessage () {
}





/**
 * The name of the response message.
 *
 * @return {String} The name of the response message.
 */
ResponseMessage.prototype.getResponseMessageName = function() { throw new Error("not implemented"); };




module.exports = ResponseMessage;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * A message set enclosed in a response envelope.
 *
 * @class
 */
function ResponseMessageSet () {

  /**
   * @name ResponseMessageSet#version
   * @type String
   * @access private
   */
  this.version = "1";
}


ResponseMessageSet.prototype.getType = function() { throw new Error("not implemented"); };

/**
 * The version of this message set.
 *
 * @return {String} The version of this message set.
 */
ResponseMessageSet.prototype.getVersion = function() {
  return this.version;
};

/**
 * The version of this message set.
 *
 * @param {String} version The version of this message set.
 */
ResponseMessageSet.prototype.setVersion = function(version) {
  this.version = version;
};

/**
 * The list of response messages.
 *
 * @return {ResponseMessage[]} The list of response messages.
 */
ResponseMessageSet.prototype.getResponseMessages = function() { throw new Error("not implemented"); };

// Inherited.
ResponseMessageSet.prototype.compareTo = function(/*ResponseMessageSet*/ o) {
  return this.getType().compareTo(o.getType());
};




module.exports = ResponseMessageSet;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/SignonProfile.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @class
 */
function SignonProfile() {
}

/**
 * The name of the sign-on realm.
 *
 * @return {String} The name of the sign-on realm.
 */
SignonProfile.prototype.getRealm = function() { throw new Error("not implemented"); };

/**
 * The minimum number of password characters.
 *
 * @return {Integer} The minimum number of password characters.
 */
SignonProfile.prototype.getMinPasswordCharacters = function() { throw new Error("not implemented"); };

/**
 * The maximum number of password characters.
 *
 * @return {Integer} The maximum number of password characters.
 */
SignonProfile.prototype.getMaxPasswordCharacters = function() { throw new Error("not implemented"); };

/**
 * The type of password characters supported.
 *
 * @return {CharacterType} The type of password characters supported.
 */
SignonProfile.prototype.getPasswordCharacterType = function() { throw new Error("not implemented"); };

/**
 * Whether the password is case-sensitive.
 *
 * @return {Boolean} Whether the password is case-sensitive.
 */
SignonProfile.prototype.getPasswordCaseSensitive = function() { throw new Error("not implemented"); };

/**
 * Whether special characters are allowed in the password.
 *
 * @return {Boolean} Whether special characters are allowed in the password.
 */
SignonProfile.prototype.getPasswordSpecialCharsAllowed = function() { throw new Error("not implemented"); };

/**
 * Whether spaces are allowed in the password.
 *
 * @return {Boolean} Whether spaces are allowed in the password.
 */
SignonProfile.prototype.getPasswordSpacesAllowed = function() { throw new Error("not implemented"); };

/**
 * Whether the server can process a password change request for this realm.
 *
 * @return {Boolean} Whether the server can process a password change request for this realm.
 */
SignonProfile.prototype.getChangePasswordSupported = function() { throw new Error("not implemented"); };

/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @return {Boolean} Whether the server requires the user to change their password as part of their first signon.
 */
SignonProfile.prototype.getChangePasswordFirstRequired = function() { throw new Error("not implemented"); };

/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonProfile.prototype.getAdditionalCredientialsLabel1 = function() { throw new Error("not implemented"); };

/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonProfile.prototype.getAdditionalCredientialsLabel2 = function() { throw new Error("not implemented"); };

/**
 * Whether a client UID is required for teh sign-on.
 *
 * @return {Boolean} Whether a client UID is required for teh sign-on.
 */
SignonProfile.prototype.getClientUIDRequired = function() { throw new Error("not implemented"); };

/**
 * Whether an auth token is required for the sign-on.
 *
 * @return {Boolean} Whether an auth token is required for the sign-on.
 */
SignonProfile.prototype.getAuthTokenRequiredForFirstSignon = function() { throw new Error("not implemented"); };

/**
 * The label of the auth token.
 *
 * @return {String} The label of the auth token.
 */
SignonProfile.prototype.getAuthTokenLabel = function() { throw new Error("not implemented"); };

/**
 * The URL for the auth token information.
 *
 * @return {String} The URL for the auth token information.
 */
SignonProfile.prototype.getAuthTokenInfoURL = function() { throw new Error("not implemented"); };

/**
 * Whether MFA is supported.
 *
 * @return {Boolean} Whether MFA is supported.
 */
SignonProfile.prototype.getMfaSupported = function() { throw new Error("not implemented"); };

/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @return {Boolean} Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonProfile.prototype.getMfaChallengeRequiredForFirstSignon = function() { throw new Error("not implemented"); };


module.exports = SignonProfile;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../util/inherit");

var Element = require("../../meta/Element");
var UUID = require("uuid");
var RequestMessage = require("./ResponseMessage");

/**
 * A request message wrapped in a transaction.
 *
 * @class
 * @see "Section 2.4.6, OFX Spec"
 * @param {RequestMessage} M
 */
function TransactionWrappedRequestMessage(/*M*/) {

  /**
   * constructor
   */
  var c = function() {
    var UID;
    if(arguments.length === 1) {
      UID = arguments[0];
    } else {
      UID = UUID.v4();
    }

    /**
     * @type String
     */
    this.UID = UID;

    /**
     * @type String
     */
    this.clientCookie = null;

    /**
     * @type String
     */
    this.transactionAuthorizationNumber = null;
  };

  /**
   * UID of this transaction.
   *
   * @return UID of this transaction.
   */
  c.prototype.getUID = function() {
    return this.UID;
  };
  Element.add({name: "TRNUID", required: true, order: 0, owner: c, /*type: String,*/ fcn: "getUID"});


  /**
   * UID of this transaction.
   *
   * @param {String} UID UID of this transaction.
   */
  c.prototype.setUID = function(UID) {
    this.UID = UID;
  };

  /**
   * Client cookie (echoed back by the response).
   *
   * @return {String} Client cookie (echoed back by the response).
   */
  c.prototype.getClientCookie = function() {
    return this.clientCookie;
  };
  Element.add({name: "CLTCOOKIE", order: 10, owner: c, /*type: String,*/ fcn: "getClientCookie"});

  /**
   * Client cookie (echoed back by the response).
   *
   * @param {String} clientCookie Client cookie (echoed back by the response).
   */
  c.prototype.setClientCookie = function(clientCookie) {
    this.clientCookie = clientCookie;
  };

  /**
   * The transaction authorization number.
   *
   * @return {String} The transaction authorization number.
   */
  c.prototype.getTransactionAuthorizationNumber = function() {
    return this.transactionAuthorizationNumber;
  };
  Element.add({name: "TAN", order: 20, owner: c, /*type: String,*/ fcn: "getTransactionAuthorizationNumber"});

  /**
   * The transaction authorization number.
   *
   * @param {String} transactionAuthorizationNumber The transaction authorization number.
   */
  c.prototype.setTransactionAuthorizationNumber = function(transactionAuthorizationNumber) {
    this.transactionAuthorizationNumber = transactionAuthorizationNumber;
  };
  
  
  /**
   * Set the wrapped message.
   *
   * @param {M} message The wrapped message.
   */
  c.prototype.setWrappedMessage = function(/*message*/) { throw new Error("not implemented"); };


  inherit(c, 'extends', RequestMessage);
  return c;
}

module.exports = TransactionWrappedRequestMessage;

},{"../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js","uuid":"/Users/aolson/Developer/ofx4js/node_modules/uuid/uuid.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../util/inherit");

var StatusHolder = require("./common/StatusHolder");
var ChildAggregate = require("../../meta/ChildAggregate");
var Element = require("../../meta/Element");
var Aggregate = require("../../meta/Aggregate");
var ResponseMessage = require("./ResponseMessage");

/**
 * A response message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
function TransactionWrappedResponseMessage(/*M*/) {

  var c = function() {
    /**
     * @type String
     */
    this.UID = null;

    /**
     * @type String
     */
    this.clientCookie = null;

    /**
     * @type Status
     */
    this.status = null;
  };

  /**
   * UID of this transaction.
   *
   * @return {String} UID of this transaction.
   */
  c.prototype.getUID = function() {
    return this.UID;
  };
  Element.add({name: "TRNUID", required: true, order: 0, owner: c, /*type: String,*/ fcn: "getUID"});

  /**
   * UID of this transaction.
   *
   * @param {String} UID UID of this transaction.
   */
  c.prototype.setUID = function(UID) {
    this.UID = UID;
  };

  /**
   * Client cookie (echoed back by the response).
   *
   * @return {String} Client cookie (echoed back by the response).
   */
  c.prototype.getClientCookie = function() {
    return this.clientCookie;
  };
  Element.add({name: "CLTCOOKIE", order: 20, owner: c, /*type: String,*/ fcn: "getClientCookie"});

  /**
   * Client cookie (echoed back by the response).
   *
   * @param {String} clientCookie Client cookie (echoed back by the response).
   */
  c.prototype.setClientCookie = function(clientCookie) {
    this.clientCookie = clientCookie;
  };

  // Inherited.
  c.prototype.getStatusHolderName = function() {
    return this.getResponseMessageName();
  };

  // Inherited.
  c.prototype.getResponseMessageName = function() {
    var name = "transaction response";
    if (this.getWrappedMessage() !== null) {
      name = this.getWrappedMessage().getResponseMessageName() + " transaction";
    }
    else if (this.getClass().isAnnotationPresent(Aggregate.class)) {
      name = this.getClass().getAnnotation(Aggregate.class).value() + " transaction";
    }

    return name;
  };

  /**
   * Status of the transaction.
   *
   * @return {Status} Status of the transaction.
   */
  c.prototype.getStatus = function() {
    return this.status;
  };
  ChildAggregate.add({required: true, order: 10, owner: c, /*type: Status,*/ fcn: "getStatus"});

  /**
   * Status of the transaction.
   *
   * @param {Status} status Status of the transaction.
   */
  c.prototype.setStatus = function(status) {
    this.status = status;
  };

  /**
   * Get the wrapped message.
   *
   * @return The wrapped message.
   */
  c.prototype.getWrappedMessage = function() { throw new Error("not implemented"); };

  inherit(c, 'extends', ResponseMessage);
  inherit(c, 'implements', StatusHolder);
  return c;
}

module.exports = TransactionWrappedResponseMessage;

},{"../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js","./common/StatusHolder":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusHolder.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/AccountType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @see "OFX Spec, Section 11.3.1.1"
 * @enum
 */
var AccountType = {

  CHECKING: 0,

  SAVINGS: 1,

  MONEYMRKT: 2,

  CREDITLINE: 3
  
};


module.exports = AccountType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankAccountDetails.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var AccountDetails = require("../common/AccountDetails");

/**
 * Base bank account details.
 *
 * @class
 * @augments AccountDetails
 * @see "OFX Spec, Section 11.3.1"
 */
function BankAccountDetails () {

  /**
   * @name BankAccountDetails#bankId
   * @type String
   * @access private
   */
  this.bankId = null;

  /**
   * @name BankAccountDetails#branchId
   * @type String
   * @access private
   */
  this.branchId = null;

  /**
   * @name BankAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name BankAccountDetails#accountType
   * @type AccountType
   * @access private
   */
  this.accountType = null;

  /**
   * @name BankAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(BankAccountDetails, "implements", AccountDetails);


Aggregate.add("BankAccountDetails", BankAccountDetails);


/**
 * The routing and transit number.
 *
 * @return {String} The routing and transit number.
 */
BankAccountDetails.prototype.getBankId = function() {
  return this.bankId;
};
Element.add({name: "BANKID", required: true, order: 0, owner: BankAccountDetails, /*type: String,*/ fcn: "getBankId"});


/**
 * The routing and transit number.
 *
 * @param {String} bankId The routing and transit number.
 */
BankAccountDetails.prototype.setBankId = function(bankId) {
  this.bankId = bankId;
};


/**
 * The routing and transit number.
 *
 * @return {String} The routing and transit number.
 */
BankAccountDetails.prototype.getRoutingNumber = function() {
  return this.getBankId();
};


/**
 * The routing and transit number.
 *
 * @param {String} routingNumber The routing and transit number.
 */
BankAccountDetails.prototype.setRoutingNumber = function(routingNumber) {
  this.setBankId(routingNumber);
};


/**
 * The branch id.
 *
 * @return {String} The branch id.
 */
BankAccountDetails.prototype.getBranchId = function() {
  return this.branchId;
};
Element.add({name: "BRANCHID", order: 10, owner: BankAccountDetails, /*type: String,*/ fcn: "getBranchId"});


/**
 * The branch id.
 *
 * @param {String} branchId The branch id.
 */
BankAccountDetails.prototype.setBranchId = function(branchId) {
  this.branchId = branchId;
};


/**
 * The account number.
 *
 * @return {String} The account number.
 */
BankAccountDetails.prototype.getAccountNumber = function() {
  return this.accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 20, owner: BankAccountDetails, /*type: String,*/ fcn: "getAccountNumber"});


/**
 * The account number.
 *
 * @param {String} accountNumber The account number.
 */
BankAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * The account type.
 *
 * @return {AccountType} The account type.
 */
BankAccountDetails.prototype.getAccountType = function() {
  return this.accountType;
};
Element.add({name: "ACCTTYPE", required: true, order: 30, owner: BankAccountDetails, /*type: AccountType,*/ fcn: "getAccountType"});


/**
 * The account type.
 *
 * @param {AccountType} accountType The account type.
 */
BankAccountDetails.prototype.setAccountType = function(accountType) {
  this.accountType = accountType;
};


/**
 * The account key.
 *
 * @return {String} The account key.
 */
BankAccountDetails.prototype.getAccountKey = function() {
  return this.accountKey;
};
Element.add({name: "ACCTKEY", order: 40, owner: BankAccountDetails, /*type: String,*/ fcn: "getAccountKey"});


/**
 * The account key.
 *
 * @param {String} accountKey The account key.
 */
BankAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = BankAccountDetails;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/AccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountDetails.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankAccountInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");
var Aggregate = require("../../../meta/Aggregate");
var AccountInfo = require("../common/AccountInfo");

/**
 * @class
 * @augments AccountInfo
 */
function BankAccountInfo () {

  /**
   * @name BankAccountInfo#bankAccount
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccount = null;

  /**
   * @name BankAccountInfo#supportsTransactionDetailOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransactionDetailOperations = null;

  /**
   * @name BankAccountInfo#supportsTransferToOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferToOtherAccountOperations = null;

  /**
   * @name BankAccountInfo#supportsTransferFromOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferFromOtherAccountOperations = null;

  /**
   * @name BankAccountInfo#status
   * @type AccountStatus
   * @access private
   */
  this.status = null;
}

inherit(BankAccountInfo, "implements", AccountInfo);


Aggregate.add("BANKACCTINFO", BankAccountInfo);


/**
 * The bank account this information is referencing.
 *
 * @return {BankAccountDetails} The bank account this information is referencing.
 */
BankAccountInfo.prototype.getBankAccount = function() {
  return this.bankAccount;
};
ChildAggregate.add({name: "BANKACCTFROM", required: true, order: 0, owner: BankAccountInfo, /*type: BankAccountDetails,*/ fcn: "getBankAccount"});


/**
 * The bank account this information is referencing.
 *
 * @param {BankAccountDetails} bankAccount The bank account this information is referencing.
 */
BankAccountInfo.prototype.setBankAccount = function(bankAccount) {
  this.bankAccount = bankAccount;
};


// Inherited.
BankAccountInfo.prototype.getAccountDetails = function() {
  return this.getBankAccount();
};


/**
 * Whether this account supports download of transaction details.
 *
 * @return {Boolean} Whether this account supports download of transaction details.
 */
BankAccountInfo.prototype.getSupportsTransactionDetailOperations = function() {
  return this.supportsTransactionDetailOperations;
};
Element.add({name: "SUPTXDL", required: true, order: 10, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransactionDetailOperations"});


/**
 * Whether this account supports download of transaction details.
 *
 * @param {Boolean} supportsTransactionDetailOperations Whether this account supports download of transaction details.
 */
BankAccountInfo.prototype.setSupportsTransactionDetailOperations = function(supportsTransactionDetailOperations) {
  this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
};


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations to other accounts.
 */
BankAccountInfo.prototype.getSupportsTransferToOtherAccountOperations = function() {
  return this.supportsTransferToOtherAccountOperations;
};
Element.add({name: "XFERSRC", required: true, order: 20, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferToOtherAccountOperations"});


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @param {Boolean} supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
 */
BankAccountInfo.prototype.setSupportsTransferToOtherAccountOperations = function(supportsTransferToOtherAccountOperations) {
  this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
};


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations from other accounts.
 */
BankAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations = function() {
  return this.supportsTransferFromOtherAccountOperations;
};
Element.add({name: "XFERDEST", required: true, order: 30, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferFromOtherAccountOperations"});


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @param {Boolean} supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
 */
BankAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations = function(supportsTransferFromOtherAccountOperations) {
  this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
};


/**
 * The account status.
 *
 * @return {AccountStatus} The account status.
 */
BankAccountInfo.prototype.getStatus = function() {
  return this.status;
};
Element.add({name: "SVCSTATUS", required: true, order: 40, owner: BankAccountInfo, /*type: AccountStatus,*/ fcn: "getStatus"});


/**
 * The account status.
 *
 * @param {AccountStatus} status The account status.
 */
BankAccountInfo.prototype.setStatus = function(status) {
  this.status = status;
};




module.exports = BankAccountInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/AccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var StatementRequest = require("../common/StatementRequest");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");

/**
 * @class
 * @augments StatementRequest
 */
function BankStatementRequest () {

  /**
   * @name BankStatementRequest#account
   * @type BankAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(BankStatementRequest, "extends", StatementRequest);


Aggregate.add("STMTRQ", BankStatementRequest);


/**
 * The account details.
 *
 * @return {BankAccountDetails} The account details.
 */
BankStatementRequest.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name: "BANKACCTFROM", required: true, order: 0, owner: BankStatementRequest, /*type: BankAccountDetails,*/ fcn: "getAccount"});


/**
 * The account details.
 *
 * @param {BankAccountDetails} account The account details.
 */
BankStatementRequest.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = BankStatementRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/StatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var BankStatementRequest = require("./BankStatementRequest");
var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function BankStatementRequestTransaction () {

  /**
   * @name BankStatementRequestTransaction#message
   * @type BankStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(BankStatementRequestTransaction, "extends", new TransactionWrappedRequestMessage(BankStatementRequest));


Aggregate.add("STMTTRNRQ", BankStatementRequestTransaction);


/**
 * The message.
 *
 * @return {BankStatementRequest} The message.
 */
BankStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: BankStatementRequestTransaction, /*type: BankStatementRequest,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {BankStatementRequest} message The message.
 *
 */
BankStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
BankStatementRequestTransaction.prototype.setWrappedMessage = function(/*BankStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = BankStatementRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./BankStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var StatementResponse = require("../common/StatementResponse");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments StatementResponse
 */
function BankStatementResponse () {

  /**
   * @name BankStatementResponse#account
   * @type BankAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(BankStatementResponse, "extends", StatementResponse);


Aggregate.add("STMTRS", BankStatementResponse);


BankStatementResponse.prototype.getResponseMessageName = function() {
  return "bank statement";
};


/**
 * The account for the statement.
 *
 * @return {BankAccountDetails} The account for the statement.
 */
BankStatementResponse.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name:"BANKACCTFROM", order: 10, owner: BankStatementResponse, /*type: BankAccountDetails,*/ fcn: "getAccount"});


/**
 * The account for the statement.
 *
 * @param {BankAccountDetails} account The account for the statement.
 */
BankStatementResponse.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = BankStatementResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/StatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var BankStatementResponse = require("./BankStatementResponse");
var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function BankStatementResponseTransaction () {

  /**
   * @name BankStatementResponseTransaction#message
   * @type BankStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(BankStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(BankStatementResponse));


Aggregate.add("STMTTRNRS", BankStatementResponseTransaction);


/**
 * The message.
 *
 * @return {BankStatementResponse} The message.
 */
BankStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: BankStatementResponseTransaction, /*type: BankStatementResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {BankStatementResponse} message The message.
 */
BankStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
BankStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = BankStatementResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./BankStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankingRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments BankingRequestMessageSet
 */
function BankingRequestMessageSet () {

  /**
   * @name BankingRequestMessageSet#statementRequest
   * @type BankStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(BankingRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("BANKMSGSRQV1", BankingRequestMessageSet);


BankingRequestMessageSet.prototype.getType = function() {
  return MessageSetType.banking;
};


/**
 * The statement request.
 *
 * @return {BankStatementRequestTransaction} The statement request.
 */
BankingRequestMessageSet.prototype.getStatementRequest = function() {
  return this.statementRequest;
};
ChildAggregate.add({order: 0, owner: BankingRequestMessageSet, /*type: BankStatementRequestTransaction,*/ fcn: "getStatementRequest"});


/**
 * The statement request.
 *
 * @param {BankStatementRequestTransaction} statementRequest The statement request.
 */
BankingRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
BankingRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getStatementRequest() !== null) {
    requestMessages.push(this.getStatementRequest());
  }
  return requestMessages;
};




module.exports = BankingRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankingResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessageSet
 */
function BankingResponseMessageSet () {

  /**
   * @name BankingResponseMessageSet#statementResponses
   * @type List<BankStatementResponseTransaction>
   * @access private
   */
  this.statementResponses = null;
}

inherit(BankingResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("BANKMSGSRSV1", BankingResponseMessageSet);


BankingResponseMessageSet.prototype.getType = function() {
  return MessageSetType.banking;
};


/**
 * The statement response list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {BankStatementResponseTransaction[]} The statement response list.
 */
BankingResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add({order: 0, owner: BankingResponseMessageSet, /*type: BankStatementResponseTransaction[],*/ fcn: "getStatementResponses"});


/**
 * The statement response.
 *
 * @param {BankStatementResponseTransaction[]} statementResponses The statement responses.
 */
BankingResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


// Inherited.
BankingResponseMessageSet.prototype.getResponseMessages = function() {
  return [this.statementResponses];
};


/**
 * The first statement response.
 *
 * @return {BankStatementResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
BankingResponseMessageSet.prototype.getStatementResponse = function() {
  return this.statementResponses === null || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


BankingResponseMessageSet.prototype.setStatementResponse = function(/*BankStatementResponseTransaction*/ statementResponse) {
  this.statementResponses = [statementResponse];
};




module.exports = BankingResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/banking/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  AccountType: require("./AccountType"),
  BankAccountDetails: require("./BankAccountDetails"),
  BankAccountInfo: require("./BankAccountInfo"),
  BankingRequestMessageSet: require("./BankingRequestMessageSet"),
  BankingResponseMessageSet: require("./BankingResponseMessageSet"),
  BankStatementRequest: require("./BankStatementRequest"),
  BankStatementRequestTransaction: require("./BankStatementRequestTransaction"),
  BankStatementResponse: require("./BankStatementResponse"),
  BankStatementResponseTransaction: require("./BankStatementResponseTransaction"),
};

},{"./AccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/AccountType.js","./BankAccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankAccountDetails.js","./BankAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankAccountInfo.js","./BankStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementRequest.js","./BankStatementRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementRequestTransaction.js","./BankStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementResponse.js","./BankStatementResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankStatementResponseTransaction.js","./BankingRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankingRequestMessageSet.js","./BankingResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankingResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountDetails.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Common details about an account.
 *
 * @class
 */
function AccountDetails() {
}

/**
 * The account number.
 *
 * @return {String} The account number.
 */
AccountDetails.prototype.getAccountNumber = function() { throw new Error("not implemented"); };

/**
 * The account key.
 *
 * @return {String} The account key.
 */
AccountDetails.prototype.getAccountKey = function() { throw new Error("not implemented"); };


module.exports = AccountDetails;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Marker interface for account information.
 *
 * @class
 */
function AccountInfo() {
}

/**
 * The account details.
 *
 * @return {AccountDetails} The account details.
 */
AccountInfo.prototype.getAccountDetails = function() { throw new Error("not implemented"); };


module.exports = AccountInfo;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountStatus.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 */
var AccountStatus = {

  /**
   * Available: 0, but not yet requested.
   */
  AVAIL: 1,

  /**
   * Requested: 2, but not yet available.
   */
  PEND: 3,

  /**
   * Active: 4.
   */
  ACTIVE: 5

};


module.exports = AccountStatus;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/BalanceInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function BalanceInfo () {

  /**
   * @name BalanceInfo#amount
   * @type double
   * @access private
   */
  this.amount = null;

  /**
   * @name BalanceInfo#asOfDate
   * @type Date
   * @access private
   */
  this.asOfDate = null;
}



Aggregate.add("BalanceInfo", BalanceInfo);


/**
 * The amount.
 *
 * @return {double} The amount.
 */
BalanceInfo.prototype.getAmount = function() {
  return this.amount;
};
Element.add({name: "BALAMT", required: true, order: 0, owner: BalanceInfo, /*type: double,*/ fcn: "getAmount"});


/**
 * The amount.
 *
 * @param {double} amount The amount.
 */
BalanceInfo.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The as-of date.
 *
 * @return {Date} The as-of date.
 */
BalanceInfo.prototype.getAsOfDate = function() {
  return this.asOfDate;
};
Element.add({name: "DTASOF", required: true, order: 10, owner: BalanceInfo, /*type: Date,*/ fcn: "getAsOfDate"});


/**
 * The as-of date.
 *
 * @param {Date} asOfDate The as-of date.
 */
BalanceInfo.prototype.setAsOfDate = function(asOfDate) {
  this.asOfDate = asOfDate;
};




module.exports = BalanceInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/BalanceRecord.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @see "Section 3.1.3, OFX Spec"
 */
function BalanceRecord () {

  /**
   * @name BalanceRecord#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name BalanceRecord#description
   * @type String
   * @access private
   */
  this.description = null;

  /**
   * @name BalanceRecord#type
   * @type Type
   * @access private
   */
  this.type = null;

  /**
   * @name BalanceRecord#value
   * @type String
   * @access private
   */
  this.value = null;

  /**
   * @name BalanceRecord#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name BalanceRecord#currency
   * @type Currency
   * @access private
   */
  this.currency = null;
}



Aggregate.add("BAL", BalanceRecord);


/**
 * @enum
 */
BalanceRecord.Type = {

  DOLLAR: 0,

  PERCENT: 1,

  NUMBER: 2
};

/**
 * Name of the balance.
 *
 * @return {String} Name of the balance.
 */
BalanceRecord.prototype.getName = function() {
  return this.name;
};
Element.add({name: "NAME", required: true, order: 0, owner: BalanceRecord, /*type: String,*/ fcn: "getName"});


/**
 * Name of the balance.
 *
 * @param {String} name Name of the balance.
 */
BalanceRecord.prototype.setName = function(name) {
  this.name = name;
};


/**
 * Description of the balance.
 *
 * @return {String} Description of the balance.
 */
BalanceRecord.prototype.getDescription = function() {
  return this.description;
};
Element.add({name: "DESC", required: true, order: 10, owner: BalanceRecord, /*type: String,*/ fcn: "getDescription"});


/**
 * Description of the balance.
 *
 * @param {String} description Description of the balance.
 */
BalanceRecord.prototype.setDescription = function(description) {
  this.description = description;
};


/**
 * Type of the balance.
 *
 * @return {Type} Type of the balance.
 */
BalanceRecord.prototype.getType = function() {
  return this.type;
};
Element.add({name: "BALTYPE", required: true, order: 20, owner: BalanceRecord, /*type: Type,*/ fcn: "getType"});


/**
 * Type of the balance.
 *
 * @param {Type} type Type of the balance.
 */
BalanceRecord.prototype.setType = function(type) {
  this.type = type;
};


/**
 * The value of the balance.
 *
 * @return {String} The value of the balance.
 */
BalanceRecord.prototype.getValue = function() {
  return this.value;
};
Element.add({name: "VALUE", required: true, order: 30, owner: BalanceRecord, /*type: String,*/ fcn: "getValue"});


/**
 * The value of the balance.
 *
 * @param {String} value The value of the balance.
 */
BalanceRecord.prototype.setValue = function(value) {
  this.value = value;
};


/**
 * Timestamp of the balance.
 *
 * @return {Date} Timestamp of the balance.
 */
BalanceRecord.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTASOF", order: 40, owner: BalanceRecord, /*type: Date,*/ fcn: "getTimestamp"});


/**
 * Timestamp of the balance.
 *
 * @param {Date} timestamp Timestamp of the balance.
 */
BalanceRecord.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * Currency.
 *
 * @return {Currency} Currency.
 */
BalanceRecord.prototype.getCurrency = function() {
  return this.currency;
};
ChildAggregate.add({order: 50, owner: BalanceRecord, /*type: Currency,*/ fcn: "getCurrency"});


/**
 * Currency.
 *
 * @param {Currency} currency Currency.
 */
BalanceRecord.prototype.setCurrency = function(currency) {
  this.currency = currency;
};




module.exports = BalanceRecord;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/CorrectionAction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 */
var CorrectionAction = {

  REPLACE: 0,

  DELETE: 1
};


module.exports = CorrectionAction;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/Currency.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @see "Section 5.2, OFX Spec"
 */
function Currency () {

  /**
   * @name Currency#code
   * @type String
   * @access private
   */
  this.code = "USD";

  /**
   * @name Currency#exchangeRate
   * @type Float
   * @access private
   */
  this.exchangeRate = null;
}



Aggregate.add("CURRENCY", Currency);


/**
 * The currency code.
 *
 * @return {String} The currency code.
 * @see java.util.Currency#getCurrencyCode()
 */
Currency.prototype.getCode = function() {
  return this.code;
};
Element.add({name: "CURSYM", required: true, order: 0, owner: Currency, /*type: String,*/ fcn: "getCode"});


/**
 * The currency code
 *
 * @param {String} code The currency code
 */
Currency.prototype.setCode = function(code) {
  this.code = code;
};


/**
 * The exchange rate.
 *
 * @return {Float} The exchange rate.
 */
Currency.prototype.getExchangeRate = function() {
  return this.exchangeRate;
};
Element.add({name: "CURRATE", required: true, order: 10, owner: Currency, /*type: Float,*/ fcn: "getExchangeRate"});


/**
 * The exchange rate.
 *
 * @param {Float} exchangeRate The exchange rate.
 */
Currency.prototype.setExchangeRate = function(exchangeRate) {
  this.exchangeRate = exchangeRate;
};




module.exports = Currency;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/Payee.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Payee () {

  /**
   * @name Payee#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name Payee#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name Payee#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name Payee#address3
   * @type String
   * @access private
   */
  this.address3 = null;

  /**
   * @name Payee#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name Payee#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name Payee#zip
   * @type String
   * @access private
   */
  this.zip = null;

  /**
   * @name Payee#country
   * @type String
   * @access private
   */
  this.country = null;

  /**
   * @name Payee#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("PAYEE", Payee);


/**
 * The name of the payee.
 *
 * @return {String} The name of the payee.
 */
Payee.prototype.getName = function() {
  return this.name;
};
Element.add({name: "NAME", order: 30, owner: Payee, /*type: String,*/ fcn: "getName"});


/**
 * The name of the payee.
 *
 * @param {String} name The name of the payee.
 */
Payee.prototype.setName = function(name) {
  this.name = name;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1", required: true, order: 40, owner: Payee, /*type: String,*/ fcn: "getAddress1"});


/**
 * The address of the payee.
 *
 * @param {String} address1 The address of the payee.
 */
Payee.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2", order: 50, owner: Payee, /*type: String,*/ fcn: "getAddress2"});


/**
 * The address of the payee.
 *
 * @param {String} address2 The address of the payee.
 */
Payee.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress3 = function() {
  return this.address3;
};
Element.add({name: "ADDR3", order: 60, owner: Payee, /*type: String,*/ fcn: "getAddress3"});


/**
 * The address of the payee.
 *
 * @param {String} address3 The address of the payee.
 */
Payee.prototype.setAddress3 = function(address3) {
  this.address3 = address3;
};


/**
 * The city of the payee.
 *
 * @return {String} The city of the payee.
 */
Payee.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY", required: true, order: 70, owner: Payee, /*type: String,*/ fcn: "getCity"});


/**
 * The city of the payee.
 *
 * @param {String} city The city of the payee.
 */
Payee.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * The state of this payee.
 *
 * @return {String} The state of this payee.
 */
Payee.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE", required: true, order: 80, owner: Payee, /*type: String,*/ fcn: "getState"});


/**
 * The state of this payee.
 *
 * @param {String} state The state of this payee.
 */
Payee.prototype.setState = function(state) {
  this.state = state;
};


/**
 * The postal code of this payee.
 *
 * @return {String} The postal code of this payee.
 */
Payee.prototype.getZip = function() {
  return this.zip;
};
Element.add({name: "POSTALCODE", required: true, order: 90, owner: Payee, /*type: String,*/ fcn: "getZip"});


/**
 * The postal code of this payee.
 *
 * @param {String} zip The postal code of this payee.
 */
Payee.prototype.setZip = function(zip) {
  this.zip = zip;
};


/**
 * The country code for this payee.
 *
 * @return {String} The country code for this payee.
 * @see java.util.Locale#getISO3Country()
 */
Payee.prototype.getCountry = function() {
  return this.country;
};
Element.add({name: "COUNTRY", required: true, order: 100, owner: Payee, /*type: String,*/ fcn: "getCountry"});


/**
 * The country code for this payee.
 *
 * @param {String} country The country code for this payee.
 */
Payee.prototype.setCountry = function(country) {
  this.country = country;
};


/**
 * The phone number.
 *
 * @return {String} The phone number.
 */
Payee.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE", order: 110, owner: Payee, /*type: String,*/ fcn: "getPhone"});


/**
 * The phone number.
 *
 * @param {String} phone The phone number.
 */
Payee.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = Payee;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/ProcessorDayOff.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Day of week used in "PROCDAYSOFF" lists.
 *
 * @enum
 * @see "OFX Spec, Section 13.6.2"
 */
var ProcessorDayOff = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,

  fromOfx: function(/*String*/ ofxVal) {
    if ("MONDAY".equals(ofxVal)) {
      return this.MONDAY;
    } else if ("TUESDAY".equals(ofxVal)) {
      return this.TUESDAY;
    } else if ("WEDNESDAY".equals(ofxVal)) {
      return this.WEDNESDAY;
    } else if ("THURSDAY".equals(ofxVal)) {
      return this.THURSDAY;
    } else if ("FRIDAY".equals(ofxVal)) {
      return this.FRIDAY;
    } else if ("SATURDAY".equals(ofxVal)) {
      return this.SATURDAY;
    } else if ("SUNDAY".equals(ofxVal)) {
      return this.SUNDAY;
    } else {
      return null;
    }
  }
};


module.exports = ProcessorDayOff;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRange.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function StatementRange () {

  /**
   * @name StatementRange#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name StatementRange#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name StatementRange#includeTransactions
   * @type Boolean
   * @access private
   */
  this.includeTransactions = Boolean.TRUE;
}



Aggregate.add("INCTRAN", StatementRange);


/**
 * The start of the statement range.
 *
 * @return {Date} The start of the statement range.
 */
StatementRange.prototype.getStart = function() {
  return this.start;
};
Element.add({name: "DTSTART", order: 0, owner: StatementRange, /*type: Date,*/ fcn: "getStart"});


/**
 * The start of the statement range.
 *
 * @param {Date} start The start of the statement range.
 */
StatementRange.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * The end of the statement range.
 *
 * @return {Date} The end of the statement range.
 */
StatementRange.prototype.getEnd = function() {
  return this.end;
};
Element.add({name: "DTEND", order: 10, owner: StatementRange, /*type: Date,*/ fcn: "getEnd"});


/**
 * The end of the statement range.
 *
 * @param {Date} end The end of the statement range.
 */
StatementRange.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * Whether to include transactions.
 *
 * @return {Boolean} Whether to include transactions.
 */
StatementRange.prototype.getIncludeTransactions = function() {
  return this.includeTransactions;
};
Element.add({name: "INCLUDE", required: true, order: 20, owner: StatementRange, /*type: Boolean,*/ fcn: "getIncludeTransactions"});


/**
 * Whether to include transactions.
 *
 * @param {Boolean} includeTransactions Whether to include transactions.
 */
StatementRange.prototype.setIncludeTransactions = function(includeTransactions) {
  this.includeTransactions = includeTransactions;
};




module.exports = StatementRange;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessage
 */
function StatementRequest () {

  /**
   * @name StatementRequest#statementRange
   * @type StatementRange
   * @access private
   */
  this.statementRange = null;
}

inherit(StatementRequest, "extends", RequestMessage);


Aggregate.add("STMTRQ", StatementRequest);


/**
 * The statement range.
 *
 * @return {StatementRange} The statement range.
 */
StatementRequest.prototype.getStatementRange = function() {
  return this.statementRange;
};
ChildAggregate.add({name: "INCTRAN", required: false, order: 10, owner: StatementRequest, /*type: StatementRange,*/ fcn: "getStatementRange"});


/**
 * The statement range.
 *
 * @param {StatementRange} statementRange The statement range.
 */
StatementRequest.prototype.setStatementRange = function(statementRange) {
  this.statementRange = statementRange;
};




module.exports = StatementRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");
//var AccountStatement = require("../../../client/AccountStatement");
//TODO

/**
 * @class
 * @augments ResponseMessage
 * @augments AccountStatement
 */
function StatementResponse () {

  /**
   * @name StatementResponse#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = "USD";

  /**
   * @name StatementResponse#transactionList
   * @type TransactionList
   * @access private
   */
  this.transactionList = null;

  /**
   * @name StatementResponse#ledgerBalance
   * @type BalanceInfo
   * @access private
   */
  this.ledgerBalance = null;

  /**
   * @name StatementResponse#availableBalance
   * @type BalanceInfo
   * @access private
   */
  this.availableBalance = null;

  /**
   * @name StatementResponse#marketingInfo
   * @type String
   * @access private
   */
  this.marketingInfo = null;
}

inherit(StatementResponse, "extends", ResponseMessage);
//inherit(StatementResponse, "implements", AccountStatement);




/**
 * The currency code.
 *
 * @return {String} The currency code.
 * @see java.util.Currency#getCurrencyCode()
 */
StatementResponse.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURDEF", required: true, order: 0, owner: StatementResponse, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * The currency code.
 *
 * @param {String} currencyCode The currency code.
 */
StatementResponse.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * The transaction list.
 *
 * @return {TransactionList} The transaction list.
 */
StatementResponse.prototype.getTransactionList = function() {
  return this.transactionList;
};
ChildAggregate.add({order: 20, owner: StatementResponse, /*type: TransactionList,*/ fcn: "getTransactionList"});


/**
 * The transaction list.
 *
 * @param {TransactionList} transactionList The transaction list.
 */
StatementResponse.prototype.setTransactionList = function(transactionList) {
  this.transactionList = transactionList;
};


/**
 * The ledger balance.
 *
 * @return {BalanceInfo} The ledger balance.
 */
StatementResponse.prototype.getLedgerBalance = function() {
  return this.ledgerBalance;
};
ChildAggregate.add({name: "LEDGERBAL", order: 30, owner: StatementResponse, /*type: BalanceInfo,*/ fcn: "getLedgerBalance"});


/**
 * The ledger balance.
 *
 * @param {BalanceInfo} ledgerBalance The ledger balance.
 */
StatementResponse.prototype.setLedgerBalance = function(ledgerBalance) {
  this.ledgerBalance = ledgerBalance;
};


/**
 * The available balance.
 *
 * @return {BalanceInfo} The available balance.
 */
StatementResponse.prototype.getAvailableBalance = function() {
  return this.availableBalance;
};
ChildAggregate.add({name: "AVAILBAL", order: 40, owner: StatementResponse, /*type: BalanceInfo,*/ fcn: "getAvailableBalance"});


/**
 * The available balance.
 *
 * @param {BalanceInfo} availableBalance The available balance.
 */
StatementResponse.prototype.setAvailableBalance = function(availableBalance) {
  this.availableBalance = availableBalance;
};


/**
 * Marketing information. (?)
 *
 * @return {String} Marketing information.
 */
StatementResponse.prototype.getMarketingInfo = function() {
  return this.marketingInfo;
};
Element.add({name: "MKTGINFO", order: 50, owner: StatementResponse, /*type: String,*/ fcn: "getMarketingInfo"});


/**
 * Marketing information. (?)
 *
 * @param {String} marketingInfo Marketing information.
 */
StatementResponse.prototype.setMarketingInfo = function(marketingInfo) {
  this.marketingInfo = marketingInfo;
};




module.exports = StatementResponse;

},{"../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/Status.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var StatusCode = require("./StatusCode");

/**
 * Transaction status element.
 *
 * @class
 * @see "Section 3.1.4, OFX Spec"
 */
function Status () {

  /**
   * @name Status#code
   * @type StatusCode
   * @access private
   */
  this.code = Status.KnownCode.SUCCESS;

  /**
   * @name Status#severity
   * @type Severity
   * @access private
   */
  this.severity = null;

  /**
   * @name Status#message
   * @type String
   * @access private
   */
  this.message = null;
}



Aggregate.add("STATUS", Status);


var Severity = Status.Severity = {
  INFO: 0,
  WARN: 1,
  ERROR: 2
};

Status.KnownCode = function(/*int*/ code, /*String*/ message, /*Severity*/ defaultSeverity) {

  /**
   * @name Status.KnownCode#code
   * @type int
   * @access private
   */
  this.code = code;

  /**
   * @name Status.KnownCode#message
   * @type String
   * @access private
   */
  this.message = message;

  /**
   * @name Status.KnownCode#defaultSeverity
   * @type Severity
   * @access private
   */
  this.defaultSeverity = defaultSeverity;
};

inherit(Status.KnownCode, "implements", StatusCode);


Status.KnownCode.SUCCESS = new Status.KnownCode(0, "Success", Severity.INFO);
Status.KnownCode.CLIENT_UP_TO_DATE = new Status.KnownCode(1, "Client is up-to-date", Severity.INFO);
Status.KnownCode.GENERAL_ERROR = new Status.KnownCode(2000, "General error.", Severity.ERROR);
Status.KnownCode.GENERAL_ACCOUNT_ERROR = new Status.KnownCode(2002, "General account error.", Severity.ERROR);
Status.KnownCode.ACCOUNT_NOT_FOUND = new Status.KnownCode(2003, "Account not found.", Severity.ERROR);
Status.KnownCode.ACCOUNT_CLOSED = new Status.KnownCode(2004, "Account closed.", Severity.ERROR);
Status.KnownCode.ACCOUNT_NOT_AUTHORIZED = new Status.KnownCode(2005, "Account not authorized.", Severity.ERROR);
Status.KnownCode.DATE_TOO_SOON = new Status.KnownCode(2014, "Date too soon", Severity.ERROR);
Status.KnownCode.DUPLICATE_REQUEST = new Status.KnownCode(2019, "Duplicate request.", Severity.ERROR);
Status.KnownCode.UNSUPPORTED_VERSION = new Status.KnownCode(2021, "Unsupported version", Severity.ERROR);
Status.KnownCode.INVALID_TAN = new Status.KnownCode(2022, "Invalid transaction authorization number.", Severity.ERROR);
Status.KnownCode.MFA_CHALLENGE_REQUIRED = new Status.KnownCode(3000, "Further authentication required.", Severity.ERROR);
Status.KnownCode.MFA_CHALLENGE_FAILED = new Status.KnownCode(3001, "MFA failed.", Severity.ERROR);
Status.KnownCode.PASSWORD_CHANGE_REQUIRED = new Status.KnownCode(15000, "Password change required.", Severity.INFO);
Status.KnownCode.SIGNON_INVALID = new Status.KnownCode(15500, "Invalid signon", Severity.ERROR);
Status.KnownCode.CUSTOMER_ACCOUNT_IN_USE = new Status.KnownCode(15501, "Customer account in use.", Severity.ERROR);
Status.KnownCode.PASSWORD_LOCKED = new Status.KnownCode(15502, "Password locked.", Severity.ERROR);
Status.KnownCode.INVALID_CLIENT_UID = new Status.KnownCode(15510, "Invalid client UID.", Severity.ERROR);
Status.KnownCode.CONTACT_FI = new Status.KnownCode(15511, "User must contact FI.", Severity.ERROR);
Status.KnownCode.AUTHTOKEN_REQUIRED = new Status.KnownCode(15512, "Auth token required.", Severity.ERROR);
Status.KnownCode.INVALID_AUTHTOKEN = new Status.KnownCode(15513, "Invalid auth token.", Severity.ERROR);
Status.KnownCode.NO_DATA = new Status.KnownCode(14701, "No Tax Data for Account.", Severity.ERROR);
Status.KnownCode.DB_EXCEPTION = new Status.KnownCode(14702,"Database error has occured.",Severity.ERROR);
Status.KnownCode.NO_TAXSUPPORT = new Status.KnownCode(14703,"This Tax Year is not supported.",Severity.ERROR);

/**
 * @returns int
 */
Status.KnownCode.prototype.getCode = function() {
  return this.code;
};

/**
 * @returns String
 */
Status.KnownCode.prototype.getMessage = function() {
  return this.message;
};

/**
 * @returns Severity
 */
Status.KnownCode.prototype.getDefaultSeverity = function() {
  return this.defaultSeverity;
};

/**
 * @param {int} code
 * @returns KnownCode
 */
Status.KnownCode.fromCode = function(code) {
  for (var value in Status.KnownCode) {
    if (value instanceof Status.KnownCode && value.getCode() == code) {
      return value;
    }
  }
  return null;
};

/**
 * @returns String
 */
Status.KnownCode.prototype.toString = function() {
  return this.code.toString();
};

/**
 * Status code.
 *
 * @return {StatusCode} The status code.
 */
Status.prototype.getCode = function() {
  return this.code;
};
Element.add({name: "CODE", required: true, order: 0, owner: Status, /*type: StatusCode,*/ fcn: "getCode"});


/**
 * Status code.
 *
 * @param {StatusCode} code Status code.
 */
Status.prototype.setCode = function(code) {
  this.code = code;
  if (this.severity === null) {
    this.severity = code.getDefaultSeverity();
  }
};


/**
 * The severity.
 *
 * @return {Severity} The severity.
 */
Status.prototype.getSeverity = function() {
  return this.severity;
};
Element.add({name: "SEVERITY", required: true, order: 10, owner: Status, /*type: Severity,*/ fcn: "getSeverity"});


/**
 * The severity.
 *
 * @param {Severity} severity The severity.
 */
Status.prototype.setSeverity = function(severity) {
  this.severity = severity;
};


/**
 * Server-supplied message.
 *
 * @return {String} Server-supplied message.
 */
Status.prototype.getMessage = function() {
  return this.message;
};
Element.add({name: "MESSAGE", order: 20, owner: Status, /*type: String,*/ fcn: "getMessage"});


/**
 * Server-supplied message.
 *
 * @param {String} message Server-supplied message.
 */
Status.prototype.setMessage = function(message) {
  this.message = message;
};




module.exports = Status;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./StatusCode":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusCode.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusCode.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @class
 */
function StatusCode() {
}

StatusCode.prototype.getCode = function() { throw new Error("not implemented"); };

StatusCode.prototype.getMessage = function() { throw new Error("not implemented"); };

StatusCode.prototype.getDefaultSeverity = function() { throw new Error("not implemented"); };


module.exports = StatusCode;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusHolder.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

/**
 * A status holder (usually applied to a response).
 *
 * @class
 */
function StatusHolder() {
}

/**
 * The name of this status holder (for error reporting).
 *
 * @return {String} The name of this status holder (for error reporting).
 */
StatusHolder.prototype.getStatusHolderName = function() { throw new Error("not implemented"); };

/**
 * Get the status.
 *
 * @return {Status} The status.
 */
StatusHolder.prototype.getStatus = function() { throw new Error("not implemented"); };


module.exports = StatusHolder;

},{"../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Request.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");

/**
 * @class
 * @augments ResponseMessage
 */
function T1099Request () {
}

inherit(T1099Request, "extends", RequestMessage);


Aggregate.add("STMTRQ", T1099Request);




module.exports = T1099Request;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Response.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");

/**
 * @class
 * @augments ResponseMessage
 */
function T1099Response () {
}

inherit(T1099Response, "extends", ResponseMessage);






module.exports = T1099Response;

},{"../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/Transaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 */
function Transaction () {

  /**
   * @name Transaction#transactionType
   * @type TransactionType
   * @access private
   */
  this.transactionType = null;

  /**
   * @name Transaction#datePosted
   * @type Date
   * @access private
   */
  this.datePosted = null;

  /**
   * @name Transaction#dateInitiated
   * @type Date
   * @access private
   */
  this.dateInitiated = null;

  /**
   * @name Transaction#dateAvailable
   * @type Date
   * @access private
   */
  this.dateAvailable = null;

  /**
   * @name Transaction#amount
   * @type BigDecimal
   * @access private
   */
  this.amount = null;

  /**
   * @name Transaction#id
   * @type String
   * @access private
   */
  this.id = null;

  /**
   * @name Transaction#correctionId
   * @type String
   * @access private
   */
  this.correctionId = null;

  /**
   * @name Transaction#correctionAction
   * @type CorrectionAction
   * @access private
   */
  this.correctionAction = null;

  /**
   * @name Transaction#tempId
   * @type String
   * @access private
   */
  this.tempId = null;

  /**
   * @name Transaction#checkNumber
   * @type String
   * @access private
   */
  this.checkNumber = null;

  /**
   * @name Transaction#referenceNumber
   * @type String
   * @access private
   */
  this.referenceNumber = null;

  /**
   * @name Transaction#standardIndustrialCode
   * @type String
   * @access private
   */
  this.standardIndustrialCode = null;

  /**
   * @name Transaction#payeeId
   * @type String
   * @access private
   */
  this.payeeId = null;

  /**
   * @name Transaction#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name Transaction#payee
   * @type Payee
   * @access private
   */
  this.payee = null;

  /**
   * @name Transaction#bankAccountTo
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountTo = null;

  /**
   * @name Transaction#creditCardAccountTo
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountTo = null;

  /**
   * @name Transaction#memo
   * @type String
   * @access private
   */
  this.memo = null;

  /**
   * @name Transaction#currency
   * @type Currency
   * @access private
   */
  this.currency = null;

  /**
   * @name Transaction#originalCurrency
   * @type Currency
   * @access private
   */
  this.originalCurrency = null;
}



Aggregate.add("STMTTRN", Transaction);


/**
 * The transaction type.
 *
 * @return {TransactionType} The transaction type.
 */
Transaction.prototype.getTransactionType = function() {
  return this.transactionType;
};
Element.add({name: "TRNTYPE", required: true, order: 0, owner: Transaction, /*type: TransactionType,*/ fcn: "getTransactionType"});


/**
 * The transaction type.
 *
 * @param {TransactionType} transactionType The transaction type.
 */
Transaction.prototype.setTransactionType = function(transactionType) {
  this.transactionType = transactionType;
};


/**
 * The date the transaction was posted.
 *
 * @return {Date} The date the transaction was posted.
 */
Transaction.prototype.getDatePosted = function() {
  return this.datePosted;
};
Element.add({name: "DTPOSTED", required: true, order: 10, owner: Transaction, /*type: Date,*/ fcn: "getDatePosted"});


/**
 * The date the transaction was posted.
 *
 * @param {Date} datePosted The date the transaction was posted.
 */
Transaction.prototype.setDatePosted = function(datePosted) {
  this.datePosted = datePosted;
};


/**
 * The date the transaction was initiated.
 *
 * @return {Date} The date the transaction was initiated.
 */
Transaction.prototype.getDateInitiated = function() {
  return this.dateInitiated;
};
Element.add({name: "DTUSER", order: 20, owner: Transaction, /*type: Date,*/ fcn: "getDateInitiated"});


/**
 * The date the transaction was initiated.
 *
 * @param {Date} dateInitiated The date the transaction was initiated.
 */
Transaction.prototype.setDateInitiated = function(dateInitiated) {
  this.dateInitiated = dateInitiated;
};


/**
 * The date the funds are available.
 *
 * @return {Date} The date the funds are available.
 */
Transaction.prototype.getDateAvailable = function() {
  return this.dateAvailable;
};
Element.add({name: "DTAVAIL", order: 30, owner: Transaction, /*type: Date,*/ fcn: "getDateAvailable"});


/**
 * The date the funds are available.
 *
 * @param {Date} dateAvailable The date the funds are available.
 */
Transaction.prototype.setDateAvailable = function(dateAvailable) {
  this.dateAvailable = dateAvailable;
};


/**
 * The transaction amount.
 *
 * @return {Double} The transaction amount.
 */
Transaction.prototype.getAmount = function() {
  return this.amount;
};


/**
 * The transaction amount.
 *
 * @param {Double} amount The transaction amount.
 */
Transaction.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The transaction amount.
 *
 * @return {BigDecimal} The transaction amount.
 */
Transaction.prototype.getBigDecimalAmount = function() {
  return this.amount;
};
Element.add({name: "TRNAMT", required: true, order: 40, owner: Transaction, /*type: BigDecimal,*/ fcn: "getBigDecimalAmount"});


/**
 * The transaction amount.
 *
 * @param {BigDecimal} amount The transaction amount.
 */
Transaction.prototype.setBigDecimalAmount = function(amount) {
  this.amount = amount;
};


/**
 * The transaction id (server-assigned).
 *
 * @return {String} The transaction id (server-assigned).
 */
Transaction.prototype.getId = function() {
  return this.id;
};
Element.add({name: "FITID", required: true, order: 50, owner: Transaction, /*type: String,*/ fcn: "getId"});


/**
 * The transaction id (server-assigned).
 *
 * @param {String} id The transaction id (server-assigned).
 */
Transaction.prototype.setId = function(id) {
  this.id = id;
};


/**
 * The id of the transaction that this is correcting.
 *
 * @return {String} The id of the transaction that this is correcting.
 */
Transaction.prototype.getCorrectionId = function() {
  return this.correctionId;
};
Element.add({name: "CORRECTFITID", order: 60, owner: Transaction, /*type: String,*/ fcn: "getCorrectionId"});


/**
 * The id of the transaction that this is correcting.
 *
 * @param {String} correctionId The id of the transaction that this is correcting.
 */
Transaction.prototype.setCorrectionId = function(correctionId) {
  this.correctionId = correctionId;
};


/**
 * The action to take on the {@link #getCorrectionId() corrected transaction}.
 *
 * @return {CorrectionAction} The action to take on the {@link #getCorrectionId() corrected transaction}.
 */
Transaction.prototype.getCorrectionAction = function() {
  return this.correctionAction;
};
Element.add({name: "CORRECTACTION", order: 70, owner: Transaction, /*type: CorrectionAction,*/ fcn: "getCorrectionAction"});


/**
 * The action to take on the {@link #getCorrectionId() corrected transaction}.
 *
 * @param {CorrectionAction} correctionAction The action to take on the {@link #getCorrectionId() corrected transaction}.
 */
Transaction.prototype.setCorrectionAction = function(correctionAction) {
  this.correctionAction = correctionAction;
};


/**
 * The server-assigned temporary id for client-initiated transactions.
 *
 * @return {String} The server-assigned temporary id for client-initiated transactions.
 */
Transaction.prototype.getTempId = function() {
  return this.tempId;
};
Element.add({name: "SRVRTID", order: 80, owner: Transaction, /*type: String,*/ fcn: "getTempId"});


/**
 * The server-assigned temporary id for client-initiated transactions.
 *
 * @param {String} tempId The server-assigned temporary id for client-initiated transactions.
 */
Transaction.prototype.setTempId = function(tempId) {
  this.tempId = tempId;
};


/**
 * The check number.
 *
 * @return {String} The check number.
 */
Transaction.prototype.getCheckNumber = function() {
  return this.checkNumber;
};
Element.add({name: "CHECKNUM", order: 90, owner: Transaction, /*type: String,*/ fcn: "getCheckNumber"});


/**
 * The check number.
 *
 * @param {String} checkNumber The check number.
 */
Transaction.prototype.setCheckNumber = function(checkNumber) {
  this.checkNumber = checkNumber;
};


/**
 * The reference number.
 *
 * @return {String} The reference number.
 */
Transaction.prototype.getReferenceNumber = function() {
  return this.referenceNumber;
};
Element.add({name: "REFNUM", order: 100, owner: Transaction, /*type: String,*/ fcn: "getReferenceNumber"});


/**
 * The reference number.
 *
 * @param {String} referenceNumber The reference number.
 */
Transaction.prototype.setReferenceNumber = function(referenceNumber) {
  this.referenceNumber = referenceNumber;
};


/**
 * The standard industrial code.
 *
 * @return {String} The standard industrial code.
 */
Transaction.prototype.getStandardIndustrialCode = function() {
  return this.standardIndustrialCode;
};
Element.add({name: "SIC", order: 110, owner: Transaction, /*type: String,*/ fcn: "getStandardIndustrialCode"});


/**
 * The standard industrial code.
 *
 * @param {String} standardIndustrialCode The standard industrial code.
 */
Transaction.prototype.setStandardIndustrialCode = function(standardIndustrialCode) {
  this.standardIndustrialCode = standardIndustrialCode;
};


/**
 * The payee id.
 *
 * @return {String} The payee id.
 */
Transaction.prototype.getPayeeId = function() {
  return this.payeeId;
};
Element.add({name: "PAYEEID", order: 120, owner: Transaction, /*type: String,*/ fcn: "getPayeeId"});


/**
 * The payee id.
 *
 * @param {String} payeeId The payee id.
 */
Transaction.prototype.setPayeeId = function(payeeId) {
  this.payeeId = payeeId;
};


/**
 * The name (description) or the transaction.
 *
 * @return {String} The name (description) or the transaction.
 */
Transaction.prototype.getName = function() {
  return this.name;
};
Element.add({name: "NAME", order: 130, owner: Transaction, /*type: String,*/ fcn: "getName"});


/**
 * The name (description) or the transaction.
 *
 * @param {String} name The name (description) or the transaction.
 */
Transaction.prototype.setName = function(name) {
  this.name = name;
};


/**
 * The payee.
 *
 * @return {Payee} The payee.
 */
Transaction.prototype.getPayee = function() {
  return this.payee;
};
ChildAggregate.add({order: 140, owner: Transaction, /*type: Payee,*/ fcn: "getPayee"});


/**
 * The payee.
 *
 * @param {Payee} payee The payee.
 */
Transaction.prototype.setPayee = function(payee) {
  this.payee = payee;
};


/**
 * The bank account the transfer was to.
 *
 * @return {BankAccountDetails} The bank account the transfer was to.
 */
Transaction.prototype.getBankAccountTo = function() {
  return this.bankAccountTo;
};
ChildAggregate.add({name: "BANKACCTTO", order: 150, owner: Transaction, /*type: BankAccountDetails,*/ fcn: "getBankAccountTo"});


/**
 * The bank account the transfer was to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account the transfer was to.
 */
Transaction.prototype.setBankAccountTo = function(bankAccountTo) {
  this.bankAccountTo = bankAccountTo;
};


/**
 * The credit-card account the transfer was to.
 *
 * @return {CreditCardAccountDetails} The credit-card account the transfer was to.
 */
Transaction.prototype.getCreditCardAccountTo = function() {
  return this.creditCardAccountTo;
};
ChildAggregate.add({name: "CCACCTTO", order: 160, owner: Transaction, /*type: CreditCardAccountDetails,*/ fcn: "getCreditCardAccountTo"});


/**
 * The credit-card account the transfer was to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit-card account the transfer was to.
 */
Transaction.prototype.setCreditCardAccountTo = function(creditCardAccountTo) {
  this.creditCardAccountTo = creditCardAccountTo;
};


/**
 * Notes.
 *
 * @return {String} Notes.
 */
Transaction.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 170, owner: Transaction, /*type: String,*/ fcn: "getMemo"});


/**
 * Notes.
 *
 * @param {String} memo Notes.
 */
Transaction.prototype.setMemo = function(memo) {
  this.memo = memo;
};


/**
 * The currency.
 *
 * @return {Currency} The currency.
 */
Transaction.prototype.getCurrency = function() {
  return this.currency;
};
ChildAggregate.add({order: 180, owner: Transaction, /*type: Currency,*/ fcn: "getCurrency"});


/**
 * The currency.
 *
 * @param {Currency} currency The currency.
 */
Transaction.prototype.setCurrency = function(currency) {
  this.currency = currency;
};


/**
 * The original currency.
 *
 * @return {Currency} The original currency.
 */
Transaction.prototype.getOriginalCurrency = function() {
  return this.originalCurrency;
};
ChildAggregate.add({name: "ORIGCURRENCY", order: 190, owner: Transaction, /*type: Currency,*/ fcn: "getOriginalCurrency"});


/**
 * The original currency.
 *
 * @param {Currency} originalCurrency The original currency.
 */
Transaction.prototype.setOriginalCurrency = function(originalCurrency) {
  this.originalCurrency = originalCurrency;
};




module.exports = Transaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransactionList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 */
function TransactionList () {

  /**
   * @name TransactionList#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name TransactionList#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name TransactionList#transactions
   * @type List<Transaction>
   * @access private
   */
  this.transactions = null;
}



Aggregate.add("BANKTRANLIST", TransactionList);


/**
 * The start date.
 *
 * @return {Date} The start date.
 */
TransactionList.prototype.getStart = function() {
  return this.start;
};
Element.add({name: "DTSTART", required: true, order: 0, owner: TransactionList, /*type: Date,*/ fcn: "getStart"});


/**
 * The start date.
 *
 * @param {Date} start The start date.
 */
TransactionList.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * The end date.
 *
 * @return {Date} The end date.
 */
TransactionList.prototype.getEnd = function() {
  return this.end;
};
Element.add({name: "DTEND", required: true, order: 10, owner: TransactionList, /*type: Date,*/ fcn: "getEnd"});


/**
 * The end date.
 *
 * @param {Date} end The end date.
 */
TransactionList.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * The transaction list.
 *
 * @return {Transaction[]} The transaction list.
 */
TransactionList.prototype.getTransactions = function() {
  return this.transactions;
};
ChildAggregate.add({order: 20, owner: TransactionList, /*type: Transaction[],*/ fcn: "getTransactions"});


/**
 * The transaction list.
 *
 * @param {Transaction[]} transactions The transaction list.
 */
TransactionList.prototype.setTransactions = function(transactions) {
  this.transactions = transactions;
};




module.exports = TransactionList;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransactionType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 */
var TransactionType = {

  /**
   * generic: 0 credit.
   */
  CREDIT: 1,

  /**
   * genertic: 2 debit.
   */
  DEBIT: 3,

  /**
   * interest: 4 earned.
   */
  INT: 5,

  /**
   * dividend: 6.
   */
  DIV: 7,

  /**
   * bank: 8 fee.
   */
  FEE: 9,

  /**
   * service: 10 charge.
   */
  SRVCHG: 11,

  /**
   * deposit: 12.
   */
  DEP: 13,

  /**
   * ATM: 14 transaction.
   */
  ATM: 15,

  /**
   * point: 16 of sale
   */
  POS: 17,

  /**
   * transfer: 18
   */
  XFER: 19,

  /**
   * check: 20
   */
  CHECK: 21,

  /**
   * electronic: 22 payment
   */
  PAYMENT: 23,

  /**
   * cash: 24.
   */
  CASH: 25,

  /**
   * direct: 26 deposit.
   */
  DIRECTDEP: 27,

  /**
   * merchant: 28-initiated debit
   */
  DIRECTDEBIT: 29,

  /**
   * repeating: 30 payment.
   */
  REPEATPMT: 31,

  /**
   * other: 32
   */
  OTHER: 33
};


module.exports = TransactionType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function TransferInfo () {

  /**
   * @name TransferInfo#bankAccountFrom
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountFrom = null;

  /**
   * @name TransferInfo#creditCardAccountFrom
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountFrom = null;

  /**
   * @name TransferInfo#bankAccountTo
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountTo = null;

  /**
   * @name TransferInfo#creditCardAccountTo
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountTo = null;

  /**
   * @name TransferInfo#amount
   * @type Double
   * @access private
   */
  this.amount = null;

  /**
   * @name TransferInfo#due
   * @type Date
   * @access private
   */
  this.due = null;
}



Aggregate.add("XFERINFO", TransferInfo);


/**
 * The bank account to transfer from.
 *
 * @return {BankAccountDetails} The bank account to transfer from.
 */
TransferInfo.prototype.getBankAccountFrom = function() {
  return this.bankAccountFrom;
};
ChildAggregate.add({name: "BANKACCTFROM", order: 0, owner: TransferInfo, /*type: BankAccountDetails,*/ fcn: "getBankAccountFrom"});


/**
 * The bank account to transfer from.
 *
 * @param {BankAccountDetails} bankAccountFrom The bank account to transfer from.
 */
TransferInfo.prototype.setBankAccountFrom = function(bankAccountFrom) {
  this.creditCardAccountFrom = null;
  this.bankAccountFrom = bankAccountFrom;
};


/**
 * The account to transfer from.
 *
 * @param {BankAccountDetails} bankAccountFrom The account to transfer from.
 */
TransferInfo.prototype.setAccountFrom = function(bankAccountFrom) {
  this.setBankAccountFrom(bankAccountFrom);
};


/**
 * The credit card to transfer from.
 *
 * @return {CreditCardAccountDetails} The credit card to transfer from.
 */
TransferInfo.prototype.getCreditCardAccountFrom = function() {
  return this.creditCardAccountFrom;
};
ChildAggregate.add({name: "CCACCTFROM", order: 10, owner: TransferInfo, /*type: CreditCardAccountDetails,*/ fcn: "getCreditCardAccountFrom"});


/**
 * The credit card to transfer from.
 *
 * @param {CreditCardAccountDetails} creditCardAccountFrom The credit card to transfer from.
 */
TransferInfo.prototype.setCreditCardAccountFrom = function(creditCardAccountFrom) {
  this.bankAccountFrom = null;
  this.creditCardAccountFrom = creditCardAccountFrom;
};


/**
 * The credit card to transfer from.
 *
 * @param {CreditCardAccountDetails} creditCardAccountFrom The credit card to transfer from.
 */
TransferInfo.prototype.setAccountFrom = function(creditCardAccountFrom) {
  this.setCreditCardAccountFrom(creditCardAccountFrom);
};


/**
 * The bank account to transfer to.
 *
 * @return {BankAccountDetails} The bank account to transfer to.
 */
TransferInfo.prototype.getBankAccountTo = function() {
  return this.bankAccountTo;
};
ChildAggregate.add({name: "BANKACCTTO", order: 20, owner: TransferInfo, /*type: BankAccountDetails,*/ fcn: "getBankAccountTo"});


/**
 * The bank account to transfer to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account to transfer to.
 */
TransferInfo.prototype.setBankAccountTo = function(bankAccountTo) {
  this.creditCardAccountTo = null;
  this.bankAccountTo = bankAccountTo;
};


/**
 * The bank account to transfer to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account to transfer to.
 */
TransferInfo.prototype.setAccountTo = function(bankAccountTo) {
  this.setBankAccountTo(bankAccountTo);
};


/**
 * The credit card account to transfer to.
 *
 * @return {CreditCardAccountDetails} The credit card account to transfer to.
 */
TransferInfo.prototype.getCreditCardAccountTo = function() {
  return this.creditCardAccountTo;
};
ChildAggregate.add({name: "CCACCTTO", order: 30, owner: TransferInfo, /*type: CreditCardAccountDetails,*/ fcn: "getCreditCardAccountTo"});


/**
 * The credit card account to transfer to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit card account to transfer to.
 */
TransferInfo.prototype.setCreditCardAccountTo = function(creditCardAccountTo) {
  this.bankAccountTo = null;
  this.creditCardAccountTo = creditCardAccountTo;
};


/**
 * The credit card account to transfer to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit card account to transfer to.
 */
TransferInfo.prototype.setAccountTo = function(creditCardAccountTo) {
  this.setCreditCardAccountTo(creditCardAccountTo);
};


/**
 * The amount.
 *
 * @return {Double} The amount.
 */
TransferInfo.prototype.getAmount = function() {
  return this.amount;
};
Element.add({name: "TRNAMT", required: true, order: 40, owner: TransferInfo, /*type: Double,*/ fcn: "getAmount"});


/**
 * The amount.
 *
 * @param {Double} amount The amount.
 */
TransferInfo.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The due date.
 *
 * @return {Date} The due date.
 */
TransferInfo.prototype.getDue = function() {
  return this.due;
};
Element.add({name: "DTDUE", order: 50, owner: TransferInfo, /*type: Date,*/ fcn: "getDue"});


/**
 * The due date.
 *
 * @param {Date} due The due date.
 */
TransferInfo.prototype.setDue = function(due) {
  this.due = due;
};




module.exports = TransferInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferStatus.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

//import java.util.Date;

/**
 * @class
 */
function TransferStatus () {

  /**
   * @name TransferStatus#event
   * @type TransferStatusEvent
   * @access private
   */
  this.event = null;

  /**
   * @name TransferStatus#date
   * @type Date
   * @access private
   */
  this.date = null;
}



Aggregate.add("XFERPRCSTS", TransferStatus);


/**
 * The event.
 *
 * @return {TransferStatusEvent} The event.
 */
TransferStatus.prototype.getEvent = function() {
  return this.event;
};
Element.add({name: "XFERPRCCODE", required: true, order: 0, owner: TransferStatus, /*type: TransferStatusEvent,*/ fcn: "getEvent"});


/**
 * The event.
 *
 * @param {TransferStatusEvent} event The event.
 */
TransferStatus.prototype.setEvent = function(event) {
  this.event = event;
};


/**
 * The date of the event.
 *
 * @return {Date} The date of the event.
 */
TransferStatus.prototype.getDate = function() {
  return this.date;
};
Element.add({name: "DTXFERPRC", required: true, order: 10, owner: TransferStatus, /*type: Date,*/ fcn: "getDate"});


/**
 * The date of the event.
 *
 * @param {Date} date The date of the event.
 */
TransferStatus.prototype.setDate = function(date) {
  this.date = date;
};




module.exports = TransferStatus;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferStatusEvent.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 */
var TransferStatusEvent = {

  WILLPROCESSON: 0,

  POSTEDON: 1,

  NOFUNDSON: 2,

  CANCELEDON: 3,

  FAILEDON: 4
};


module.exports = TransferStatusEvent;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/UnknownStatusCode.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");
var StatusCode = require("./StatusCode");

/**
 * Holder for an unknown status code.
 *
 * @class
 * @augments StatusCode
 */
function UnknownStatusCode () {

  /**
   * @name UnknownStatusCode#code
   * @type int
   * @access private
   */
  this.code = null;

  /**
   * @name UnknownStatusCode#message
   * @type String
   * @access private
   */
  this.message = null;

  /**
   * @name UnknownStatusCode#defaultSeverity
   * @type Status.Severity
   * @access private
   */
  this.defaultSeverity = null;
}

inherit(UnknownStatusCode, "implements", StatusCode);




UnknownStatusCode.prototype.UnknownStatusCode = function(/*int*/ code, /*String*/ message, /*Severity*/ defaultSeverity) {
  this.code = code;
  this.message = message;
  this.defaultSeverity = defaultSeverity;
};


UnknownStatusCode.prototype.getCode = function() {
  return this.code;
};


UnknownStatusCode.prototype.getMessage = function() {
  return this.message;
};


UnknownStatusCode.prototype.getDefaultSeverity = function() {
  return this.defaultSeverity;
};


// @Override
UnknownStatusCode.prototype.toString = function() {
  return String.valueOf(this.code);
};




module.exports = UnknownStatusCode;

},{"../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./StatusCode":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusCode.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/common/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  AccountDetails: require("./AccountDetails"),
  AccountInfo: require("./AccountInfo"),
  AccountStatus: require("./AccountStatus"),
  BalanceInfo: require("./BalanceInfo"),
  BalanceRecord: require("./BalanceRecord"),
  CorrectionAction: require("./CorrectionAction"),
  Currency: require("./Currency"),
  Payee: require("./Payee"),
  ProcessorDayOff: require("./ProcessorDayOff"),
  StatementRange: require("./StatementRange"),
  StatementRequest: require("./StatementRequest"),
  StatementResponse: require("./StatementResponse"),
  Status: require("./Status"),
  StatusCode: require("./StatusCode"),
  StatusHolder: require("./StatusHolder"),
  T1099Request: require("./T1099Request"),
  T1099Response: require("./T1099Response"),
  Transaction: require("./Transaction"),
  TransactionList: require("./TransactionList"),
  TransactionType: require("./TransactionType"),
  TransferInfo: require("./TransferInfo"),
  TransferStatus: require("./TransferStatus"),
  TransferStatusEvent: require("./TransferStatusEvent"),
  UnknownStatusCode: require("./UnknownStatusCode"),
};

},{"./AccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountDetails.js","./AccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountInfo.js","./AccountStatus":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountStatus.js","./BalanceInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/BalanceInfo.js","./BalanceRecord":"/Users/aolson/Developer/ofx4js/src/domain/data/common/BalanceRecord.js","./CorrectionAction":"/Users/aolson/Developer/ofx4js/src/domain/data/common/CorrectionAction.js","./Currency":"/Users/aolson/Developer/ofx4js/src/domain/data/common/Currency.js","./Payee":"/Users/aolson/Developer/ofx4js/src/domain/data/common/Payee.js","./ProcessorDayOff":"/Users/aolson/Developer/ofx4js/src/domain/data/common/ProcessorDayOff.js","./StatementRange":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRange.js","./StatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRequest.js","./StatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementResponse.js","./Status":"/Users/aolson/Developer/ofx4js/src/domain/data/common/Status.js","./StatusCode":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusCode.js","./StatusHolder":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusHolder.js","./T1099Request":"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Request.js","./T1099Response":"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Response.js","./Transaction":"/Users/aolson/Developer/ofx4js/src/domain/data/common/Transaction.js","./TransactionList":"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransactionList.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransactionType.js","./TransferInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferInfo.js","./TransferStatus":"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferStatus.js","./TransferStatusEvent":"/Users/aolson/Developer/ofx4js/src/domain/data/common/TransferStatusEvent.js","./UnknownStatusCode":"/Users/aolson/Developer/ofx4js/src/domain/data/common/UnknownStatusCode.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardAccountDetails.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Element = require("../../../meta/Element");
var Aggregate = require("../../../meta/Aggregate");
var AccountDetails = require("../common/AccountDetails");

/**
 * @class
 * 
 * @see "OFX Spec, Section 11.3.2"
 * @augments AccountDetails
 */
function CreditCardAccountDetails () {

  /**
   * @name CreditCardAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name CreditCardAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(CreditCardAccountDetails, "implements", AccountDetails);


Aggregate.add("CreditCardAccountDetails", CreditCardAccountDetails);


/**
 * The account number.
 *
 * @return {String} The account number.
 */
CreditCardAccountDetails.prototype.getAccountNumber = function() {
  return this.accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 0, owner: CreditCardAccountDetails, /*type: String,*/ fcn: "getAccountNumber"});


/**
 * The account number.
 *
 * @param {String} accountNumber The account number.
 */
CreditCardAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * The account key.
 *
 * @return {String} The account key.
 */
CreditCardAccountDetails.prototype.getAccountKey = function() {
  return this.accountKey;
};
Element.add({name: "ACCKEY", order: 10, owner: CreditCardAccountDetails, /*type: String,*/ fcn: "getAccountKey"});


/**
 * The account key.
 *
 * @param {String} accountKey The account key.
 */
CreditCardAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = CreditCardAccountDetails;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/AccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountDetails.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardAccountInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var AccountInfo = require("../common/AccountInfo");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments AccountInfo
 */
function CreditCardAccountInfo () {

  /**
   * @name CreditCardAccountInfo#creditCardAccount
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccount = null;

  /**
   * @name CreditCardAccountInfo#supportsTransactionDetailOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransactionDetailOperations = null;

  /**
   * @name CreditCardAccountInfo#supportsTransferToOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferToOtherAccountOperations = null;

  /**
   * @name CreditCardAccountInfo#supportsTransferFromOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferFromOtherAccountOperations = null;

  /**
   * @name CreditCardAccountInfo#status
   * @type AccountStatus
   * @access private
   */
  this.status = null;
}

inherit(CreditCardAccountInfo, "implements", AccountInfo);


Aggregate.add("CCACCTINFO", CreditCardAccountInfo);


/**
 * The credit card account this information is referencing.
 *
 * @return {CreditCardAccountDetails} The credit card account this information is referencing.
 */
CreditCardAccountInfo.prototype.getCreditCardAccount = function() {
  return this.creditCardAccount;
};
ChildAggregate.add({name: "CCACCTFROM", required: true, order: 0, owner: CreditCardAccountInfo, /*type: CreditCardAccountDetails,*/ fcn: "getCreditCardAccount"});


/**
 * The credit card account this information is referencing.
 *
 * @param {CreditCardAccountDetails} creditCardAccount The credit card account this information is referencing.
 */
CreditCardAccountInfo.prototype.setCreditCardAccount = function(creditCardAccount) {
  this.creditCardAccount = creditCardAccount;
};


// Inherited.
CreditCardAccountInfo.prototype.getAccountDetails = function() {
  return this.getCreditCardAccount();
};


/**
 * Whether this account supports download of transaction details.
 *
 * @return {Boolean} Whether this account supports download of transaction details.
 */
CreditCardAccountInfo.prototype.getSupportsTransactionDetailOperations = function() {
  return this.supportsTransactionDetailOperations;
};
Element.add({name: "SUPTXDL", required: true, order: 10, owner: CreditCardAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransactionDetailOperations"});


/**
 * Whether this account supports download of transaction details.
 *
 * @param {Boolean} supportsTransactionDetailOperations Whether this account supports download of transaction details.
 */
CreditCardAccountInfo.prototype.setSupportsTransactionDetailOperations = function(supportsTransactionDetailOperations) {
  this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
};


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations to other accounts.
 */
CreditCardAccountInfo.prototype.getSupportsTransferToOtherAccountOperations = function() {
  return this.supportsTransferToOtherAccountOperations;
};
Element.add({name: "XFERSRC", required: true, order: 20, owner: CreditCardAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferToOtherAccountOperations"});


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @param {Boolean} supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
 */
CreditCardAccountInfo.prototype.setSupportsTransferToOtherAccountOperations = function(supportsTransferToOtherAccountOperations) {
  this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
};


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations from other accounts.
 */
CreditCardAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations = function() {
  return this.supportsTransferFromOtherAccountOperations;
};
Element.add({name: "XFERDEST", required: true, order: 30, owner: CreditCardAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferFromOtherAccountOperations"});


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @param {Boolean} supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
 */
CreditCardAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations = function(supportsTransferFromOtherAccountOperations) {
  this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
};


/**
 * The account status.
 *
 * @return {AccountStatus} The account status.
 */
CreditCardAccountInfo.prototype.getStatus = function() {
  return this.status;
};
Element.add({name: "SVCSTATUS", required: true, order: 40, owner: CreditCardAccountInfo, /*type: AccountStatus,*/ fcn: "getStatus"});


/**
 * The account status.
 *
 * @param {AccountStatus} status The account status.
 */
CreditCardAccountInfo.prototype.setStatus = function(status) {
  this.status = status;
};




module.exports = CreditCardAccountInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/AccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments CreditCardRequestMessageSet
 */
function CreditCardRequestMessageSet () {

  /**
   * @name CreditCardRequestMessageSet#statementRequest
   * @type CreditCardStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(CreditCardRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("CREDITCARDMSGSRQV1", CreditCardRequestMessageSet);


CreditCardRequestMessageSet.prototype.getType = function() {
  return MessageSetType.creditcard;
};


/**
 * The request.
 *
 * @return {CreditCardStatementRequestTransaction} The request.
 */
CreditCardRequestMessageSet.prototype.getStatementRequest = function() {
  return this.statementRequest;
};
ChildAggregate.add({order: 0, owner: CreditCardRequestMessageSet, /*type: CreditCardStatementRequestTransaction,*/ fcn: "getStatementRequest"});


/**
 * The request.
 *
 * @param {CreditCardStatementRequestTransaction} statementRequest The request.
 */
CreditCardRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
CreditCardRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getStatementRequest() !== null) {
    requestMessages.push(this.getStatementRequest());
  }
  return requestMessages;
};




module.exports = CreditCardRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessageSet
 */
function CreditCardResponseMessageSet () {

  /**
   * @name CreditCardResponseMessageSet#statementResponses
   * @type List<CreditCardStatementResponseTransaction>
   * @access private
   */
  this.statementResponses = null;
}

inherit(CreditCardResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("CREDITCARDMSGSRSV1", CreditCardResponseMessageSet);


CreditCardResponseMessageSet.prototype.getType = function() {
  return MessageSetType.creditcard;
};


/**
 * The statement response list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {CreditCardStatementResponseTransaction[]} The statement response list.
 */
CreditCardResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add({order: 0, owner: CreditCardResponseMessageSet, /*type: CreditCardStatementResponseTransaction[],*/ fcn: "getStatementResponses"});


/**
 * The statement reponse list.
 *
 * @param {CreditCardStatementResponseTransaction[]} statementResponses The statement response list.
 */
CreditCardResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


/**
 * The first statement response.
 *
 * @return {CreditCardStatementResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
CreditCardResponseMessageSet.prototype.getStatementResponse = function() {
  return this.statementResponses === null || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


/**
 * The statement response.
 *
 * @param {CreditCardStatementResponseTransaction} statementResponse The statement response.
 */
CreditCardResponseMessageSet.prototype.setStatementResponse = function(statementResponse) {
  this.statementResponses = [statementResponse];
};


// Inherited.
CreditCardResponseMessageSet.prototype.getResponseMessages = function() {
  return this.statementResponses;
};




module.exports = CreditCardResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var StatementRequest = require("../common/StatementRequest");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments StatementRequest
 */
function CreditCardStatementRequest () {

  /**
   * @name CreditCardStatementRequest#account
   * @type CreditCardAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(CreditCardStatementRequest, "extends", StatementRequest);


Aggregate.add("CCSTMTRQ", CreditCardStatementRequest);


/**
 * The account details.
 *
 * @return {CreditCardAccountDetails} The account details.
 */
CreditCardStatementRequest.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name: "CCACCTFROM", required: true, order: 0, owner: CreditCardStatementRequest, /*type: CreditCardAccountDetails,*/ fcn: "getAccount"});


/**
 * The account details.
 *
 * @param {CreditCardAccountDetails} account The account details.
 */
CreditCardStatementRequest.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = CreditCardStatementRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/StatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var CreditCardStatementRequest = require("./CreditCardStatementRequest");
var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function CreditCardStatementRequestTransaction () {

  /**
   * @name CreditCardStatementRequestTransaction#message
   * @type CreditCardStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(CreditCardStatementRequestTransaction, "extends", new TransactionWrappedRequestMessage(CreditCardStatementRequest));


Aggregate.add("CCSTMTTRNRQ", CreditCardStatementRequestTransaction);


/**
 * The message.
 *
 * @return {CreditCardStatementRequest} The message.
 */
CreditCardStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: CreditCardStatementRequestTransaction, /*type: CreditCardStatementRequest,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {CreditCardStatementRequest} message The message.
 *
 */
CreditCardStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
CreditCardStatementRequestTransaction.prototype.setWrappedMessage = function(/*CreditCardStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = CreditCardStatementRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./CreditCardStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var StatementResponse = require("../common/StatementResponse");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments StatementResponse
 */
function CreditCardStatementResponse () {

  /**
   * @name CreditCardStatementResponse#account
   * @type CreditCardAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(CreditCardStatementResponse, "extends", StatementResponse);


Aggregate.add("CCSTMTRS", CreditCardStatementResponse);


CreditCardStatementResponse.prototype.getResponseMessageName = function() {
  return "credit card statement";
};


/**
 * The account for the statement.
 *
 * @return {CreditCardAccountDetails} The account for the statement.
 */
CreditCardStatementResponse.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name:"CCACCTFROM", order: 10, owner: CreditCardStatementResponse, /*type: CreditCardAccountDetails,*/ fcn: "getAccount"});


/**
 * The account for the statement.
 *
 * @param {CreditCardAccountDetails} account The account for the statement.
 */
CreditCardStatementResponse.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = CreditCardStatementResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/StatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var CreditCardStatementResponse = require("./CreditCardStatementResponse");
var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function CreditCardStatementResponseTransaction () {

  /**
   * @name CreditCardStatementResponseTransaction#message
   * @type CreditCardStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(CreditCardStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(CreditCardStatementResponse));


Aggregate.add("CCSTMTTRNRS", CreditCardStatementResponseTransaction);


/**
 * The message.
 *
 * @return {CreditCardStatementResponse} The message.
 */
CreditCardStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: CreditCardStatementResponseTransaction, /*type: CreditCardStatementResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {CreditCardStatementResponse} message The message.
 */
CreditCardStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
CreditCardStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = CreditCardStatementResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./CreditCardStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  CreditCardAccountDetails: require("./CreditCardAccountDetails"),
  CreditCardAccountInfo: require("./CreditCardAccountInfo"),
  CreditCardRequestMessageSet: require("./CreditCardRequestMessageSet"),
  CreditCardResponseMessageSet: require("./CreditCardResponseMessageSet"),
  CreditCardStatementRequest: require("./CreditCardStatementRequest"),
  CreditCardStatementRequestTransaction: require("./CreditCardStatementRequestTransaction"),
  CreditCardStatementResponse: require("./CreditCardStatementResponse"),
  CreditCardStatementResponseTransaction: require("./CreditCardStatementResponseTransaction"),
};

},{"./CreditCardAccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardAccountDetails.js","./CreditCardAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardAccountInfo.js","./CreditCardRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardRequestMessageSet.js","./CreditCardResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardResponseMessageSet.js","./CreditCardStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementRequest.js","./CreditCardStatementRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementRequestTransaction.js","./CreditCardStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementResponse.js","./CreditCardStatementResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardStatementResponseTransaction.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/AccountType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of investment account.
 *
 * @enum
 * @see "OFX Spec, Section 13.6.2"
 */
var AccountType = {
  INDIVIDUAL: 0,
  JOINT: 1,
  TRUST: 2,
  CORPORATE: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("INDIVIDUAL".equals(ofxVal)) {
      return AccountType.INDIVIDUAL;
    } else if ("JOINT".equals(ofxVal)) {
      return AccountType.JOINT;
    } else if ("CORPORATE".equals(ofxVal)) {
      return AccountType.CORPORATE;
    } else if ("CORPORATE".equals(ofxVal)) {
      return AccountType.CORPORATE;
    } else {
      return null;
    }
  }
};


module.exports = AccountType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/ActivationStatus.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Activation status of an account.
 * @see "Section 13.6.2, OFX Spec"
 *
 * @enum
 */
var ActivationStatus = {
  ACTIVE: 0,
  PENDING: 1,
  AVAILABLE: 2,

  fromOfx: function(/*String*/ ofxVal) {
    if ("ACTIVE".equals(ofxVal)) {
      return ActivationStatus.ACTIVE;
    } else if ("PEND".equals(ofxVal)) {
      return ActivationStatus.PENDING;
    } else if ("AVAIL".equals(ofxVal)) {
      return ActivationStatus.AVAILABLE;
    } else {
      return null;
    }
  }
}
;


module.exports = ActivationStatus;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/InvestmentAccountDetails.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AccountDetails = require("../../common/AccountDetails");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Aggregate for the details that identifity a brokerage account.
 *
 * @class
 * @augments AccountDetails
 * @see "OFX Spec, Section 13.6.1"
 */
function InvestmentAccountDetails () {

  /**
   * @name InvestmentAccountDetails#brokerId
   * @type String
   * @access private
   */
  this.brokerId = null;

  /**
   * @name InvestmentAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name InvestmentAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(InvestmentAccountDetails, "implements", AccountDetails);


Aggregate.add("InvestmentAccountDetails", InvestmentAccountDetails);


/**
 * Gets the broker id.
 *
 * @return {String} the id of the broker
 */
InvestmentAccountDetails.prototype.getBrokerId = function() {
  return this.brokerId;
};
Element.add({name: "BROKERID", required: true, order: 0, owner: InvestmentAccountDetails, /*type: String,*/ fcn: "getBrokerId"});


/**
 * Sets the broker id.
 *
 * @param {String} brokerId the id of the broker
 */
InvestmentAccountDetails.prototype.setBrokerId = function(brokerId) {
  this.brokerId = brokerId;
};


/**
 * Gets the account number.
 *
 * @return {String} the account number
 */
InvestmentAccountDetails.prototype.getAccountNumber = function() {
  return this.accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 20, owner: InvestmentAccountDetails, /*type: String,*/ fcn: "getAccountNumber"});


/**
 * Sets the account number.
 *
 * @param {String} accountNumber the account number
 */
InvestmentAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * Gets the account key.
 *
 * @return {String} the account key
 */
InvestmentAccountDetails.prototype.getAccountKey = function() {
  return this.accountKey;
};
Element.add({name: "ACCTKEY", order: 40, owner: InvestmentAccountDetails, /*type: String,*/ fcn: "getAccountKey"});


/**
 * Sets the account key.
 *
 * @param {String} accountKey the account key
 */
InvestmentAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = InvestmentAccountDetails;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../common/AccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountDetails.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/InvestmentAccountInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AccountInfo = require("../../common/AccountInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var UnitedStatesAccountType = require("./UnitedStatesAccountType");
var ActivationStatus = require("./ActivationStatus");
var AccountType = require("./AccountType");

/**
 * Aggregate for the info about a brokerage account.
 *
 * @class
 * @augments AccountInfo
 * @see "OFX Spec, Section 13.6.2"
 */
function InvestmentAccountInfo () {

  /**
   * @name InvestmentAccountInfo#investmentAccount
   * @type InvestmentAccountDetails
   * @access private
   */
  this.investmentAccount = null;

  /**
   * @name InvestmentAccountInfo#unitedStatesAccountType
   * @type String
   * @access private
   */
  this.unitedStatesAccountType = null;

  /**
   * @name InvestmentAccountInfo#supportsChecking
   * @type Boolean
   * @access private
   */
  this.supportsChecking = null;

  /**
   * @name InvestmentAccountInfo#activationStatus
   * @type String
   * @access private
   */
  this.activationStatus = null;

  /**
   * @name InvestmentAccountInfo#investmentAccountType
   * @type String
   * @access private
   */
  this.investmentAccountType = null;

  /**
   * @name InvestmentAccountInfo#optionLevel
   * @type String
   * @access private
   */
  this.optionLevel = null;
}

inherit(InvestmentAccountInfo, "implements", AccountInfo);


Aggregate.add("INVACCTINFO", InvestmentAccountInfo);


/**
 * Gets the investment account this information is referencing.
 *
 * @return {InvestmentAccountDetails} the investment account this information is referencing
 */
InvestmentAccountInfo.prototype.getInvestmentAccount = function() {
  return this.investmentAccount;
};
ChildAggregate.add({name: "INVACCTFROM", required: true, order: 0, owner: InvestmentAccountInfo, /*type: InvestmentAccountDetails,*/ fcn: "getInvestmentAccount"});


/**
 * Sets the investment account this information is referencing. This is a required field
 * according to the OFX spec.
 *
 * @param {InvestmentAccountDetails} investmentAccount the investment account this information is referencing
 */
InvestmentAccountInfo.prototype.setInvestmentAccount = function(investmentAccount) {
  this.investmentAccount = investmentAccount;
};


// Inherited.
InvestmentAccountInfo.prototype.getAccountDetails = function() {
  return this.getInvestmentAccount();
};


/**
 * Gets the United States account type. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @return {String} the United States account type
 */
InvestmentAccountInfo.prototype.getUnitedStatesAccountType = function() {
  return this.unitedStatesAccountType;
};
Element.add({name: "USPRODUCTTYPE", required: true, order: 10, owner: InvestmentAccountInfo, /*type: String,*/ fcn: "getUnitedStatesAccountType"});


/**
 * Sets United States account type. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @param {String} unitedStatesAccountType the United States account type
 */
InvestmentAccountInfo.prototype.setUnitedStatesAccountType = function(unitedStatesAccountType) {
  this.unitedStatesAccountType = unitedStatesAccountType;
};


/**
 * Gets the United States account type as one of the well-known types.
 *
 * @return {UnitedStatesAccountType} the account type or null if it's not one of the well-known types
 */
InvestmentAccountInfo.prototype.getUnitedStatesAccountTypeEnum = function() {
  return UnitedStatesAccountType.fromOfx(this.unitedStatesAccountType);
};


/**
 * Gets whether the account supports checking. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @return {Boolean} whether the account supports checking
 */
InvestmentAccountInfo.prototype.getSupportsChecking = function() {
  return this.supportsChecking;
};
Element.add({name: "CHECKING", required: true, order: 20, owner: InvestmentAccountInfo, /*type: Boolean,*/ fcn: "getSupportsChecking"});


/**
 * Sets whether the account supports checking. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @param {Boolean} supportsChecking whether the account supports checking
 */
InvestmentAccountInfo.prototype.setSupportsChecking = function(supportsChecking) {
  this.supportsChecking = supportsChecking;
};


/**
 * Gets the activation status for investment statement download. This is a required field
 * according to the OFX spec.
 *
 * @return {String} the activation status
 */
InvestmentAccountInfo.prototype.getActivationStatus = function() {
  return this.activationStatus;
};
Element.add({name: "SVCSTATUS", required: true, order: 30, owner: InvestmentAccountInfo, /*type: String,*/ fcn: "getActivationStatus"});


/**
 * Sets the activation status for investment statement download. This is a required field
 * according to the OFX spec.
 *
 * @param {String} activationStatus the activation status
 */
InvestmentAccountInfo.prototype.setActivationStatus = function(activationStatus) {
  this.activationStatus = activationStatus;
};


/**
 * Gets the activation status as one of the well-known types.
 *
 * @return {ActivationStatus} the activation status or null if it wasn't one of the well known types
 */
InvestmentAccountInfo.prototype.getActivationStatusEnum = function() {
  return ActivationStatus.fromOfx(this.getActivationStatus());
};


/**
 * Gets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the type of account
 */
InvestmentAccountInfo.prototype.getInvestmentAccountType = function() {
  return this.investmentAccountType;
};
Element.add({name: "INVACCTTYPE", order: 40, owner: InvestmentAccountInfo, /*type: String,*/ fcn: "getInvestmentAccountType"});


/**
 * Sets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} investmentAccountType the type of account
 */
InvestmentAccountInfo.prototype.setInvestmentAccountType = function(investmentAccountType) {
  this.investmentAccountType = investmentAccountType;
};


/**
 * Gets the type of investment account as one of the well-known types.
 *
 * @return {AccountType} the type of investment account or null if it's not one of the well-known types
 */
InvestmentAccountInfo.prototype.getInvestmentAccountTypeEnum = function() {
  return AccountType.fromOfx(this.getInvestmentAccountType());
};


/**
 * Gets the description of option trading privileges. * This is an optional field according to
 * the OFX spec.
 *
 * @return {String} the description of option trading privileges.
 */
InvestmentAccountInfo.prototype.getOptionLevel = function() {
  return this.optionLevel;
};
Element.add({name: "OPTIONLEVEL", order: 50, owner: InvestmentAccountInfo, /*type: String,*/ fcn: "getOptionLevel"});


/**
 * Sets the description of option trading privileges. * This is an optional field according to
 * the OFX spec.
 *
 * @param {String} optionLevel the description of option trading privileges.
 */
InvestmentAccountInfo.prototype.setOptionLevel = function(optionLevel) {
  this.optionLevel = optionLevel;
};




module.exports = InvestmentAccountInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../common/AccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/common/AccountInfo.js","./AccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/AccountType.js","./ActivationStatus":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/ActivationStatus.js","./UnitedStatesAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/UnitedStatesAccountType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Types of well-known sub-accounts.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var SubAccountType = {
  CASH: 0,
  MARGIN: 1,
  SHORT: 2,
  OTHER: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("CASH".equals(ofxVal)) {
      return SubAccountType.CASH;
    } else if ("MARGIN".equals(ofxVal)) {
      return SubAccountType.MARGIN;
    } else if ("SHORT".equals(ofxVal)) {
      return SubAccountType.SHORT;
    } else if ("OTHER".equals(ofxVal)) {
      return SubAccountType.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = SubAccountType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/UnitedStatesAccountType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";


/**
 * @enum
 * @see "OFX Spec, Section 13.6.2.1"
 */
var UnitedStatesAccountType = {

  /** A: 0 401(k) retirement account */
  R401K: 1,

  /** A: 2 403(B) retirement account */
  R403B: 3,

  /** An: 4 IRA retirement account */
  IRA: 5,

  /** Keough: 6 (money purchase/profit sharing) account */
  KEOUGH: 7,

  /** Other: 8 account type */
  OTHER: 9,

  /** Salary: 10 Reduction Employer Pension Plan */
  SARSEP: 11,

  /** Savings: 12 Incentive Match Plan for Employees*/
  SIMPLE: 13,

  /** Regular: 14 investment account */
  NORMAL: 15,

  /** Tax: 16 Deferred Annuity */
  TDA: 17,

  /** Trust: 18 (including UTMA) */
  TRUST: 19,

  /** Custodial: 20 account */
  UGMA: 21,
  
  fromOfx: function(/*String*/ ofxVal) {
    if ("401K".equals(ofxVal)) {
      return UnitedStatesAccountType.R401K;
    } else if ("403B".equals(ofxVal)) {
      return UnitedStatesAccountType.R403B;
    } else if ("IRA".equals(ofxVal)) {
      return UnitedStatesAccountType.IRA;
    } else if ("KEOUGH".equals(ofxVal)) {
      return UnitedStatesAccountType.KEOUGH;
    } else if ("OTHER".equals(ofxVal)) {
      return UnitedStatesAccountType.OTHER;
    } else if ("SARSEP".equals(ofxVal)) {
      return UnitedStatesAccountType.SARSEP;
    } else if ("SIMPLE".equals(ofxVal)) {
      return UnitedStatesAccountType.SIMPLE;
    } else if ("NORMAL".equals(ofxVal)) {
      return UnitedStatesAccountType.NORMAL;
    } else if ("TDA".equals(ofxVal)) {
      return UnitedStatesAccountType.TDA;
    } else if ("TRUST".equals(ofxVal)) {
      return UnitedStatesAccountType.TRUST;
    } else if ("UGMA".equals(ofxVal)) {
      return UnitedStatesAccountType.UGMA;
    } else {
      return null;
    }
  }
};


module.exports = UnitedStatesAccountType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  AccountType: require("./AccountType"),
  ActivationStatus: require("./ActivationStatus"),
  InvestmentAccountDetails: require("./InvestmentAccountDetails"),
  InvestmentAccountInfo: require("./InvestmentAccountInfo"),
  SubAccountType: require("./SubAccountType"),
  UnitedStatesAccountType: require("./UnitedStatesAccountType"),
};

},{"./AccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/AccountType.js","./ActivationStatus":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/ActivationStatus.js","./InvestmentAccountDetails":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/InvestmentAccountDetails.js","./InvestmentAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/InvestmentAccountInfo.js","./SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./UnitedStatesAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/UnitedStatesAccountType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  accounts: require("./accounts/index"),
  positions: require("./positions/index"),
  statements: require("./statements/index"),
  transactions: require("./transactions/index"),
};

},{"./accounts/index":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/index.js","./positions/index":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/index.js","./statements/index":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/index.js","./transactions/index":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/index.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var SubAccountType = require("../accounts/SubAccountType");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var PositionType = require("./PositionType");
var Inv401KSource = require("./Inv401KSource");

/**
 * Base class for the various types of positions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all positions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 */
function BasePosition () {

  /**
   * @name BasePosition#investmentPosition
   * @type InvestmentPosition
   * @access private
   */
  this.investmentPosition = null;
}





/**
 * Gets the investment position child aggregate.
 *
 * @return {InvestmentPosition} the investment position child aggregate
 */
BasePosition.prototype.getInvestmentPosition = function() {
  return this.investmentPosition;
};
ChildAggregate.add({required: true, order: 10, owner: BasePosition, /*type: InvestmentPosition,*/ fcn: "getInvestmentPosition"});


/**
 * Sets the investment position child aggregate.
 *
 * @param {InvestmentPosition} investmentPosition the investment position child aggregate
 */
BasePosition.prototype.setInvestmentPosition = function(investmentPosition) {
  this.investmentPosition = investmentPosition;
};


/**
 * Gets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SecurityId} the security id for the position
 */
BasePosition.prototype.getSecurityId = function() {
  return this.getInvestmentPosition().getSecurityId();
};


/**
 * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the sub-account type
 */
BasePosition.prototype.getHeldInAccount = function() {
  return this.getInvestmentPosition().getHeldInAccount();
};


/**
 * Gets the sub-account type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SubAccountType} the sub-account type or null if it's not one of the well-known types
 */
BasePosition.prototype.getHeldInAccountEnum = function() {
  return SubAccountType.fromOfx(this.getHeldInAccount());
};


/**
 * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the position type
 */
BasePosition.prototype.getPositionType = function() {
  return this.getInvestmentPosition().getPositionType();
};


/**
 * Gets the position type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {PositionType} the position type or null if it's not one of the well-known types
 */
BasePosition.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(this.getPositionType());
};


/**
 * Gets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the number of units in the position
 */
BasePosition.prototype.getUnits = function() {
  return this.getInvestmentPosition().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BasePosition.prototype.getUnitPrice = function() {
  return this.getInvestmentPosition().getUnitPrice();
};


/**
 * Gets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the market value of the position
 */
BasePosition.prototype.getMarketValue = function() {
  return this.getInvestmentPosition().getMarketValue();
};


/**
 * Gets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Date} the market value date
 */
BasePosition.prototype.getMarketValueDate = function() {
  return this.getInvestmentPosition().getMarketValueDate();
};


/**
 * Gets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the currency code of the position or null for the default currency
 */
BasePosition.prototype.getCurrencyCode = function() {
  return this.getInvestmentPosition().getCurrencyCode();
};


/**
 * Gets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the memo
 */
BasePosition.prototype.getMemo = function() {
  return this.getInvestmentPosition().getMemo();
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
BasePosition.prototype.get401kSource = function() {
  return this.getInvestmentPosition().get401kSource();
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if it's not one of the well-known types
 */
BasePosition.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = BasePosition;

},{"../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./PositionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/PositionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/DebtPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var BasePosition = require("./BasePosition");

/**
 * Represents a debt position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function DebtPosition () {
}

inherit(DebtPosition, "extends", BasePosition);


Aggregate.add("POSDEBT", DebtPosition);




module.exports = DebtPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var Inv401KSource = {
  PRETAX: 0,
  AFTER_TAX: 1,
  MATCH: 2,
  PROFIT_SHARING: 3,
  ROLLOVER: 4,
  OTHER_VEST: 5,
  OTHER_NONVEST: 6,
  
  fromOfx: function(/*String*/ ofxVal) {
    if ("PRETAX".equals(ofxVal)) {
      return Inv401KSource.PRETAX;
    } else if ("AFTERTAX".equals(ofxVal)) {
      return Inv401KSource.AFTER_TAX;
    } else if ("MATCH".equals(ofxVal)) {
      return Inv401KSource.MATCH;
    } else if ("PROFITSHARING".equals(ofxVal)) {
      return Inv401KSource.PROFIT_SHARING;
    } else if ("ROLLOVER".equals(ofxVal)) {
      return Inv401KSource.ROLLOVER;
    } else if ("OTHERVEST".equals(ofxVal)) {
      return Inv401KSource.OTHER_VEST;
    } else if ("OTHERNONVEST".equals(ofxVal)) {
      return Inv401KSource.OTHER_NONVEST;
    } else {
      return null;
    }
  }
};


module.exports = Inv401KSource;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/InvestmentPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var PositionType = require("./PositionType");
var Inv401KSource = require("./Inv401KSource");

/**
 * Class for the investment position aggregate.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function InvestmentPosition () {

  /**
   * @name InvestmentPosition#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name InvestmentPosition#heldInAccount
   * @type String
   * @access private
   */
  this.heldInAccount = null;

  /**
   * @name InvestmentPosition#positionType
   * @type String
   * @access private
   */
  this.positionType = null;

  /**
   * @name InvestmentPosition#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name InvestmentPosition#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name InvestmentPosition#marketValue
   * @type Double
   * @access private
   */
  this.marketValue = null;

  /**
   * @name InvestmentPosition#marketValueDate
   * @type Date
   * @access private
   */
  this.marketValueDate = null;

  /**
   * @name InvestmentPosition#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name InvestmentPosition#memo
   * @type String
   * @access private
   */
  this.memo = null;

  /**
   * @name InvestmentPosition#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}



Aggregate.add("INVPOS", InvestmentPosition);


/**
 * Gets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SecurityId} the security id for the position
 */
InvestmentPosition.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 10, owner: InvestmentPosition, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {SecurityId} securityId the security id for the position
 */
InvestmentPosition.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the sub-account type
 */
InvestmentPosition.prototype.getHeldInAccount = function() {
  return this.heldInAccount;
};
Element.add({name: "HELDINACCT", required: true, order: 20, owner: InvestmentPosition, /*type: String,*/ fcn: "getHeldInAccount"});


/**
 * Sets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} heldInAccount the sub-account type
 */
InvestmentPosition.prototype.setHeldInAccount = function(heldInAccount) {
  this.heldInAccount = heldInAccount;
};


/**
 * Gets the sub-account type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SubAccountType} the sub-account type or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.getHeldInAccountEnum = function() {
  return SubAccountType.fromOfx(this.getHeldInAccount());
};


/**
 * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the position type
 */
InvestmentPosition.prototype.getPositionType = function() {
  return this.positionType;
};
Element.add({name: "POSTYPE", required: true, order: 30, owner: InvestmentPosition, /*type: String,*/ fcn: "getPositionType"});


/**
 * Sets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} positionType the position type
 */
InvestmentPosition.prototype.setPositionType = function(positionType) {
  this.positionType = positionType;
};


/**
 * Gets the position type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {PositionType} the position type or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(this.getPositionType());
};


/**
 * Gets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the number of units in the position
 */
InvestmentPosition.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 40, owner: InvestmentPosition, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} units the number of units in the position
 */
InvestmentPosition.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the per unit price
 */
InvestmentPosition.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 50, owner: InvestmentPosition, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
InvestmentPosition.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the market value of the position
 */
InvestmentPosition.prototype.getMarketValue = function() {
  return this.marketValue;
};
Element.add({name: "MKTVAL", required: true, order: 60, owner: InvestmentPosition, /*type: Double,*/ fcn: "getMarketValue"});


/**
 * Sets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} marketValue the market value of the position
 */
InvestmentPosition.prototype.setMarketValue = function(marketValue) {
  this.marketValue = marketValue;
};


/**
 * Gets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Date} the market value date
 */
InvestmentPosition.prototype.getMarketValueDate = function() {
  return this.marketValueDate;
};
Element.add({name: "DTPRICEASOF", required: true, order: 70, owner: InvestmentPosition, /*type: Date,*/ fcn: "getMarketValueDate"});


/**
 * Sets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Date} marketValueDate the market value date
 */
InvestmentPosition.prototype.setMarketValueDate = function(marketValueDate) {
  this.marketValueDate = marketValueDate;
};


/**
 * Gets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the currency code of the position or null for the default currency
 */
InvestmentPosition.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: InvestmentPosition, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} currencyCode the currency code of the position or null for the default currency
 */
InvestmentPosition.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * Gets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the memo
 */
InvestmentPosition.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 90, owner: InvestmentPosition, /*type: String,*/ fcn: "getMemo"});


/**
 * Sets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} memo the memo
 */
InvestmentPosition.prototype.setMemo = function(memo) {
  this.memo = memo;
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
InvestmentPosition.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 100, owner: InvestmentPosition, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
InvestmentPosition.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = InvestmentPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./PositionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/PositionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/InvestmentPositionList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Aggregate for a list of invesment positions.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @class
 */
function InvestmentPositionList () {

  /**
   * @name InvestmentPositionList#positions
   * @type List<BasePosition>
   * @access private
   */
  this.positions = null;
}



Aggregate.add("INVPOSLIST", InvestmentPositionList);


/**
 * Gets the list of positions
 *
 * @return {BasePosition[]} the list of positions
 */
InvestmentPositionList.prototype.getPositions = function() {
  return this.positions;
};
ChildAggregate.add({order: 10, owner: InvestmentPositionList, /*type: BasePosition[],*/ fcn: "getPositions"});


/**
 * Sets the list of positions.
 *
 * @param {BasePosition[]} positions the list of positions
 */
InvestmentPositionList.prototype.setPositions = function(positions) {
  this.positions = positions;
};




module.exports = InvestmentPositionList;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/MutualFundPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BasePosition = require("./BasePosition");

/**
 * Represents a mutual fund position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function MutualFundPosition () {

  /**
   * @name MutualFundPosition#unitsStreet
   * @type Double
   * @access private
   */
  this.unitsStreet = null;

  /**
   * @name MutualFundPosition#unitsUser
   * @type Double
   * @access private
   */
  this.unitsUser = null;

  /**
   * @name MutualFundPosition#reinvestDividends
   * @type Boolean
   * @access private
   */
  this.reinvestDividends = null;

  /**
   * @name MutualFundPosition#reinvestCapitalGains
   * @type Boolean
   * @access private
   */
  this.reinvestCapitalGains = null;
}

inherit(MutualFundPosition, "extends", BasePosition);


Aggregate.add("POSMF", MutualFundPosition);


/**
 * Gets the number of units in the financial insititution's street name.
 *
 * @return {Double} the number of units in the financial insititution's street name.
 */
MutualFundPosition.prototype.getUnitsStreet = function() {
  return this.unitsStreet;
};
Element.add({name: "UNITSSTREET", order: 20, owner: MutualFundPosition, /*type: Double,*/ fcn: "getUnitsStreet"});


/**
 * Sets the number of units in the financial insititution's street name.
 *
 * @param {Double} unitsStreet the number of units in the financial insititution's street name.
 */
MutualFundPosition.prototype.setUnitsStreet = function(unitsStreet) {
  this.unitsStreet = unitsStreet;
};


/**
 * Gets the number of units in the user's name.
 *
 * @return {Double} the number of units in the user's name.
 */
MutualFundPosition.prototype.getUnitsUser = function() {
  return this.unitsUser;
};
Element.add({name: "UNITSUSER", order: 30, owner: MutualFundPosition, /*type: Double,*/ fcn: "getUnitsUser"});


/**
 * Sets the number of units in the user's name.
 *
 * @param {Double} unitsUser the number of units in the user's name.
 */
MutualFundPosition.prototype.setUnitsUser = function(unitsUser) {
  this.unitsUser = unitsUser;
};


/**
 * Gets whether dividends are automatically reinvested.
 *
 * @return {Boolean} whether dividends are automatically reinvested
 */
MutualFundPosition.prototype.getReinvestDividends = function() {
  return this.reinvestDividends;
};
Element.add({name: "REINVDIV", order: 50, owner: MutualFundPosition, /*type: Boolean,*/ fcn: "getReinvestDividends"});


/**
 * Sets whether dividends are automatically reinvested.
 *
 * @param {Boolean} reinvestDividends whether dividends are automatically reinvested
 */
MutualFundPosition.prototype.setReinvestDividends = function(reinvestDividends) {
  this.reinvestDividends = reinvestDividends;
};


/**
 * Gets whether capital gains are automatically reinvested.
 *
 * @return {Boolean} whether capital gains are automatically reinvested
 */
MutualFundPosition.prototype.getReinvestCapitalGains = function() {
  return this.reinvestCapitalGains;
};
Element.add({name: "REINVCG", order: 60, owner: MutualFundPosition, /*type: Boolean,*/ fcn: "getReinvestCapitalGains"});


/**
 * Sets whether capital gains are automatically reinvested.
 *
 * @param {Boolean} reinvestCapitalGains whether capital gains are automatically reinvested
 */
MutualFundPosition.prototype.setReinvestCapitalGains = function(reinvestCapitalGains) {
  this.reinvestCapitalGains = reinvestCapitalGains;
};




module.exports = MutualFundPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/OptionsPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BasePosition = require("./BasePosition");
var ShortOptionSecurity = require("./ShortOptionSecurity");

/**
 * Represents an options position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function OptionsPosition () {

  /**
   * @name OptionsPosition#secured
   * @type String
   * @access private
   */
  this.secured = null;
}

inherit(OptionsPosition, "extends", BasePosition);


Aggregate.add("POSOPT", OptionsPosition);


/**
 * Gets how the options position is secured (for short positions).
 *
 * @return {String} how the options position is secured
 */
OptionsPosition.prototype.getSecured = function() {
  return this.secured;
};
Element.add({name: "SECURED", order: 20, owner: OptionsPosition, /*type: String,*/ fcn: "getSecured"});


/**
 * Sets how the options position is secured (for short positions).
 *
 * @param {String} secured how the options position is secured
 */
OptionsPosition.prototype.setSecured = function(secured) {
  this.secured = secured;
};


/**
 * Gets how the options position is secured as a well-known type.
 *
 * @return {ShortOptionSecurity} how the option position is secured or null if it's not a well-known type
 */
OptionsPosition.prototype.getSecuredEnum = function() {
  return ShortOptionSecurity.fromOfx(this.getSecured());
};




module.exports = OptionsPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js","./ShortOptionSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/ShortOptionSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/OtherPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var BasePosition = require("./BasePosition");

/**
 * Represents other types of positions.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function OtherPosition () {
}

inherit(OtherPosition, "extends", BasePosition);


Aggregate.add("POSOTHER", OtherPosition);




module.exports = OtherPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/PositionType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of position.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var PositionType = {
  LONG: 0,
  SHORT: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("LONG".equals(ofxVal)) {
      return PositionType.LONG;
    } else if ("SHORT".equals(ofxVal)) {
      return PositionType.SHORT;
    } else {
      return null;
    }
  }
};


module.exports = PositionType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/ShortOptionSecurity.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

/**
 * How a short option is secured.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var ShortOptionSecurity = {
  NAKED: 0,
  COVERED: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("NAKED".equals(ofxVal)) {
      return ShortOptionSecurity.NAKED;
    } else if ("COVERED".equals(ofxVal)) {
      return ShortOptionSecurity.COVERED;
    } else {
      return null;
    }
  }
};


module.exports = ShortOptionSecurity;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/StockPosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var BasePosition = require("./BasePosition");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Represents a stock position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function StockPosition () {

  /**
   * @name StockPosition#unitsStreet
   * @type Double
   * @access private
   */
  this.unitsStreet = null;

  /**
   * @name StockPosition#unitsUser
   * @type Double
   * @access private
   */
  this.unitsUser = null;

  /**
   * @name StockPosition#reinvestDividends
   * @type Boolean
   * @access private
   */
  this.reinvestDividends = null;
}

inherit(StockPosition, "extends", BasePosition);


Aggregate.add("POSSTOCK", StockPosition);


/**
 * Gets the number of units in the financial insititution's street name.
 *
 * @return {Double} the number of units in the financial insititution's street name.
 */
StockPosition.prototype.getUnitsStreet = function() {
  return this.unitsStreet;
};
Element.add({name: "UNITSSTREET", order: 20, owner: StockPosition, /*type: Double,*/ fcn: "getUnitsStreet"});


/**
 * Sets the number of units in the financial insititution's street name.
 *
 * @param {Double} unitsStreet the number of units in the financial insititution's street name.
 */
StockPosition.prototype.setUnitsStreet = function(unitsStreet) {
  this.unitsStreet = unitsStreet;
};


/**
 * Gets the number of units in the user's name.
 *
 * @return {Double} the number of units in the user's name.
 */
StockPosition.prototype.getUnitsUser = function() {
  return this.unitsUser;
};
Element.add({name: "UNITSUSER", order: 30, owner: StockPosition, /*type: Double,*/ fcn: "getUnitsUser"});


/**
 * Sets the number of units in the user's name.
 *
 * @param {Double} unitsUser the number of units in the user's name.
 */
StockPosition.prototype.setUnitsUser = function(unitsUser) {
  this.unitsUser = unitsUser;
};


/**
 * Gets whether dividends are automatically reinvested.
 *
 * @return {Boolean} whether dividends are automatically reinvested
 */
StockPosition.prototype.getReinvestDividends = function() {
  return this.reinvestDividends;
};
Element.add({name: "REINVDIV", order: 40, owner: StockPosition, /*type: Boolean,*/ fcn: "getReinvestDividends"});


/**
 * Sets whether dividends are automatically reinvested.
 *
 * @param {Boolean} reinvestDividends whether dividends are automatically reinvested
 */
StockPosition.prototype.setReinvestDividends = function(reinvestDividends) {
  this.reinvestDividends = reinvestDividends;
};




module.exports = StockPosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  BasePosition: require("./BasePosition"),
  DebtPosition: require("./DebtPosition"),
  Inv401KSource: require("./Inv401KSource"),
  InvestmentPosition: require("./InvestmentPosition"),
  InvestmentPositionList: require("./InvestmentPositionList"),
  MutualFundPosition: require("./MutualFundPosition"),
  OptionsPosition: require("./OptionsPosition"),
  OtherPosition: require("./OtherPosition"),
  PositionType: require("./PositionType"),
  ShortOptionSecurity: require("./ShortOptionSecurity"),
  StockPosition: require("./StockPosition")
};

},{"./BasePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/BasePosition.js","./DebtPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/DebtPosition.js","./Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./InvestmentPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/InvestmentPosition.js","./InvestmentPositionList":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/InvestmentPositionList.js","./MutualFundPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/MutualFundPosition.js","./OptionsPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/OptionsPosition.js","./OtherPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/OtherPosition.js","./PositionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/PositionType.js","./ShortOptionSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/ShortOptionSecurity.js","./StockPosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/StockPosition.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/BalanceList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Aggregate for the investment balance list.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @class
 */
function BalanceList () {

  /**
   * @name BalanceList#balanceRecords
   * @type List<BalanceRecord>
   * @access private
   */
  this.balanceRecords = null;
}



Aggregate.add("BALLIST", BalanceList);


/**
 * Gets the list of balance records.
 *
 * @return {BalanceRecord[]} the list of balance records.
 */
BalanceList.prototype.getBalanceRecords = function() {
  return this.balanceRecords;
};
ChildAggregate.add({order: 10, owner: BalanceList, /*type: BalanceRecord[],*/ fcn: "getBalanceRecords"});


/**
 * Sets the list of balance records.
 *
 * @param {BalanceRecord[]} balanceRecords the list of balance records.
 */
BalanceList.prototype.setBalanceRecords = function(balanceRecords) {
  this.balanceRecords = balanceRecords;
};




module.exports = BalanceList;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/IncludePosition.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");


/**
 * Aggreate to indicate whether position information is requested as part of the statement
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @class
 */
function IncludePosition () {

  /**
   * @name IncludePosition#sentDownDate
   * @type Date
   * @access private
   */
  this.sentDownDate = null;

  /**
   * @name IncludePosition#includePositions
   * @type Boolean
   * @access private
   */
  this.includePositions = Boolean.TRUE;
}



Aggregate.add("INCPOS", IncludePosition);


/**
 * Gets the date that the position should be sent down for. This is an optional field according
 * to the OFX spec.
 *
 * @return {Date} the date for the position
 */
IncludePosition.prototype.getDateSentDown = function() {
  return this.sentDownDate;
};
Element.add({name: "DTASOF", order: 0, owner: IncludePosition, /*type: Date,*/ fcn: "getDateSentDown"});


/**
 * Sets the date that the position should be sent down for. This is an optional field according
 * to the OFX spec.
 *
 * @param {Date} sentDownDate the date for the position
 */
IncludePosition.prototype.setDateSentDown = function(sentDownDate) {
  this.sentDownDate = sentDownDate;
};


/**
 * Gets whether to include positions in the statement download.
 *
 * @return {Boolean} whether to include positions in the statement download
 */
IncludePosition.prototype.getIncludePositions = function() {
  return this.includePositions;
};
Element.add({name: "INCLUDE", order: 10, owner: IncludePosition, /*type: Boolean,*/ fcn: "getIncludePositions"});


/**
 * Sets whether to include positions in the statement download.
 *
 * @param {Boolean} includePositions whether to include positions in the statement download
 */
IncludePosition.prototype.setIncludePositions = function(includePositions) {
  this.includePositions = includePositions;
};




module.exports = IncludePosition;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentBalance.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Aggregate for the investment balance.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @class
 */
function InvestmentBalance () {

  /**
   * @name InvestmentBalance#availableCash
   * @type Double
   * @access private
   */
  this.availableCash = null;

  /**
   * @name InvestmentBalance#marginBalance
   * @type Double
   * @access private
   */
  this.marginBalance = null;

  /**
   * @name InvestmentBalance#shortBalance
   * @type Double
   * @access private
   */
  this.shortBalance = null;

  /**
   * @name InvestmentBalance#buyingPower
   * @type Double
   * @access private
   */
  this.buyingPower = null;

  /**
   * @name InvestmentBalance#balanceList
   * @type BalanceList
   * @access private
   */
  this.balanceList = null;
}



Aggregate.add("INVBAL", InvestmentBalance);


/**
 * Gets the available cash balance across all sub-accounts, including sweep funds. This is
 * required field according to the OFX spec.
 *
 * @return {Double} the available cash balance
 */
InvestmentBalance.prototype.getAvailableCash = function() {
  return this.availableCash;
};
Element.add({name: "AVAILCASH", required: true, order: 10, owner: InvestmentBalance, /*type: Double,*/ fcn: "getAvailableCash"});


/**
 * Sets the available cash balance across all sub-accounts, including sweep funds. This is
 * required field according to the OFX spec.
 *
 * @param {Double} availableCash the available cash balance
 */
InvestmentBalance.prototype.setAvailableCash = function(availableCash) {
  this.availableCash = availableCash;
};


/**
 * Gets the margin account balance. A positive balance indicates a positive cash balance, while
 * a negative balance indicates the customer borrowed funds. This is a required field according
 * to the OFX spec.
 *
 * @return {Double} the margin account balance
 */
InvestmentBalance.prototype.getMarginBalance = function() {
  return this.marginBalance;
};
Element.add({name: "MARGINBALANCE", required: true, order: 20, owner: InvestmentBalance, /*type: Double,*/ fcn: "getMarginBalance"});


/**
 * Sets the margin account balance. A positive balance indicates a positive cash balance, while
 * a negative balance indicates the customer borrowed funds. This is a required field according
 * to the OFX spec.
 *
 * @param {Double} marginBalance the margin account balance
 */
InvestmentBalance.prototype.setMarginBalance = function(marginBalance) {
  this.marginBalance = marginBalance;
};


/**
 * Gets the market value of all short positions. This is a positive balance. This is a required
 * field according to the OFX spec.
 *
 * @return {Double} the market value of all short positions
 */
InvestmentBalance.prototype.getShortBalance = function() {
  return this.shortBalance;
};
Element.add({name: "SHORTBALANCE", required: true, order: 30, owner: InvestmentBalance, /*type: Double,*/ fcn: "getShortBalance"});


/**
 * Sets the market value of all short positions. This is a positive balance. This is a required
 * field according to the OFX spec.
 *
 * @param {Double} shortBalance the market value of all short positions
 */
InvestmentBalance.prototype.setShortBalance = function(shortBalance) {
  this.shortBalance = shortBalance;
};


/**
 * Gets the buying power amount. This is an optional field according to the OFX spec.
 *
 * @return {Double} the buying power
 */
InvestmentBalance.prototype.getBuyingPower = function() {
  return this.buyingPower;
};
Element.add({name: "BUYPOWER", order: 40, owner: InvestmentBalance, /*type: Double,*/ fcn: "getBuyingPower"});


/**
 * Sets the buying power amount. This is an optional field according to the OFX spec.
 *
 * @param {Double} buyingPower the buying power
 */
InvestmentBalance.prototype.setBuyingPower = function(buyingPower) {
  this.buyingPower = buyingPower;
};


/**
 * Gets the investment balance list. This is an optional field according to the OFX spec.
 *
 * @return {BalanceList} the investment balance list
 */
InvestmentBalance.prototype.getBalanceList = function() {
  return this.balanceList;
};
ChildAggregate.add({order: 50, owner: InvestmentBalance, /*type: BalanceList,*/ fcn: "getBalanceList"});


/**
 * Sets the investment balance list. This is an optional field according to the OFX spec.
 *
 * @param {BalanceList} balanceList the investment balance list
 */
InvestmentBalance.prototype.setBalanceList = function(balanceList) {
  this.balanceList = balanceList;
};




module.exports = InvestmentBalance;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var StatementRequest = require("../../common/StatementRequest");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Aggregate for the investment statement download request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @class
 * @augments StatementRequest
 */
function InvestmentStatementRequest () {

  /**
   * @name InvestmentStatementRequest#account
   * @type InvestmentAccountDetails
   * @access private
   */
  this.account = null;

  /**
   * @name InvestmentStatementRequest#includeOpenOrders
   * @type Boolean
   * @access private
   */
  this.includeOpenOrders = Boolean.FALSE;

  /**
   * @name InvestmentStatementRequest#includePosition
   * @type IncludePosition
   * @access private
   */
  this.includePosition = null;

  /**
   * @name InvestmentStatementRequest#includeBalance
   * @type Boolean
   * @access private
   */
  this.includeBalance = Boolean.TRUE;
}

inherit(InvestmentStatementRequest, "extends", StatementRequest);


Aggregate.add("INVSTMTRQ", InvestmentStatementRequest);


/**
 * The account details.
 *
 * @return {InvestmentAccountDetails} The account details.
 */
InvestmentStatementRequest.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name: "INVACCTFROM", required: true, order: 0, owner: InvestmentStatementRequest, /*type: InvestmentAccountDetails,*/ fcn: "getAccount"});


/**
 * The account details.
 *
 * @param {InvestmentAccountDetails} account The account details.
 */
InvestmentStatementRequest.prototype.setAccount = function(account) {
  this.account = account;
};


/**
 * Gets whether to include open orders. This is an optional field according to the OFX spec.
 * <br>
 * Note, open orders are not yet implemented.
 *
 * @return {Boolean} whether to include open orders
 */
InvestmentStatementRequest.prototype.getIncludeOpenOrders = function() {
  return this.includeOpenOrders;
};
Element.add({name: "INCOO", order: 20, owner: InvestmentStatementRequest, /*type: Boolean,*/ fcn: "getIncludeOpenOrders"});


/**
 * Sets whether to include open orders. This is an optional field according to the OFX spec.
 * <br>
 * Note, open orders are not yet implemented.
 *
 * @param {Boolean} includeOpenOrders whether to include open orders
 */
InvestmentStatementRequest.prototype.setIncludeOpenOrders = function(includeOpenOrders) {
  this.includeOpenOrders = includeOpenOrders;
};


/**
 * Gets the include position child aggregate. This is a required field according to the OFX spec.
 *
 * @return {IncludePosition} the include position child aggregate
 */
InvestmentStatementRequest.prototype.getIncludePosition = function() {
  return this.includePosition;
};
ChildAggregate.add({name: "INCPOS", required: true, order: 30, owner: InvestmentStatementRequest, /*type: IncludePosition,*/ fcn: "getIncludePosition"});


/**
 * Gets the include position child aggregate. This is a required field according to the OFX spec.
 *
 * @param {IncludePosition} includePosition the include position child aggregate
 */
InvestmentStatementRequest.prototype.setIncludePosition = function(includePosition) {
  this.includePosition = includePosition;
};


/**
 * Gets whether to include balance info in the response. This is a required field according to
 * the OFX spec.
 *
 * @return {Boolean} whether to include balance info in the response
 */
InvestmentStatementRequest.prototype.getIncludeBalance = function() {
  return this.includeBalance;
};
Element.add({name: "INCBAL", required: true, order: 40, owner: InvestmentStatementRequest, /*type: Boolean,*/ fcn: "getIncludeBalance"});


/**
 * Sets whether to include balance info in the response. This is a required field according to
 * the OFX spec.
 *
 * @param {Boolean} includeBalance whether to include balance info in the response
 */
InvestmentStatementRequest.prototype.setIncludeBalance = function(includeBalance) {
  this.includeBalance = includeBalance;
};




module.exports = InvestmentStatementRequest;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../common/StatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var MessageSetType = require("../../MessageSetType");
var RequestMessageSet = require("../../RequestMessageSet");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Investment statement request message set.
 * @see "Section 13.7.1.2.1, OFX Spec"
 *
 * @class
 * @augments RequestMessageSet
 */
function InvestmentStatementRequestMessageSet () {

  /**
   * @name InvestmentStatementRequestMessageSet#statementRequest
   * @type InvestmentStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(InvestmentStatementRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("INVSTMTMSGSRQV1", InvestmentStatementRequestMessageSet);


InvestmentStatementRequestMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the statement request.
 *
 * @return {InvestmentStatementRequestTransaction} the request
 */
InvestmentStatementRequestMessageSet.prototype.getStatementRequest = function() {
  return this.statementRequest;
};
ChildAggregate.add({order: 0, owner: InvestmentStatementRequestMessageSet, /*type: InvestmentStatementRequestTransaction,*/ fcn: "getStatementRequest"});


/**
 * Sets the statement request.
 *
 * @param {InvestmentStatementRequestTransaction} statementRequest the request
 */
InvestmentStatementRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
InvestmentStatementRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getStatementRequest() !== null) {
    requestMessages.push(this.getStatementRequest());
  }
  return requestMessages;
};




module.exports = InvestmentStatementRequestMessageSet;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var InvestmentStatementRequest = require("./InvestmentStatementRequest");
var TransactionWrappedRequestMessage = require("../../TransactionWrappedRequestMessage");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Investment statement transaction request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function InvestmentStatementRequestTransaction () {

  /**
   * @name InvestmentStatementRequestTransaction#message
   * @type InvestmentStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(InvestmentStatementRequestTransaction, "extends", new TransactionWrappedRequestMessage(InvestmentStatementRequest));


Aggregate.add("INVSTMTTRNRQ", InvestmentStatementRequestTransaction);


/**
 * Gets the the statement request message.
 *
 * @return {InvestmentStatementRequest} the statement request message.
 */
InvestmentStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: InvestmentStatementRequestTransaction, /*type: InvestmentStatementRequest,*/ fcn: "getMessage"});


/**
 * Sets the the statement request message.
 *
 * @param {InvestmentStatementRequest} message the statement request message.
 */
InvestmentStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
InvestmentStatementRequestTransaction.prototype.setWrappedMessage = function(/*InvestmentStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = InvestmentStatementRequestTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./InvestmentStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var StatementResponse = require("../../common/StatementResponse");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Aggregate for the investment statement download response.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @class
 * @augments StatementResponse
 */
function InvestmentStatementResponse () {

  /**
   * @name InvestmentStatementResponse#dateOfStatement
   * @type Date
   * @access private
   */
  this.dateOfStatement = null;

  /**
   * @name InvestmentStatementResponse#account
   * @type InvestmentAccountDetails
   * @access private
   */
  this.account = null;

  /**
   * @name InvestmentStatementResponse#transactionList
   * @type InvestmentTransactionList
   * @access private
   */
  this.transactionList = null;

  /**
   * @name InvestmentStatementResponse#positionList
   * @type InvestmentPositionList
   * @access private
   */
  this.positionList = null;

  /**
   * @name InvestmentStatementResponse#accountBalance
   * @type InvestmentBalance
   * @access private
   */
  this.accountBalance = null;

  /**
   * @name InvestmentStatementResponse#securityList
   * @type SecurityList
   * @access private
   */
  this.securityList = null;
}

inherit(InvestmentStatementResponse, "extends", StatementResponse);


Aggregate.add("INVSTMTRS", InvestmentStatementResponse);


/**
 * Gets the name of the response message.
 *
 * @return {String} the name of the response message
 */
// @Override
InvestmentStatementResponse.prototype.getResponseMessageName = function() {
  return "investment statement";
};


/**
 * Gets the date and time for the statement download. This is a required field according to the
 * OFX spec.
 *
 * @return {Date} the date and time for the statement download
 */
InvestmentStatementResponse.prototype.getDateOfStatement = function() {
  return this.dateOfStatement;
};
Element.add({name: "DTASOF", required: true, order: 60, owner: InvestmentStatementResponse, /*type: Date,*/ fcn: "getDateOfStatement"});


/**
 * Sets the date and time for the statement download. This is a required field according to the
 * OFX spec.
 *
 * @param {Date} dateOfStatement the date and time for the statement download
 */
InvestmentStatementResponse.prototype.setDateOfStatement = function(dateOfStatement) {
  this.dateOfStatement = dateOfStatement;
};


/**
 * Gets the account for the statement. This is a required field according to the OFX spec.
 *
 * @return {InvestmentAccountDetails} the account for the statement
 */
InvestmentStatementResponse.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name:"INVACCTFROM", required: true, order: 10, owner: InvestmentStatementResponse, /*type: InvestmentAccountDetails,*/ fcn: "getAccount"});


/**
 * Sets the account for the statement. This is a required field according to the OFX spec.
 *
 * @param {InvestmentAccountDetails} account the account for the statement
 */
InvestmentStatementResponse.prototype.setAccount = function(account) {
  this.account = account;
};


/**
 * Gets the transaction list aggregate. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentTransactionList} the transaction list aggregate
 */
InvestmentStatementResponse.prototype.getInvestmentTransactionList = function() {
  return this.transactionList;
};
ChildAggregate.add({order: 70, owner: InvestmentStatementResponse, /*type: InvestmentTransactionList,*/ fcn: "getInvestmentTransactionList"});


/**
 * Sets the transaction list aggregate. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentTransactionList} transactionList the transaction list aggregate
 */
InvestmentStatementResponse.prototype.setInvestmentTransactionList = function(transactionList) {
  this.transactionList = transactionList;
};


/**
 * Gets the position list aggreate. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentPositionList} the position list aggregate
 */
InvestmentStatementResponse.prototype.getPositionList = function() {
  return this.positionList;
};
ChildAggregate.add({order: 80, owner: InvestmentStatementResponse, /*type: InvestmentPositionList,*/ fcn: "getPositionList"});


/**
 * Sets the position list aggreate. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentPositionList} positionList the position list aggregate
 */
InvestmentStatementResponse.prototype.setPositionList = function(positionList) {
  this.positionList = positionList;
};


/**
 * Gets the account balance. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentBalance} the account balance
 */
InvestmentStatementResponse.prototype.getAccountBalance = function() {
  return this.accountBalance;
};
ChildAggregate.add({order: 90, owner: InvestmentStatementResponse, /*type: InvestmentBalance,*/ fcn: "getAccountBalance"});


/**
 * Sets the account balance. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentBalance} accountBalance the account balance
 */
InvestmentStatementResponse.prototype.setAccountBalance = function(accountBalance) {
  this.accountBalance = accountBalance;
};


/**
 * Gets the security list aggregate.
 * <br>
 * This is not actually technically part of the investment statement responsr aggregate, but
 * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
 * we provide it here for convenience.
 *
 * @return {SecurityList} the security list aggregate
 */
InvestmentStatementResponse.prototype.getSecurityList = function() {
  return this.securityList;
};


/**
 * Sets the security list aggregate.
 * <br>
 * This is not actually technically part of the investment statement responsr aggregate, but
 * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
 * we provide it here for convenience.
 *
 * @param {SecurityList} securityList the security list aggregate
 */
InvestmentStatementResponse.prototype.setSecurityList = function(securityList) {
  this.securityList = securityList;
};




module.exports = InvestmentStatementResponse;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../common/StatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var MessageSetType = require("../../MessageSetType");
var ResponseMessageSet = require("../../ResponseMessageSet");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Investment statement response message set.
 * @see "Section 13.7.1.2.2, OFX Spec"
 *
 * @class
 * @augments ResponseMessageSet
 */
function InvestmentStatementResponseMessageSet () {

  /**
   * @name InvestmentStatementResponseMessageSet#statementResponses
   * @type List<InvestmentStatementResponseTransaction>
   * @access private
   */
  this.statementResponses = null;
}

inherit(InvestmentStatementResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("INVSTMTMSGSRSV1", InvestmentStatementResponseMessageSet);


InvestmentStatementResponseMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the statement response list. Most OFX files have a single statement response.
 *
 * @return {InvestmentStatementResponseTransaction[]} the statement response list
 */
InvestmentStatementResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add({order: 0, owner: InvestmentStatementResponseMessageSet, /*type: InvestmentStatementResponseTransaction[],*/ fcn: "getStatementResponses"});


/**
 * Sets the statement reponse list. Most OFX files have a single statement response.
 *
 * @param {InvestmentStatementResponseTransaction[]} statementResponses the statement response list
 */
InvestmentStatementResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


/**
 * Gets the first statement response. Use getStatementResponses() if you are expecting multiple
 * responses.
 *
 * @return {InvestmentStatementResponseTransaction} the first investment statement response.
 */
InvestmentStatementResponseMessageSet.prototype.getStatementResponse = function() {
  return this.statementResponses === null || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


/**
 * Sets the statement response if there is a single response.
 *
 * @param {InvestmentStatementResponseTransaction} statementResponse The statement response.
 */
InvestmentStatementResponseMessageSet.prototype.setStatementResponse = function(statementResponse) {
  this.statementResponses = [statementResponse];
};


// Inherited.
InvestmentStatementResponseMessageSet.prototype.getResponseMessages = function() {
  return this.statementResponses;
};




module.exports = InvestmentStatementResponseMessageSet;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var TransactionWrappedResponseMessage = require("../../TransactionWrappedResponseMessage");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var InvestmentStatementResponse = require("./InvestmentStatementResponse");

/**
 * Investment statement transaction response.
 * @see "Section 13.9.2.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function InvestmentStatementResponseTransaction () {

  /**
   * @name InvestmentStatementResponseTransaction#message
   * @type InvestmentStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(InvestmentStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(InvestmentStatementResponse));


Aggregate.add("INVSTMTTRNRS", InvestmentStatementResponseTransaction);


/**
 * Gets the the statement response message.
 *
 * @return {InvestmentStatementResponse} the statement response message.
 */
InvestmentStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: InvestmentStatementResponseTransaction, /*type: InvestmentStatementResponse,*/ fcn: "getMessage"});


/**
 * Sets the the statement response message.
 *
 * @param {InvestmentStatementResponse} message the statement response message.
 */
InvestmentStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
InvestmentStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = InvestmentStatementResponseTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./InvestmentStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  BalanceList: require("./BalanceList"),
  IncludePosition: require("./IncludePosition"),
  InvestmentBalance: require("./InvestmentBalance"),
  InvestmentStatementRequest: require("./InvestmentStatementRequest"),
  InvestmentStatementRequestMessageSet: require("./InvestmentStatementRequestMessageSet"),
  InvestmentStatementRequestTransaction: require("./InvestmentStatementRequestTransaction"),
  InvestmentStatementResponse: require("./InvestmentStatementResponse"),
  InvestmentStatementResponseMessageSet: require("./InvestmentStatementResponseMessageSet"),
  InvestmentStatementResponseTransaction: require("./InvestmentStatementResponseTransaction")
};

},{"./BalanceList":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/BalanceList.js","./IncludePosition":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/IncludePosition.js","./InvestmentBalance":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentBalance.js","./InvestmentStatementRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequest.js","./InvestmentStatementRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequestMessageSet.js","./InvestmentStatementRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementRequestTransaction.js","./InvestmentStatementResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponse.js","./InvestmentStatementResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponseMessageSet.js","./InvestmentStatementResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/statements/InvestmentStatementResponseTransaction.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var BaseInvestmentTransaction = require("./BaseInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");


/**
 * Base class for all investment transactions for buying securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all buy investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 * @augments BaseInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function BaseBuyInvestmentTransaction (/*TransactionType*/ transactionType) {
  BaseInvestmentTransaction.call(this, transactionType);

  /**
   * @name BaseBuyInvestmentTransaction#buyInvestment
   * @type BuyInvestmentTransaction
   * @access private
   */
  this.buyInvestment = null;
}

inherit(BaseBuyInvestmentTransaction, "extends", BaseInvestmentTransaction);
inherit(BaseBuyInvestmentTransaction, "implements", TransactionWithSecurity);



/**
 * Gets the buy investment transaction child aggregate.
 *
 * @return {BuyInvestmentTransaction} the buy investment transaction child aggregate
 */
BaseBuyInvestmentTransaction.prototype.getBuyInvestment = function() {
  return this.buyInvestment;
};
ChildAggregate.add({order: 10, owner: BaseBuyInvestmentTransaction, /*type: BuyInvestmentTransaction,*/ fcn: "getBuyInvestment"});


/**
 * Sets the buy investment transaction child aggregate.
 *
 * @param {BuyInvestmentTransaction} buyInvestment the buy investment transaction child aggregate
 */
BaseBuyInvestmentTransaction.prototype.setBuyInvestment = function(buyInvestment) {
  this.buyInvestment = buyInvestment;
};


/**
 * Gets the investment transaction aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction aggregate
 */
// @Overridden
BaseBuyInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.getBuyInvestment().getInvestmentTransaction();
};


/**
 * Gets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BaseBuyInvestmentTransaction.prototype.getSecurityId = function() {
  return this.getBuyInvestment().getSecurityId();
};


/**
 * Gets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BaseBuyInvestmentTransaction.prototype.getUnits = function() {
  return this.getBuyInvestment().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseBuyInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.getBuyInvestment().getUnitPrice();
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markeup price
 */
BaseBuyInvestmentTransaction.prototype.getMarkup = function() {
  return this.getBuyInvestment().getMarkup();
};


/**
 * Gets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BaseBuyInvestmentTransaction.prototype.getCommission = function() {
  return this.getBuyInvestment().getCommission();
};


/**
 * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BaseBuyInvestmentTransaction.prototype.getTaxes = function() {
  return this.getBuyInvestment().getTaxes();
};


/**
 * Gets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BaseBuyInvestmentTransaction.prototype.getFees = function() {
  return this.getBuyInvestment().getFees();
};


/**
 * Gets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BaseBuyInvestmentTransaction.prototype.getLoad = function() {
  return this.getBuyInvestment().getLoad();
};


/**
 * Gets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + load + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BaseBuyInvestmentTransaction.prototype.getTotal = function() {
  return this.getBuyInvestment().getTotal();
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
BaseBuyInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.getBuyInvestment().getCurrencyCode();
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
BaseBuyInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.getBuyInvestment().getOriginalCurrencyInfo();
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.getBuyInvestment().getSubAccountSecurity();
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.getBuyInvestment().getSubAccountFund();
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type or null if it wasn't one of the well known types.
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};




module.exports = BaseBuyInvestmentTransaction;

},{"../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./BaseInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseInvestmentTransaction.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Base class for all investment transactions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 */
function BaseInvestmentTransaction (/*TransactionType*/ transactionType) {

  /**
   * @name BaseInvestmentTransaction#transactionType
   * @type TransactionType
   * @access private
   */
  this.transactionType = transactionType;
}




/**
 * Gets the type of transaction.
 *
 * @return {TransactionType} the type of transaction
 */
BaseInvestmentTransaction.prototype.getTransactionType = function() {
  return this.transactionType;
};


/**
 * Gets the {@link InvestmentTransaction} aggregate.
 *
 * @return {InvestmentTransaction} the {@link InvestmentTransaction} aggregate
 */
BaseInvestmentTransaction.prototype.getInvestmentTransaction = function() { throw new Error("Not implemented"); };

/**
 * Gets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the financial institution asssigned transaction id
 */
BaseInvestmentTransaction.prototype.getTransactionId = function() {
  return this.getInvestmentTransaction().getTransactionId();
};

/**
 * Gets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the server assigned transaction id
 */
BaseInvestmentTransaction.prototype.getServerId = function() {
  return this.getInvestmentTransaction().getServerId();
};

/**
 * Gets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
BaseInvestmentTransaction.prototype.getTradeDate = function() {
  return this.getInvestmentTransaction().getTradeDate();
};

/**
 * Gets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
BaseInvestmentTransaction.prototype.getSettlementDate = function() {
  return this.getInvestmentTransaction().getSettlementDate();
};

/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the transaction id of the transaction being reversed
 */
BaseInvestmentTransaction.prototype.getReversalTransactionId = function() {
  return this.getInvestmentTransaction().getReversalTransactionId();
};

/**
 * Gets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the memo
 */
BaseInvestmentTransaction.prototype.getMemo = function() {
  return this.getInvestmentTransaction().getMemo();
};




module.exports = BaseInvestmentTransaction;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var ChildAggregate = require("../../../../meta/ChildAggregate");
var BaseInvestmentTransaction = require("./BaseInvestmentTransaction");

/**
 * Base class for investment transactions that aren't buys or sales..
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 * @augments BaseInvestmentTransaction
 */
function BaseOtherInvestmentTransaction (/*TransactionType*/ transactionType) {
  BaseInvestmentTransaction.call(this, transactionType);

  /**
   * @name BaseOtherInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;
}

inherit(BaseOtherInvestmentTransaction, "extends", BaseInvestmentTransaction);




/**
 * Gets the {@link InvestmentTransaction} aggregate.
 *
 * @return {InvestmentTransaction} the {@link InvestmentTransaction} aggregate
 */
// @Override
BaseOtherInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.investmentTransaction;
};
ChildAggregate.add({order: 10, owner: BaseOtherInvestmentTransaction, /*type: InvestmentTransaction,*/ fcn: "getInvestmentTransaction"});


/**
 * Sets the {@link InvestmentTransaction} aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the {@link InvestmentTransaction} aggregate
 */
BaseOtherInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};




module.exports = BaseOtherInvestmentTransaction;

},{"../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseInvestmentTransaction.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Inv401KSource = require("../positions/Inv401KSource");
var SubAccountType = require("../accounts/SubAccountType");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var BaseInvestmentTransaction = require("./BaseInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");

/**
 * Base class for all investment transactions for selling securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all sell investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 * @augments BaseInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function BaseSellInvestmentTransaction (/*TransactionType*/ transactionType) {
  BaseInvestmentTransaction.call(this, transactionType);

  /**
   * @name BaseSellInvestmentTransaction#sellInvestment
   * @type SellInvestmentTransaction
   * @access private
   */
  this.sellInvestment = null;
}

inherit(BaseSellInvestmentTransaction, "extends", BaseInvestmentTransaction);
inherit(BaseSellInvestmentTransaction, "implements", TransactionWithSecurity);




BaseSellInvestmentTransaction.prototype.BaseSellInvestmentTransaction = function(/*TransactionType*/ transactionType) {
  super(transactionType);
};


/**
 * Gets the sell investment transaction child aggregate.
 *
 * @return {SellInvestmentTransaction} the sell investment transaction child aggregate
 */
// @Override
BaseSellInvestmentTransaction.prototype.getSellInvestment = function() {
  return this.sellInvestment;
};
ChildAggregate.add({order: 10, owner: BaseSellInvestmentTransaction, /*type: SellInvestmentTransaction,*/ fcn: "getSellInvestment"});


/**
 * Sets the sell investment transaction child aggregate.
 *
 * @param {SellInvestmentTransaction} sellInvestment the sell investment transaction child aggregate
 */
BaseSellInvestmentTransaction.prototype.setSellInvestment = function(sellInvestment) {
  this.sellInvestment = sellInvestment;
};


/**
 * Gets the investment transaction aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction aggregate
 */
// @Overridden
BaseSellInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.getSellInvestment().getInvestmentTransaction();
};


/**
 * Gets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BaseSellInvestmentTransaction.prototype.getSecurityId = function() {
  return this.getSellInvestment().getSecurityId();
};


/**
 * Gets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BaseSellInvestmentTransaction.prototype.getUnits = function() {
  return this.getSellInvestment().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseSellInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.getSellInvestment().getUnitPrice();
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markedown price
 */
BaseSellInvestmentTransaction.prototype.getMarkdown = function() {
  return this.getSellInvestment().getMarkdown();
};


/**
 * Gets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BaseSellInvestmentTransaction.prototype.getCommission = function() {
  return this.getSellInvestment().getCommission();
};


/**
 * Gets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BaseSellInvestmentTransaction.prototype.getTaxes = function() {
  return this.getSellInvestment().getTaxes();
};


/**
 * Gets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BaseSellInvestmentTransaction.prototype.getFees = function() {
  return this.getSellInvestment().getFees();
};


/**
 * Gets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BaseSellInvestmentTransaction.prototype.getLoad = function() {
  return this.getSellInvestment().getLoad();
};


/**
 * Gets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the withholding
 */
BaseSellInvestmentTransaction.prototype.getWithholding = function() {
  return this.getSellInvestment().getWithholding();
};


/**
 * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
BaseSellInvestmentTransaction.prototype.getTaxExempt = function() {
  return this.getSellInvestment().getTaxExempt();
};


/**
 * Gets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BaseSellInvestmentTransaction.prototype.getTotal = function() {
  return this.getSellInvestment().getTotal();
};


/**
 * Gets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the gain for the sale
 */
BaseSellInvestmentTransaction.prototype.getGain = function() {
  return this.getSellInvestment().getGain();
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
BaseSellInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.getSellInvestment().getCurrencyCode();
};


/**
 * Gets the origianl currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the currency info for the transaction.
 */
BaseSellInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.getSellInvestment().getOriginalCurrencyInfo();
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BaseSellInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.getSellInvestment().getSubAccountSecurity();
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BaseSellInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money went to  (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BaseSellInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.getSellInvestment().getSubAccountFund();
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BaseSellInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the loan id
 */
BaseSellInvestmentTransaction.prototype.getLoadId = function() {
  return this.getSellInvestment().getLoanId();
};


/**
 * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
BaseSellInvestmentTransaction.prototype.getStateWithholding = function() {
  return this.getSellInvestment().getStateWithholding();
};


/**
 * Gets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
BaseSellInvestmentTransaction.prototype.getPenalty = function() {
  return this.getSellInvestment().getPenalty();
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
BaseSellInvestmentTransaction.prototype.get401kSource = function() {
  return this.getSellInvestment().get401kSource();
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
BaseSellInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = BaseSellInvestmentTransaction;

},{"../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseInvestmentTransaction.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyDebtTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for buying debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyDebtTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_DEBT);

  /**
   * @name BuyDebtTransaction#accruedInterest
   * @type Double
   * @access private
   */
  this.accruedInterest = null;
}

inherit(BuyDebtTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYDEBT", BuyDebtTransaction);




/**
 * Gets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the amount of accrued interest
 */
BuyDebtTransaction.prototype.getAccruedInterest = function() {
  return this.accruedInterest;
};
Element.add({name: "ACCRDINT", order: 20, owner: BuyDebtTransaction, /*type: Double,*/ fcn: "getAccruedInterest"});


/**
 * Sets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} accruedInterest the amount of accrued interest
 */
BuyDebtTransaction.prototype.setAccruedInterest = function(accruedInterest) {
  this.accruedInterest = accruedInterest;
};




module.exports = BuyDebtTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Buy investment transaction aggregate ("INVBUY").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @class
 */
function BuyInvestmentTransaction () {

  /**
   * @name BuyInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;

  /**
   * @name BuyInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name BuyInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name BuyInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name BuyInvestmentTransaction#markup
   * @type Double
   * @access private
   */
  this.markup = null;

  /**
   * @name BuyInvestmentTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name BuyInvestmentTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name BuyInvestmentTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name BuyInvestmentTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name BuyInvestmentTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name BuyInvestmentTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name BuyInvestmentTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name BuyInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name BuyInvestmentTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;
}



Aggregate.add("INVBUY", BuyInvestmentTransaction);


/**
 * Gets the investment transaction child aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction child aggregate
 */
BuyInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.investmentTransaction;
};
ChildAggregate.add({order: 10, owner: BuyInvestmentTransaction, /*type: InvestmentTransaction,*/ fcn: "getInvestmentTransaction"});


/**
 * Sets the investment transaction child aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the investment transaction child aggregate
 */
BuyInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};


/**
 * Gets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BuyInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: BuyInvestmentTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was bought
 */
BuyInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BuyInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 30, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units purchased.
 */
BuyInvestmentTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BuyInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 40, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
BuyInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markeup price
 */
BuyInvestmentTransaction.prototype.getMarkup = function() {
  return this.markup;
};
Element.add({name: "MARKUP", order: 50, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getMarkup"});


/**
 * Sets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} markup the per unit markeup price
 */
BuyInvestmentTransaction.prototype.setMarkup = function(markup) {
  this.markup = markup;
};


/**
 * Gets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BuyInvestmentTransaction.prototype.getCommission = function() {
  return this.commission;
};
Element.add({name: "COMMISSION", order: 60, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getCommission"});


/**
 * Sets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
BuyInvestmentTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BuyInvestmentTransaction.prototype.getTaxes = function() {
  return this.taxes;
};
Element.add({name: "TAXES", order: 70, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getTaxes"});


/**
 * Sets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
BuyInvestmentTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BuyInvestmentTransaction.prototype.getFees = function() {
  return this.fees;
};
Element.add({name: "FEES", order: 80, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getFees"});


/**
 * Sets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
BuyInvestmentTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BuyInvestmentTransaction.prototype.getLoad = function() {
  return this.load;
};
Element.add({name: "LOAD", order: 90, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getLoad"});


/**
 * Sets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
BuyInvestmentTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BuyInvestmentTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 100, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
BuyInvestmentTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
BuyInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info may be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction.
 */
BuyInvestmentTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
BuyInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
ChildAggregate.add({order: 120, owner: BuyInvestmentTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
BuyInvestmentTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


 /**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BuyInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 130, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
  * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @param {String} subAccountSecurity the sub account type
  */
BuyInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BuyInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BuyInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 140, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAcctFund the sub account fund
 */
BuyInvestmentTransaction.prototype.setSubAccountFund = function(subAcctFund) {
  this.subAccountFund = subAcctFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type or null if it wasn't one of the well known types.
 */
BuyInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};




module.exports = BuyInvestmentTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyMutualFundTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var TransactionType = require("./TransactionType");
var BuyType = require("./BuyType");

/**
 * Transaction for buying mutual funds.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyMutualFundTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_MUTUAL_FUND);

  /**
   * @name BuyMutualFundTransaction#buyType
   * @type String
   * @access private
   */
  this.buyType = null;

  /**
   * @name BuyMutualFundTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;
}

inherit(BuyMutualFundTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYMF", BuyMutualFundTransaction);



/**
 * Gets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the buy type
 */
BuyMutualFundTransaction.prototype.getBuyType = function() {
  return this.buyType;
};
Element.add({name: "BUYTYPE", required: true, order: 20, owner: BuyMutualFundTransaction, /*type: String,*/ fcn: "getBuyType"});


/**
 * Sets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} buyType the buy type
 */
BuyMutualFundTransaction.prototype.setBuyType = function(buyType) {
  this.buyType = buyType;
};


/**
 * Gets the buy type as one of the well-known types.
 *
 * @return {BuyType} the type of purchase or null if it's not known
 */
BuyMutualFundTransaction.prototype.getBuyTypeEnum = function() {
  return BuyType.fromOfx(this.buyType);
};


/**
 * Gets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
BuyMutualFundTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 30, owner: BuyMutualFundTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
BuyMutualFundTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};




module.exports = BuyMutualFundTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./BuyType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyOptionTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var TransactionType = require("./TransactionType");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var OptionBuyType = require("./OptionBuyType");

/**
 * Transaction for buying options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyOptionTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_OPTION);

  /**
   * @name BuyOptionTransaction#optionBuyType
   * @type String
   * @access private
   */
  this.optionBuyType = null;

  /**
   * @name BuyOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;
}

inherit(BuyOptionTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYOPT", BuyOptionTransaction);



/**
 * Gets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option buy type
 */
BuyOptionTransaction.prototype.getOptionBuyType = function() {
  return this.optionBuyType;
};
Element.add({name: "OPTBUYTYPE", required: true, order: 20, owner: BuyOptionTransaction, /*type: String,*/ fcn: "getOptionBuyType"});


/**
 * Sets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionBuyType the option buy type
 */
BuyOptionTransaction.prototype.setOptionBuyType = function(optionBuyType) {
  this.optionBuyType = optionBuyType;
};


/**
 * Gets the option buy type as one of the well-known types.
 *
 * @return {OptionBuyType} the type of purchase or null if it's not known
 */
BuyOptionTransaction.prototype.getOptionBuyTypeEnum = function() {
  return OptionBuyType.fromOfx(this.optionBuyType);
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
BuyOptionTransaction.prototype.getSharesPerContract = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", required: true, order: 30, owner: BuyOptionTransaction, /*type: Integer,*/ fcn: "getSharesPerContract"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
BuyOptionTransaction.prototype.setSharesPerContract = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};




module.exports = BuyOptionTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./OptionBuyType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionBuyType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyOtherTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for buying other types of securities.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyOtherTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_OTHER);
}

inherit(BuyOtherTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYOTHER", BuyOtherTransaction);



module.exports = BuyOtherTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyStockTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var TransactionType = require("./TransactionType");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var BuyType = require("./BuyType");

/**
 * Transaction for buying stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyStockTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_STOCK);

  /**
   * @name BuyStockTransaction#buyType
   * @type String
   * @access private
   */
  this.buyType = null;
}

inherit(BuyStockTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYSTOCK", BuyStockTransaction);



/**
 * Gets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the buy type
 */
BuyStockTransaction.prototype.getBuyType = function() {
  return this.buyType;
};
Element.add({name: "BUYTYPE", required: true, order: 20, owner: BuyStockTransaction, /*type: String,*/ fcn: "getBuyType"});


/**
 * Sets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} buyType the buy type
 */
BuyStockTransaction.prototype.setBuyType = function(buyType) {
  this.buyType = buyType;
};


/**
 * Gets the buy type as one of the well-known types.
 *
 * @return {BuyType} the type of purchase or null if it's not well known
 */
BuyStockTransaction.prototype.getBuyTypeEnum = function() {
  return BuyType.fromOfx(this.buyType);
};




module.exports = BuyStockTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./BuyType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of purchase for stocks and mutual funds.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var BuyType = {
  BUY: 0,
  BUY_TO_COVER: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("BUY".equals(ofxVal)) {
      return BuyType.BUY;
    } else if ("BUYTOCOVER".equals(ofxVal)) {
      return BuyType.BUY_TO_COVER;
    } else {
      return null;
    }
  }
};


module.exports = BuyType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/CloseOptionAction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of action for closing a stock option.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var CloseOptionAction = {
  EXERCISE: 0,
  ASSIGN: 1,
  EXPIRE: 2,

  fromOfx: function(/*String*/ ofxVal) {
    if ("EXERCISE".equals(ofxVal)) {
      return CloseOptionAction.EXERCISE;
    } else if ("ASSIGN".equals(ofxVal)) {
      return CloseOptionAction.ASSIGN;
    } else if ("EXPIRE".equals(ofxVal)) {
      return CloseOptionAction.EXPIRE;
    } else {
      return null;
    }
  }
};


module.exports = CloseOptionAction;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/CloseOptionTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");
var CloseOptionAction = require("./CloseOptionAction");


/**
 * Transaction for closing an option position due to expiration, exercise, or assignment.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function CloseOptionTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.CLOSE_OPTION);
  
  /**
   * @name CloseOptionTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name CloseOptionTransaction#optionAction
   * @type String
   * @access private
   */
  this.optionAction = null;

  /**
   * @name CloseOptionTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name CloseOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name CloseOptionTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name CloseOptionTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;

  /**
   * @name CloseOptionTransaction#gain
   * @type Double
   * @access private
   */
  this.gain = null;
}

inherit(CloseOptionTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(CloseOptionTransaction, "implements", TransactionWithSecurity);


Aggregate.add("CLOSUREOPT", CloseOptionTransaction);




/**
 * Gets the security id of the option.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {SecurityId} the security id of the option
 */
CloseOptionTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({order: 20, owner: CloseOptionTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the security id of the option.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the option
 */
CloseOptionTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option action
 */
CloseOptionTransaction.prototype.getOptionAction = function() {
  return this.optionAction;
};
Element.add({name: "OPTACTION", required: true, order: 30, owner: CloseOptionTransaction, /*type: String,*/ fcn: "getOptionAction"});


/**
 * Sets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionAction the option action
 */
CloseOptionTransaction.prototype.setOptionAction = function(optionAction) {
  this.optionAction = optionAction;
};


/**
 * Gets the action as one of the well-known types.
 *
 * @return {CloseOptionAction} the type of close or null if it's not a well-known type
 */
CloseOptionTransaction.prototype.getOptionActionEnum = function() {
  return CloseOptionAction.fromOfx(this.getOptionAction());
};


/**
 * Gets the number of units of the option that were closed. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the number of units closed
 */
CloseOptionTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 40, owner: CloseOptionTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the option that were closed. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} units the number of units closed
 */
CloseOptionTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
CloseOptionTransaction.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", required: true, order: 50, owner: CloseOptionTransaction, /*type: Integer,*/ fcn: "getSharesPerContact"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
CloseOptionTransaction.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
CloseOptionTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", required: true, order: 60, owner: CloseOptionTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
CloseOptionTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
CloseOptionTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the related transaction id for the related buy or sell corresponding to the
 * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
 * action or EXERCISE or ASSIGN.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
CloseOptionTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 70, owner: CloseOptionTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets the related transaction id for the related buy or sell corresponding to the
 * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
 * action or EXERCISE or ASSIGN.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
CloseOptionTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};


/**
 * Gets the gain related to the transaction. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the gain related to the transaction
 */
CloseOptionTransaction.prototype.getGain = function() {
  return this.gain;
};
Element.add({name: "GAIN", order: 80, owner: CloseOptionTransaction, /*type: Double,*/ fcn: "getGain"});


/**
 * Sets the gain related to the transaction. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} gain the gain related to the transaction
 */
CloseOptionTransaction.prototype.setGain = function(gain) {
  this.gain = gain;
};




module.exports = CloseOptionTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./CloseOptionAction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/CloseOptionAction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");
var IncomeType = require("./IncomeType");

/**
 * Transaction for investment income that is realized as cash into the investment account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function IncomeTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.INCOME);

  /**
   * @name IncomeTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name IncomeTransaction#incomeType
   * @type String
   * @access private
   */
  this.incomeType = null;

  /**
   * @name IncomeTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name IncomeTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name IncomeTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name IncomeTransaction#taxExempt
   * @type Boolean
   * @access private
   */
  this.taxExempt = null;

  /**
   * @name IncomeTransaction#withholding
   * @type Double
   * @access private
   */
  this.withholding = null;

  /**
   * @name IncomeTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name IncomeTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name IncomeTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(IncomeTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(IncomeTransaction, "implements", TransactionWithSecurity);


Aggregate.add("INCOME", IncomeTransaction);



/**
 * Gets the id of the security that the income was for. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that the income was for
 */
IncomeTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: IncomeTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that the income was for. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that the income was for
 */
IncomeTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC>
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @return {String} the type of income
 */
IncomeTransaction.prototype.getIncomeType = function() {
  return this.incomeType;
};
Element.add({name: "INCOMETYPE", required: true, order: 30, owner: IncomeTransaction, /*type: String,*/ fcn: "getIncomeType"});


/**
 * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC>
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @param {String} incomeType the type of income
 */
IncomeTransaction.prototype.setIncomeType = function(incomeType) {
  this.incomeType = incomeType;
};


/**
 * Gets the income type as one of the well-known types.
 *
 * @return {IncomeType} the income type or null if it's not well known
 */
IncomeTransaction.prototype.getIncomeTypeEnum = function() {
  return IncomeType.fromOfx(this.getIncomeType());
};


/**
 * Gets the total income received.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
IncomeTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 40, owner: IncomeTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total income received.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
IncomeTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
IncomeTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 50, owner: IncomeTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAcctSec the sub account type
 */
IncomeTransaction.prototype.setSubAccountSecurity = function(subAcctSec) {
  this.subAccountSecurity = subAcctSec;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
IncomeTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund for the transaction
 */
IncomeTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 60, owner: IncomeTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAcctFund the sub account fund for the transaction
 */
IncomeTransaction.prototype.setSubAccountFund = function(subAcctFund) {
  this.subAccountFund = subAcctFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
IncomeTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
IncomeTransaction.prototype.getTaxExempt = function() {
  return this.taxExempt;
};
Element.add({name: "TAXEXEMPT", order: 70, owner: IncomeTransaction, /*type: Boolean,*/ fcn: "getTaxExempt"});


/**
 * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Boolean} taxExempt whether the transaction was tax exempt
 */
IncomeTransaction.prototype.setTaxExempt = function(taxExempt) {
  this.taxExempt = taxExempt;
};


/**
 * Gets the withholding for the income. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the withholding
 */
IncomeTransaction.prototype.getWithholding = function() {
  return this.withholding;
};
Element.add({name: "WITHHOLDING", order: 80, owner: IncomeTransaction, /*type: Double,*/ fcn: "getWithholding"});


/**
 * Sets the withholding for the income. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} withholding the withholding
 */
IncomeTransaction.prototype.setWithholding = function(withholding) {
  this.withholding = withholding;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
IncomeTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 90, owner: IncomeTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
IncomeTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the currency info for the transaction
 */
IncomeTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
ChildAggregate.add({order: 120, owner: IncomeTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the currency info for the transaction
 */
IncomeTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
IncomeTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 110, owner: IncomeTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
IncomeTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known.
 */
IncomeTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = IncomeTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./IncomeType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of income.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var IncomeType = {
  LONG_TERM_CAP_GAINS: 0,
  SHORT_TERM_CAP_GAINS: 1,
  DIVIDEND: 2,
  INTEREST: 3,
  MISC: 4,

  fromOfx: function(/*String*/ ofxVal) {
    if ("CGLONG".equals(ofxVal)) {
      return IncomeType.LONG_TERM_CAP_GAINS;
    } else if ("CGSHORT".equals(ofxVal)) {
      return IncomeType.SHORT_TERM_CAP_GAINS;
    } else if ("DIV".equals(ofxVal)) {
      return IncomeType.DIVIDEND;
    } else if ("INTEREST".equals(ofxVal)) {
      return IncomeType.INTEREST;
    } else if ("MISC".equals(ofxVal)) {
      return IncomeType.MISC;
    } else {
      return null;
    }
  }
};


module.exports = IncomeType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentBankTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Bank transactions that are part of an investment account statement. Wraps a {@link Transaction}.
 * @see "Section 13.9.2.3, OFX Spec"
 *
 * @class
 */
function InvestmentBankTransaction () {

  /**
   * @name InvestmentBankTransaction#transaction
   * @type Transaction
   * @access private
   */
  this.transaction = null;

  /**
   * @name InvestmentBankTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;
}



Aggregate.add("INVBANKTRAN", InvestmentBankTransaction);


/**
 * Gets the wrapped transaction aggregate.
 * @return {Transaction} the wrapped transaction
 */
InvestmentBankTransaction.prototype.getTransaction = function() {
  return this.transaction;
};
ChildAggregate.add({order: 10, owner: InvestmentBankTransaction, /*type: Transaction,*/ fcn: "getTransaction"});


/**
 * Sets the wrapped transaction aggregate.
 * @param {Transaction} transaction the wrapped transaction
 */
InvestmentBankTransaction.prototype.setTransaction = function(transaction) {
  this.transaction = transaction;
};


/**
 * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @return {String} the sub account fund for the transaction
 */
InvestmentBankTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", required: true, order: 20, owner: InvestmentBankTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund for the transaction
 */
InvestmentBankTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
InvestmentBankTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};




module.exports = InvestmentBankTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentExpenseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for an investment expense
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function InvestmentExpenseTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.INVESTMENT_EXPENSE);

  /**
   * @name InvestmentExpenseTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name InvestmentExpenseTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name InvestmentExpenseTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name InvestmentExpenseTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name InvestmentExpenseTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name InvestmentExpenseTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name InvestmentExpenseTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(InvestmentExpenseTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("INVEXPENSE", InvestmentExpenseTransaction);



/**
 * Gets the id of the security for the expense. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security for the expsense
 */
InvestmentExpenseTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: InvestmentExpenseTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security for the expense. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security for the expsense
 */
InvestmentExpenseTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the total for the expense.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
InvestmentExpenseTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 30, owner: InvestmentExpenseTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the expense.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
InvestmentExpenseTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
InvestmentExpenseTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 40, owner: InvestmentExpenseTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
InvestmentExpenseTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
InvestmentExpenseTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
InvestmentExpenseTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 50, owner: InvestmentExpenseTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
InvestmentExpenseTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
InvestmentExpenseTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
InvestmentExpenseTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 60, owner: InvestmentExpenseTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
InvestmentExpenseTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
InvestmentExpenseTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 70, owner: InvestmentExpenseTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
InvestmentExpenseTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
InvestmentExpenseTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 180, owner: InvestmentExpenseTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
InvestmentExpenseTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
InvestmentExpenseTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = InvestmentExpenseTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Investment transaction aggregate ("INVTRAN").
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @class
 */
function InvestmentTransaction () {

  /**
   * @name InvestmentTransaction#transactionId
   * @type String
   * @access private
   */
  this.transactionId = null;

  /**
   * @name InvestmentTransaction#serverId
   * @type String
   * @access private
   */
  this.serverId = null;

  /**
   * @name InvestmentTransaction#tradeDate
   * @type Date
   * @access private
   */
  this.tradeDate = null;

  /**
   * @name InvestmentTransaction#settlementDate
   * @type Date
   * @access private
   */
  this.settlementDate = null;

  /**
   * @name InvestmentTransaction#reversalTransactionId
   * @type String
   * @access private
   */
  this.reversalTransactionId = null;

  /**
   * @name InvestmentTransaction#memo
   * @type String
   * @access private
   */
  this.memo = null;
}



Aggregate.add("INVTRAN", InvestmentTransaction);


/**
 * Gets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the financial institution asssigned transaction id
 */
InvestmentTransaction.prototype.getTransactionId = function() {
  return this.transactionId;
};
Element.add({name: "FITID", required: true, order: 0, owner: InvestmentTransaction, /*type: String,*/ fcn: "getTransactionId"});


/**
 * Sets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} transactionId the financial institution asssigned transaction id
 */
InvestmentTransaction.prototype.setTransactionId = function(transactionId) {
  this.transactionId = transactionId;
};


/**
 * Gets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the server assigned transaction id
 */
InvestmentTransaction.prototype.getServerId = function() {
  return this.serverId;
};
Element.add({name: "SRVRTID", order: 10, owner: InvestmentTransaction, /*type: String,*/ fcn: "getServerId"});


/**
 * Sets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} serverId the server assigned transaction id
 */
InvestmentTransaction.prototype.setServerId = function(serverId) {
  this.serverId = serverId;
};


/**
 * Gets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
InvestmentTransaction.prototype.getTradeDate = function() {
  return this.tradeDate;
};
Element.add({name: "DTTRADE", required: true, order: 20, owner: InvestmentTransaction, /*type: Date,*/ fcn: "getTradeDate"});


/**
 * Sets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {Date} tradeDate the trade date
 */
InvestmentTransaction.prototype.setTradeDate = function(tradeDate) {
  this.tradeDate = tradeDate;
};


/**
 * Gets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
InvestmentTransaction.prototype.getSettlementDate = function() {
  return this.settlementDate;
};
Element.add({name: "DTSETTLE", order: 30, owner: InvestmentTransaction, /*type: Date,*/ fcn: "getSettlementDate"});


/**
 * Sets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {Date} settlementDate the trade date
 */
InvestmentTransaction.prototype.setSettlementDate = function(settlementDate) {
  this.settlementDate = settlementDate;
};


/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the transaction id of the transaction being reversed
 */
InvestmentTransaction.prototype.getReversalTransactionId = function() {
  return this.reversalTransactionId;
};
Element.add({name: "REVERSALFITID", order: 40, owner: InvestmentTransaction, /*type: String,*/ fcn: "getReversalTransactionId"});


/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} reversalTransactionId the transaction id of the transaction being reversed
 */
InvestmentTransaction.prototype.setReversalTransactionId = function(reversalTransactionId) {
  this.reversalTransactionId = reversalTransactionId;
};


/**
 * Gets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the memo
 */
InvestmentTransaction.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 50, owner: InvestmentTransaction, /*type: String,*/ fcn: "getMemo"});


/**
 * Sets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} memo the memo
 */
InvestmentTransaction.prototype.setMemo = function(memo) {
  this.memo = memo;
};




module.exports = InvestmentTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentTransactionList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * The transaction list aggregate.
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @class
 */
function InvestmentTransactionList () {

  /**
   * @name InvestmentTransactionList#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name InvestmentTransactionList#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name InvestmentTransactionList#transactions
   * @type List<BaseInvestmentTransaction>
   * @access private
   */
  this.transactions = null;

  /**
   * @name InvestmentTransactionList#bankTransactions
   * @type List<InvestmentBankTransaction>
   * @access private
   */
  this.bankTransactions = null;
}



Aggregate.add("INVTRANLIST", InvestmentTransactionList);


/**
 * Gets the start date. This is a required field according to the OFX spec.
 *
 * @return {Date} The start date
 */
InvestmentTransactionList.prototype.getStart = function() {
  return this.start;
};
Element.add({name: "DTSTART", required: true, order: 0, owner: InvestmentTransactionList, /*type: Date,*/ fcn: "getStart"});


/**
 * Sets the start date. This is a required field according to the OFX spec.
 *
 * @param {Date} start The start date
 */
InvestmentTransactionList.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * Gets the end date. This is a required field according to the OFX spec.
 *
 * @return {Date} he end date
 */
InvestmentTransactionList.prototype.getEnd = function() {
  return this.end;
};
Element.add({name: "DTEND", required: true, order: 10, owner: InvestmentTransactionList, /*type: Date,*/ fcn: "getEnd"});


/**
 * Sets the end date. This is a required field according to the OFX spec.
 *
 * @param {Date} end the end date
 */
InvestmentTransactionList.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * Gets the investment transaction list. This is a heterogenous list of different types of
 * transactions returned in the order the brokerage provides them.
 *
 * @return {BaseInvestmentTransaction[]} the investment transaction list
 */
InvestmentTransactionList.prototype.getInvestmentTransactions = function() {
  return this.transactions;
};
ChildAggregate.add({order: 20, owner: InvestmentTransactionList, /*type: BaseInvestmentTransaction[],*/ fcn: "getInvestmentTransactions"});


/**
 * Sets the investment transaction list. This is a heterogenous list of different types of
 * transactions returned in the order the brokerage provides them.
 *
 * @param {BaseInvestmentTransaction[]} transactions the investment transaction list
 */
InvestmentTransactionList.prototype.setInvestmentTransactions = function(transactions) {
  this.transactions = transactions;
};


/**
 * Gets the bank transaction list.
 *
 * @return {InvestmentBankTransaction[]} the bank transaction list
 */
InvestmentTransactionList.prototype.getBankTransactions = function() {
  return this.bankTransactions;
};
ChildAggregate.add({order: 30, owner: InvestmentTransactionList, /*type: InvestmentBankTransaction[],*/ fcn: "getBankTransactions"});


/**
 * Sets the bank transaction list.
 *
 * @param {InvestmentBankTransaction[]} bankTransactions the bank transaction list
 */
InvestmentTransactionList.prototype.setBankTransactions = function(bankTransactions) {
  this.bankTransactions = bankTransactions;
};




module.exports = InvestmentTransactionList;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/JournalFundTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../../../../domain/data/investment/accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for journal fund transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function JournalFundTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.JOURNAL_FUND);

  /**
   * @name JournalFundTransaction#subAccountFrom
   * @type String
   * @access private
   */
  this.subAccountFrom = null;

  /**
   * @name JournalFundTransaction#subAccountTo
   * @type String
   * @access private
   */
  this.subAccountTo = null;

  /**
   * @name JournalFundTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;
}

inherit(JournalFundTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("JRNLFUND", JournalFundTransaction);


JournalFundTransaction.prototype.JournalFundTransaction = function() {
  super(TransactionType.JOURNAL_FUND);
};


/**
 * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
JournalFundTransaction.prototype.getFromSubAccountFund = function() {
  return this.subAccountFrom;
};
Element.add({name: "SUBACCTFROM", order: 20, owner: JournalFundTransaction, /*type: String,*/ fcn: "getFromSubAccountFund"});


/**
 * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFrom the sub account type
 */
JournalFundTransaction.prototype.setFromSubAccountFund = function(subAccountFrom) {
  this.subAccountFrom = subAccountFrom;
};


/**
 * Gets the result of getFromSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalFundTransaction.prototype.getFromSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getFromSubAccountFund());
};


/**
 * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account fund
 */
JournalFundTransaction.prototype.getToSubAccountFund = function() {
  return this.subAccountTo;
};
Element.add({name: "SUBACCTTO", order: 30, owner: JournalFundTransaction, /*type: String,*/ fcn: "getToSubAccountFund"});


/**
 * Sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountTo the sub account fund
 */
JournalFundTransaction.prototype.setToSubAccountFund = function(subAccountTo) {
  this.subAccountTo = subAccountTo;
};


/**
 * Gets the result of getToSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalFundTransaction.prototype.getToSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getToSubAccountFund());
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
JournalFundTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", order: 40, owner: JournalFundTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
JournalFundTransaction.prototype.setTotal = function(total) {
  this.total = total;
};




module.exports = JournalFundTransaction;

},{"../../../../domain/data/investment/accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/JournalSecurityTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");

/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function JournalSecurityTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.JOURNAL_SECURITY);

  /**
   * @name JournalSecurityTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name JournalSecurityTransaction#subAccountFrom
   * @type String
   * @access private
   */
  this.subAccountFrom = null;

  /**
   * @name JournalSecurityTransaction#subAccountTo
   * @type String
   * @access private
   */
  this.subAccountTo = null;

  /**
   * @name JournalSecurityTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;
}

inherit(JournalSecurityTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(JournalSecurityTransaction, "implements", TransactionWithSecurity);


Aggregate.add("JRNLSEC", JournalSecurityTransaction);



/**
 * Gets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
JournalSecurityTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: JournalSecurityTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was bought
 */
JournalSecurityTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
JournalSecurityTransaction.prototype.getFromSubAccountFund = function() {
  return this.subAccountFrom;
};
Element.add({name: "SUBACCTFROM", order: 30, owner: JournalSecurityTransaction, /*type: String,*/ fcn: "getFromSubAccountFund"});


/**
 * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFrom the sub account type
 */
JournalSecurityTransaction.prototype.setFromSubAccountFund = function(subAccountFrom) {
  this.subAccountFrom = subAccountFrom;
};


/**
 * Gets the result of getFromSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalSecurityTransaction.prototype.getFromSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getFromSubAccountFund());
};


/**
 * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account fund
 */
JournalSecurityTransaction.prototype.getToSubAccountFund = function() {
  return this.subAccountTo;
};
Element.add({name: "SUBACCTTO", order: 40, owner: JournalSecurityTransaction, /*type: String,*/ fcn: "getToSubAccountFund"});


/**
 * sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountTo the sub account fund
 */
JournalSecurityTransaction.prototype.setToSubAccountFund = function(subAccountTo) {
  this.subAccountTo = subAccountTo;
};


/**
 * Gets the result of getToSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalSecurityTransaction.prototype.getToSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getToSubAccountFund());
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
JournalSecurityTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", order: 50, owner: JournalSecurityTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
JournalSecurityTransaction.prototype.setTotal = function(total) {
  this.total = total;
};




module.exports = JournalSecurityTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/MarginInterestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function MarginInterestTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.MARGIN_INTEREST);

  /**
   * @name MarginInterestTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name MarginInterestTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name MarginInterestTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name MarginInterestTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;
}

inherit(MarginInterestTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("MARGININTEREST", MarginInterestTransaction);


/**
 * Gets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
MarginInterestTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 30, owner: MarginInterestTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFund the sub account type
 */
MarginInterestTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
MarginInterestTransaction.prototype.getSubAccountFundEnum = function() {
  var type = this.getSubAccountFund();
  return type !== null ? SubAccountType.valueOf(type) : null;
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
MarginInterestTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", order: 40, owner: MarginInterestTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
MarginInterestTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
MarginInterestTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: MarginInterestTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction.
 */
MarginInterestTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction.
 */
MarginInterestTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 120, owner: MarginInterestTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrency the original currency info for the transaction.
 */
MarginInterestTransaction.prototype.SetOriginalCurrency = function(originalCurrency) {
  this.originalCurrencyInfo = originalCurrency;
  this.currencyCode = null;
};




module.exports = MarginInterestTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionBuyType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of purchase for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var OptionBuyType = {
  BUY_TO_OPEN: 0,
  BUY_TO_CLOSE: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("BUYTOOPEN".equals(ofxVal)) {
      return OptionBuyType.BUY_TO_OPEN;
    } else if ("BUYTOCLOSE".equals(ofxVal)) {
      return OptionBuyType.BUY_TO_CLOSE;
    } else {
      return null;
    }
  }
};


module.exports = OptionBuyType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionSellType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of sale for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var OptionSellType = {
  SELL_TO_CLOSE: 0,
  SELL_TO_OPEN: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("SELLTOOPEN".equals(ofxVal)) {
      return OptionSellType.SELL_TO_OPEN;
    } else if ("SELLTOCLOSE".equals(ofxVal)) {
      return OptionSellType.SELL_TO_CLOSE;
    } else {
      return null;
    }
  }
};


module.exports = OptionSellType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OriginalCurrency.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Original currency aggregate ("ORIGCURRENCY"). For investment transactions in other currencies,
 * the financial institution can report the transaction as converted into the default currency
 * and then include this child aggregate to report what the original currency was and what the
 * rate of conversion was.
 * @see "Section 5.2, OFX Spec"
 *
 * @class
 */
function OriginalCurrency () {

  /**
   * @name OriginalCurrency#currencyRate
   * @type double
   * @access private
   */
  this.currencyRate = null;

  /**
   * @name OriginalCurrency#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;
}



Aggregate.add("ORIGCURRENCY", OriginalCurrency);


/**
 * Gets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
 * the transaction response) to "CURSYM" (the original currency code below).
 *
 * @return {double} the currency rate
 */
OriginalCurrency.prototype.getCurrencyRate = function() {
  return this.currencyRate;
};
Element.add({name: "CURRATE", required: true, order: 10, owner: OriginalCurrency, /*type: double,*/ fcn: "getCurrencyRate"});


/**
 * Sets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
 * the transaction response) to "CURSYM" (the original currency code below).
 *
 * @param {double} currencyRate the currency rate
 */
OriginalCurrency.prototype.setCurrencyRate = function(currencyRate) {
  this.currencyRate = currencyRate;
};


/**
 * Gets the ISO-4217 3-letter currency identifier of the original currency.
 * @see java.util.Currency#getCurrencyCode()
 *
 * @return {String} the currency code
 */
OriginalCurrency.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURSYM", required: true, order: 20, owner: OriginalCurrency, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the ISO-4217 3-letter currency identifier of the original currency.
 * @see java.util.Currency#getCurrencyCode()
 *
 * @param {String} currencyCode the currency code
 */
OriginalCurrency.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};




module.exports = OriginalCurrency;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/ReinvestIncomeTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var IncomeType = require("./IncomeType");

/**
 * Transaction for reinvestment transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function ReinvestIncomeTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.REINVEST_INCOME);

  /**
   * @name ReinvestIncomeTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name ReinvestIncomeTransaction#incomeType
   * @type String
   * @access private
   */
  this.incomeType = null;

  /**
   * @name ReinvestIncomeTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name ReinvestIncomeTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name ReinvestIncomeTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name ReinvestIncomeTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name ReinvestIncomeTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name ReinvestIncomeTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name ReinvestIncomeTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name ReinvestIncomeTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name ReinvestIncomeTransaction#taxExempt
   * @type Boolean
   * @access private
   */
  this.taxExempt = null;

  /**
   * @name ReinvestIncomeTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name ReinvestIncomeTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name ReinvestIncomeTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(ReinvestIncomeTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(ReinvestIncomeTransaction, "implements", TransactionWithSecurity);


Aggregate.add("REINVEST", ReinvestIncomeTransaction);


/**
 * Gets the id of the security that was reinvested in. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was reinvested in
 */
ReinvestIncomeTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: ReinvestIncomeTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was reinvested in. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was reinvested in
 */
ReinvestIncomeTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @return {String} the type of income
 */
ReinvestIncomeTransaction.prototype.getIncomeType = function() {
  return this.incomeType;
};
Element.add({name: "INCOMETYPE", required: true, order: 30, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getIncomeType"});


/**
 * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @param {String} incomeType the type of income
 */
ReinvestIncomeTransaction.prototype.setIncomeType = function(incomeType) {
  this.incomeType = incomeType;
};


/**
 * Gets the type of income as one of the well-known types.
 *
 * @return {IncomeType} the income type or null if it's not one of the well-known types
 */
ReinvestIncomeTransaction.prototype.getIncomeTypeEnum = function() {
  return IncomeType.fromOfx(this.getIncomeType());
};


/**
 * Gets the total income received. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
ReinvestIncomeTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 40, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total income received. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
ReinvestIncomeTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
ReinvestIncomeTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 50, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
ReinvestIncomeTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
ReinvestIncomeTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the number of units of the security that was reinvested in. This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased
 */
ReinvestIncomeTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 60, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was reinvested in. This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units purchased
 */
ReinvestIncomeTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
ReinvestIncomeTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 70, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
ReinvestIncomeTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the transaction commission for the reinvestment. This is an optional field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
ReinvestIncomeTransaction.prototype.getCommission = function() {
  return this.commission;
};
Element.add({name: "COMMISSION", order: 80, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getCommission"});


/**
 * Sets the transaction commission for the reinvestment. This is an optional field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
ReinvestIncomeTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
ReinvestIncomeTransaction.prototype.getTaxes = function() {
  return this.taxes;
};
Element.add({name: "TAXES", order: 90, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getTaxes"});


/**
 * Sets the taxes for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
ReinvestIncomeTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
ReinvestIncomeTransaction.prototype.getFees = function() {
  return this.fees;
};
Element.add({name: "FEES", order: 100, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getFees"});


/**
 * Sets the fees for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
ReinvestIncomeTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
ReinvestIncomeTransaction.prototype.getLoad = function() {
  return this.load;
};
Element.add({name: "LOAD", order: 110, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getLoad"});


/**
 * Sets the load for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
ReinvestIncomeTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
ReinvestIncomeTransaction.prototype.getTaxExempt = function() {
  return this.taxExempt;
};
Element.add({name: "TAXEXEMPT", order: 120, owner: ReinvestIncomeTransaction, /*type: Boolean,*/ fcn: "getTaxExempt"});


/**
 * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Boolean} taxExempt whether the transaction was tax exempt
 */
ReinvestIncomeTransaction.prototype.setTaxExempt = function(taxExempt) {
  this.taxExempt = taxExempt;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
ReinvestIncomeTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 130, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
ReinvestIncomeTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction.
 */
ReinvestIncomeTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 140, owner: ReinvestIncomeTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction.
 */
ReinvestIncomeTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
ReinvestIncomeTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 150, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
ReinvestIncomeTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known
 */
ReinvestIncomeTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = ReinvestIncomeTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./IncomeType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/RelatedOptionType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

/**
 * Related option transaction type.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var RelatedOptionType = {
  SPREAD: 0,
  STRADDLE: 1,
  NONE: 2,
  OTHER: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("SPREAD".equals(ofxVal)) {
      return RelatedOptionType.SPREAD;
    } else if ("STRADDLE".equals(ofxVal)) {
      return RelatedOptionType.STRADDLE;
    } else if ("NONE".equals(ofxVal)) {
      return RelatedOptionType.NONE;
    } else if ("OTHER".equals(ofxVal)) {
      return RelatedOptionType.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = RelatedOptionType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/ReturnOfCapitalTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");

/**
 * Transaction for return of capital transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function ReturnOfCapitalTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.RETURN_OF_CAPITAL);

  /**
   * @name ReturnOfCapitalTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name ReturnOfCapitalTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name ReturnOfCapitalTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name ReturnOfCapitalTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name ReturnOfCapitalTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name ReturnOfCapitalTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name ReturnOfCapitalTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(ReturnOfCapitalTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(ReturnOfCapitalTransaction, "implements", TransactionWithSecurity);


Aggregate.add("RETOFCAP", ReturnOfCapitalTransaction);


/**
 * Gets the id of the security that capital was returned from. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that capital was returned from
 */
ReturnOfCapitalTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: ReturnOfCapitalTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that capital was returned from. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that capital was returned from
 */
ReturnOfCapitalTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the total amount of capital returned. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
ReturnOfCapitalTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 40, owner: ReturnOfCapitalTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total amount of capital returned. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
ReturnOfCapitalTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
ReturnOfCapitalTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 50, owner: ReturnOfCapitalTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
ReturnOfCapitalTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
ReturnOfCapitalTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the transaction affects.
 * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
ReturnOfCapitalTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 140, owner: ReturnOfCapitalTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the transaction affects.
 * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
ReturnOfCapitalTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
ReturnOfCapitalTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
ReturnOfCapitalTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: ReturnOfCapitalTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
ReturnOfCapitalTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the currency code for the transaction.
 */
ReturnOfCapitalTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 120, owner: ReturnOfCapitalTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the currency code for the transaction.
 */
ReturnOfCapitalTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
ReturnOfCapitalTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 180, owner: ReturnOfCapitalTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
ReturnOfCapitalTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known.
 */
ReturnOfCapitalTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = ReturnOfCapitalTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellDebtReason.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Reason debt was sold.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var SellDebtReason = {
  CALL: 0,
  SELL: 1,
  MATURITY: 2,

  fromOfx: function(/*String*/ ofxVal) {
    if ("CALL".equals(ofxVal)) {
      return SellDebtReason.CALL;
    } else if ("SELL".equals(ofxVal)) {
      return SellDebtReason.SELL;
    } else if ("MATURITY".equals(ofxVal)) {
      return SellDebtReason.MATURITY;
    } else {
      return null;
    }
  }
};


module.exports = SellDebtReason;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellDebtTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var SellDebtReason = require("./SellDebtReason");

/**
 * Transaction for selling debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellDebtTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_DEBT);

  /**
   * @name SellDebtTransaction#sellReason
   * @type String
   * @access private
   */
  this.sellReason = null;

  /**
   * @name SellDebtTransaction#accruedInterest
   * @type Double
   * @access private
   */
  this.accruedInterest = null;
}

inherit(SellDebtTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLDEBT", SellDebtTransaction);


/**
 * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The reason for the sale
 */
SellDebtTransaction.prototype.getSellReason = function() {
  return this.sellReason;
};
Element.add({name: "SELLREASON", order: 30, owner: SellDebtTransaction, /*type: String,*/ fcn: "getSellReason"});


/**
 * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellReason The reason for the sale
 */
SellDebtTransaction.prototype.setSellReason = function(sellReason) {
  this.sellReason = sellReason;
};


/**
 * Gets the sell reason as one of the well-known types.
 *
 * @return {SellDebtReason} the sell reason or null if it's not well known
 */
SellDebtTransaction.prototype.getSellReasonEnum = function() {
  return SellDebtReason.fromOfx(this.getSellReason());
};


/**
 * Gets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the amount of accrued interest
 */
SellDebtTransaction.prototype.getAccruedInterest = function() {
  return this.accruedInterest;
};
Element.add({name: "ACCRDINT", order: 40, owner: SellDebtTransaction, /*type: Double,*/ fcn: "getAccruedInterest"});


/**
 * Sets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} accruedInterest the amount of accrued interest
 */
SellDebtTransaction.prototype.setAccruedInterest = function(accruedInterest) {
  this.accruedInterest = accruedInterest;
};




module.exports = SellDebtTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./SellDebtReason":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellDebtReason.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Sell investment transaction aggregate ("INVSELL").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @class
 */
function SellInvestmentTransaction () {

  /**
   * @name SellInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;

  /**
   * @name SellInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SellInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name SellInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name SellInvestmentTransaction#markdown
   * @type Double
   * @access private
   */
  this.markdown = null;

  /**
   * @name SellInvestmentTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name SellInvestmentTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name SellInvestmentTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name SellInvestmentTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name SellInvestmentTransaction#withholding
   * @type Double
   * @access private
   */
  this.withholding = null;

  /**
   * @name SellInvestmentTransaction#taxExempt
   * @type Boolean
   * @access private
   */
  this.taxExempt = null;

  /**
   * @name SellInvestmentTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name SellInvestmentTransaction#gain
   * @type Double
   * @access private
   */
  this.gain = null;

  /**
   * @name SellInvestmentTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SellInvestmentTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name SellInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name SellInvestmentTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name SellInvestmentTransaction#loanId
   * @type String
   * @access private
   */
  this.loanId = null;

  /**
   * @name SellInvestmentTransaction#stateWithholding
   * @type Double
   * @access private
   */
  this.stateWithholding = null;

  /**
   * @name SellInvestmentTransaction#penalty
   * @type Double
   * @access private
   */
  this.penalty = null;

  /**
   * @name SellInvestmentTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}



Aggregate.add("INVSELL", SellInvestmentTransaction);


/**
 * Gets the investment transaction child aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction child aggregate
 */
SellInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.investmentTransaction;
};
ChildAggregate.add({order: 10, owner: SellInvestmentTransaction, /*type: InvestmentTransaction,*/ fcn: "getInvestmentTransaction"});


/**
 * Sets the investment transaction child aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the investment transaction child aggregate
 */
SellInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};


/**
 * Gets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was sold
 */
SellInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: SellInvestmentTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was sold
 */
SellInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units sold
 */
SellInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 30, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units sold
 */
SellInvestmentTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
SellInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 40, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
SellInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markedown price
 */
SellInvestmentTransaction.prototype.getMarkdown = function() {
  return this.markdown;
};
Element.add({name: "MARKDOWN", order: 50, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getMarkdown"});


/**
 * Sets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} markdown the per unit markedown price
 */
SellInvestmentTransaction.prototype.setMarkdown = function(markdown) {
  this.markdown = markdown;
};


/**
 * Gets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
SellInvestmentTransaction.prototype.getCommission = function() {
  return this.commission;
};
Element.add({name: "COMMISSION", order: 60, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getCommission"});


/**
 * Sets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
SellInvestmentTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
SellInvestmentTransaction.prototype.getTaxes = function() {
  return this.taxes;
};
Element.add({name: "TAXES", order: 70, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getTaxes"});


/**
 * Sets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
SellInvestmentTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
SellInvestmentTransaction.prototype.getFees = function() {
  return this.fees;
};
Element.add({name: "FEES", order: 80, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getFees"});


/**
 * Sets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
SellInvestmentTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
SellInvestmentTransaction.prototype.getLoad = function() {
  return this.load;
};
Element.add({name: "LOAD", order: 90, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getLoad"});


/**
 * Sets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
SellInvestmentTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the withholding
 */
SellInvestmentTransaction.prototype.getWithholding = function() {
  return this.withholding;
};
Element.add({name: "WITHHOLDING", order: 93, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getWithholding"});


/**
 * Sets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} withholding the withholding
 */
SellInvestmentTransaction.prototype.setWithholding = function(withholding) {
  this.withholding = withholding;
};


/**
 * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
SellInvestmentTransaction.prototype.getTaxExempt = function() {
  return this.taxExempt;
};
Element.add({name: "TAXEXEMPT", order: 97, owner: SellInvestmentTransaction, /*type: Boolean,*/ fcn: "getTaxExempt"});


/**
 * Sets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Boolean} taxExempt whether the transaction was tax exempt
 */
SellInvestmentTransaction.prototype.setTaxExempt = function(taxExempt) {
  this.taxExempt = taxExempt;
};


/**
 * Gets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
SellInvestmentTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 100, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
SellInvestmentTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the gain for the sale
 */
SellInvestmentTransaction.prototype.getGain = function() {
  return this.gain;
};
Element.add({name: "GAIN", order: 105, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getGain"});


/**
 * Sets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} gain the gain for the sale
 */
SellInvestmentTransaction.prototype.setGain = function(gain) {
  this.gain = gain;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
SellInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: SellInvestmentTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
SellInvestmentTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
SellInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 120, owner: SellInvestmentTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
SellInvestmentTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
SellInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 130, owner: SellInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
SellInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
SellInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the security is being transfered from
 * (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
SellInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 140, owner: SellInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the security is being transfered from
 * (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
SellInvestmentTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
SellInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the loan id
 */
SellInvestmentTransaction.prototype.getLoanId = function() {
  return this.loanId;
};
Element.add({name: "LOANID", order: 150, owner: SellInvestmentTransaction, /*type: String,*/ fcn: "getLoanId"});


/**
 * Sets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} loanId the loan id
 */
SellInvestmentTransaction.prototype.setLoanId = function(loanId) {
  this.loanId = loanId;
};


/**
 * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
SellInvestmentTransaction.prototype.getStateWithholding = function() {
  return this.stateWithholding;
};
Element.add({name: "STATEWITHHOLDING", order: 160, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getStateWithholding"});


/**
 * Sets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} stateWithholding the state withholding
 */
SellInvestmentTransaction.prototype.setStateWithholding = function(stateWithholding) {
  this.stateWithholding = stateWithholding;
};


/**
 * Gets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
SellInvestmentTransaction.prototype.getPenalty = function() {
  return this.penalty;
};
Element.add({name: "PENALTY", order: 170, owner: SellInvestmentTransaction, /*type: Double,*/ fcn: "getPenalty"});


/**
 * Sets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} penalty the state withholding
 */
SellInvestmentTransaction.prototype.setPenalty = function(penalty) {
  this.penalty = penalty;
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
SellInvestmentTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 180, owner: SellInvestmentTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
SellInvestmentTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
SellInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = SellInvestmentTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellMutualFundTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var SellType = require("./SellType");

/**
 * Transaction for selling mutual fund.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellMutualFundTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_MUTUAL_FUND);

  /**
   * @name SellMutualFundTransaction#sellType
   * @type String
   * @access private
   */
  this.sellType = null;

  /**
   * @name SellMutualFundTransaction#averageCostBasis
   * @type Double
   * @access private
   */
  this.averageCostBasis = null;

  /**
   * @name SellMutualFundTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;
}

inherit(SellMutualFundTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLMF", SellMutualFundTransaction);


/**
 * Gets the type of sale. One of "SELL" or "SELLSHORT".
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The type of sale
 */
SellMutualFundTransaction.prototype.getSellType = function() {
  return this.sellType;
};
Element.add({name: "SELLTYPE", order: 20, owner: SellMutualFundTransaction, /*type: String,*/ fcn: "getSellType"});


/**
 * Sets the type of sale. One of "SELL" or "SELLSHORT".
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellType The type of sale
 */
SellMutualFundTransaction.prototype.setSellType = function(sellType) {
  this.sellType = sellType;
};


/**
 * Gets the sell type as one of the well-known types.
 *
 * @return {SellType} the type of sale or null if it's not known.
 */
SellMutualFundTransaction.prototype.getSellTypeEnum = function() {
  return SellType.fromOfx(this.sellType);
};


/**
 * Gets the average cost basis of the sale.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} The average cost basis of the sale
 */
SellMutualFundTransaction.prototype.getAverageCostBasis = function() {
  return this.averageCostBasis;
};
Element.add({name: "AVGCOSTBASIS", order: 30, owner: SellMutualFundTransaction, /*type: Double,*/ fcn: "getAverageCostBasis"});


/**
 * Sets the average cost basis of the sale.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} averageCostBasis The average cost basis of the sale
 */
SellMutualFundTransaction.prototype.setAverageCostBasis = function(averageCostBasis) {
  this.averageCostBasis = averageCostBasis;
};


/**
 * Gets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
SellMutualFundTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 40, owner: SellMutualFundTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
SellMutualFundTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};




module.exports = SellMutualFundTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./SellType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellOptionTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../../util/inherit");

var ShortOptionSecurity = require("../positions/ShortOptionSecurity");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var OptionSellType = require("./OptionSellType");
var RelatedOptionType = require("./RelatedOptionType");

/**
 * Transaction for selling options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellOptionTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_OPTION);

  /**
   * @name SellOptionTransaction#optionSellType
   * @type String
   * @access private
   */
  this.optionSellType = null;

  /**
   * @name SellOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name SellOptionTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;

  /**
   * @name SellOptionTransaction#relatedType
   * @type String
   * @access private
   */
  this.relatedType = null;

  /**
   * @name SellOptionTransaction#secured
   * @type String
   * @access private
   */
  this.secured = null;
}

inherit(SellOptionTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLOPT", SellOptionTransaction);


/**
 * Gets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option sell type
 */
SellOptionTransaction.prototype.getOptionSellType = function() {
  return this.optionSellType;
};
Element.add({name: "OPTSELLTYPE", required: true, order: 20, owner: SellOptionTransaction, /*type: String,*/ fcn: "getOptionSellType"});


/**
 * Sets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionSellType the option sell type
 */
SellOptionTransaction.prototype.setOptionSellType = function(optionSellType) {
  this.optionSellType = optionSellType;
};


/**
 * Gets the option sell type as one of the well-known types.
 *
 * @return {OptionSellType} the type of sale or null if it's not known.
 */
SellOptionTransaction.prototype.getOptionSellTypeEnum = function() {
  return OptionSellType.fromOfx(this.optionSellType);
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
SellOptionTransaction.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", required: true, order: 30, owner: SellOptionTransaction, /*type: Integer,*/ fcn: "getSharesPerContact"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
SellOptionTransaction.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets a related transaction for the option sale for complex option transactions. This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The related transaction id
 */
SellOptionTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 40, owner: SellOptionTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets a related transaction for the option sale for complex option transactions. This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId The related transaction id
 */
SellOptionTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};


/**
 * Gets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The related tansaction type
 */
SellOptionTransaction.prototype.getRelatedType = function() {
  return this.relatedType;
};
Element.add({name: "RELTYPE", order: 50, owner: SellOptionTransaction, /*type: String,*/ fcn: "getRelatedType"});


/**
 * Sets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedType The related tansaction type
 */
SellOptionTransaction.prototype.setRelatedType = function(relatedType) {
  this.relatedType = relatedType;
};


/**
 * Gets the related transaction as one of the well-known types.
 *
 * @return {RelatedOptionType} the related tansaction type or null if it's not well known
 */
SellOptionTransaction.prototype.getRelatedTypeEnum = function() {
  return RelatedOptionType.fromOfx(this.getRelatedType());
};


/**
 * Gets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} how the option sale is secured
 */
SellOptionTransaction.prototype.getSecured = function() {
  return this.secured;
};
Element.add({name: "SECURED", order: 60, owner: SellOptionTransaction, /*type: String,*/ fcn: "getSecured"});


/**
 * Sets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} secured how the option sale is secured
 */
SellOptionTransaction.prototype.setSecured = function(secured) {
  this.secured = secured;
};


/**
 * Gets how the option sale is secured as one of the well-known types.
 *
 * @return {ShortOptionSecurity} the type indicating how the option is secured or null if it's not well known.
 */
SellOptionTransaction.prototype.getSecuredEnum = function() {
  return  ShortOptionSecurity.fromOfx(this.getSecured());
};




module.exports = SellOptionTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../positions/ShortOptionSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/ShortOptionSecurity.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./OptionSellType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionSellType.js","./RelatedOptionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/RelatedOptionType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellOtherTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for buying other types of securities.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellOtherTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_OTHER);
}

inherit(SellOtherTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLOTHER", SellOtherTransaction);


module.exports = SellOtherTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellStockTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var SellType = require("./SellType");

/**
 * Transaction for selling stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellStockTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_STOCK);

  /**
   * @name SellStockTransaction#sellType
   * @type String
   * @access private
   */
  this.sellType = null;
}

inherit(SellStockTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLSTOCK", SellStockTransaction);


/**
 * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sell type
 */
SellStockTransaction.prototype.getSellType = function() {
  return this.sellType;
};
Element.add({name: "SELLTYPE", required: true, order: 20, owner: SellStockTransaction, /*type: String,*/ fcn: "getSellType"});


/**
 * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellType the sell type
 */
SellStockTransaction.prototype.setSellType = function(sellType) {
  this.sellType = sellType;
};


/**
 * Gets the sell type as one of the well-known types.
 *
 * @return {SellType} the type of sale or null if it's not known
 */
SellStockTransaction.prototype.getSellTypeEnum = function() {
  return SellType.fromOfx(this.sellType);
};




module.exports = SellStockTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./SellType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellType.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of sale for stocks and mutual funds.
 *
 * @enum
 */
var SellType = {
  SELL: 0,
  SELL_SHORT: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("SELL".equals(ofxVal)) {
      return SellType.SELL;
    } else if ("SELLSHORT".equals(ofxVal)) {
      return SellType.SELL_SHORT;
    } else {
      return null;
    }
  }
};


module.exports = SellType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SplitTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for a stock split.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function SplitTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.SPLIT);

  /**
   * @name SplitTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SplitTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name SplitTransaction#oldUnits
   * @type Double
   * @access private
   */
  this.oldUnits = null;

  /**
   * @name SplitTransaction#newUnits
   * @type Double
   * @access private
   */
  this.newUnits = null;

  /**
   * @name SplitTransaction#numerator
   * @type Double
   * @access private
   */
  this.numerator = null;

  /**
   * @name SplitTransaction#denominator
   * @type Double
   * @access private
   */
  this.denominator = null;

  /**
   * @name SplitTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SplitTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name SplitTransaction#cashForFractionalUnits
   * @type Double
   * @access private
   */
  this.cashForFractionalUnits = null;

  /**
   * @name SplitTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name SplitTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(SplitTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("SPLIT", SplitTransaction);


/**
 * Gets the id of the security for the split. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security for the expsense
 */
SplitTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: SplitTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security for the split. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security for the expsense
 */
SplitTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
SplitTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 30, owner: SplitTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
SplitTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
SplitTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the old number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @return {Double} the old number of units.
 */
SplitTransaction.prototype.getOldUnits = function() {
  return this.oldUnits;
};
Element.add({name: "OLDUNITS", order: 40, owner: SplitTransaction, /*type: Double,*/ fcn: "getOldUnits"});


/**
 * Sets the old number of units for the split. This is a  equired field according to the OFX
 * spec.
 *
 * @param {Double} oldUnits the old number of units.
 */
SplitTransaction.prototype.setOldUnits = function(oldUnits) {
  this.oldUnits = oldUnits;
};


/**
 * Gets the new number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @return {Double} the new number of units.
 */
SplitTransaction.prototype.getNewUnits = function() {
  return this.newUnits;
};
Element.add({name: "NEWUNITS", order: 50, owner: SplitTransaction, /*type: Double,*/ fcn: "getNewUnits"});


/**
 * Sets the new number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @param {Double} newUnits the new number of units.
 */
SplitTransaction.prototype.setNewUnits = function(newUnits) {
  this.newUnits = newUnits;
};


/**
 * Gets the numerator for the split ratio. This is a required field according to the OFX spec.
 *
 * @return {Double} the numerator for the split ratio
 */
SplitTransaction.prototype.getNumerator = function() {
  return this.numerator;
};
Element.add({name: "NUMERATOR", order: 60, owner: SplitTransaction, /*type: Double,*/ fcn: "getNumerator"});


/**
 * Sets the numerator for the split ratio. This is a required field according to the OFX spec.
 *
 * @param {Double} numerator the numerator for the split ratio
 */
SplitTransaction.prototype.setNumerator = function(numerator) {
  this.numerator = numerator;
};


/**
 * Gets the denominator for the split ratio. This is a required field according to the OFX spec.
 *
 * @return {Double} the numerator for the split ratio
 */
SplitTransaction.prototype.getDenominator = function() {
  return this.denominator;
};
Element.add({name: "DENOMINATOR", order: 70, owner: SplitTransaction, /*type: Double,*/ fcn: "getDenominator"});


/**
 * Sets the denominator for the split ratio. This is a required field according to the OFX spec.
 *
 * @param {Double} denominator the numerator for the split ratio
 */
SplitTransaction.prototype.setDenominator = function(denominator) {
  this.denominator = denominator;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
SplitTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: SplitTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {void} the currency code for the transaction
 */
SplitTransaction.prototype.setCurrencyCode = function(/*String*/ currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
SplitTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 90, owner: SplitTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {void} the original currency info for the transaction
 */
SplitTransaction.prototype.setOriginalCurrencyInfo = function(/*OriginalCurrency*/ originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the cash for fractional units.
 *
 * @return {Double} the cash for fractional units
 */
SplitTransaction.prototype.getCashForFractionalUnits = function() {
  return this.cashForFractionalUnits;
};
Element.add({name: "FRACCASH", order: 100, owner: SplitTransaction, /*type: Double,*/ fcn: "getCashForFractionalUnits"});


/**
 * Sets the cash for fractional units.
 *
 * @param {Double} cashForFractionalUnits the cash for fractional units
 */
SplitTransaction.prototype.setCashForFractionalUnits = function(cashForFractionalUnits) {
  this.cashForFractionalUnits = cashForFractionalUnits;
};


/**
 * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
SplitTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 110, owner: SplitTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
SplitTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
SplitTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
SplitTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 120, owner: SplitTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
SplitTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
SplitTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = SplitTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of investment transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var TransactionType = {

  BUY_DEBT: 0,
  BUY_MUTUAL_FUND: 1,
  BUY_OPTION: 2,
  BUY_OTHER: 3,
  BUY_STOCK: 4,
  CLOSE_OPTION: 5,
  INCOME: 6,
  INVESTMENT_EXPENSE: 7,
  JOURNAL_FUND: 8,
  JOURNAL_SECURITY: 9,
  MARGIN_INTEREST: 10,
  REINVEST_INCOME: 11,
  RETURN_OF_CAPITAL: 12,
  SELL_DEBT: 13,
  SELL_MUTUAL_FUND: 14,
  SELL_OPTION: 15,
  SELL_OTHER: 16,
  SELL_STOCK: 17,
  SPLIT: 18,
  TRANSFER: 19
};


module.exports = TransactionType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Interface for transactions that have a security associated with them.
 *
 * @class
 */
function TransactionWithSecurity() {
}

/**
 * Gets the security for the transaction.
 *
 * @return {SecurityId} the security id for the transaction
 */
TransactionWithSecurity.prototype.getSecurityId = function() { throw new Error("not implemented"); };


module.exports = TransactionWithSecurity;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransferAction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of transfer.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var TransferAction = {
  IN: 0,
  OUT: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("IN".equals(ofxVal)) {
      return TransferAction.IN;
    } else if ("OUT".equals(ofxVal)) {
      return TransferAction.OUT;
    } else {
      return null;
    }
  }
};


module.exports = TransferAction;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransferInvestmentTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var PositionType = require("../positions/PositionType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");
var TransferAction = require("./TransferAction");

/**
 * Transaction for transfers.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function TransferInvestmentTransaction () {
  // TODO (jonp) -- INVACCTFROM
  BaseOtherInvestmentTransaction.call(this, TransactionType.TRANSFER);

  /**
   * @name TransferInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name TransferInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name TransferInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name TransferInvestmentTransaction#transferAction
   * @type String
   * @access private
   */
  this.transferAction = null;

  /**
   * @name TransferInvestmentTransaction#positionType
   * @type String
   * @access private
   */
  this.positionType = null;

  /**
   * @name TransferInvestmentTransaction#averageCostBasis
   * @type Double
   * @access private
   */
  this.averageCostBasis = null;

  /**
   * @name TransferInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name TransferInvestmentTransaction#purchaseDate
   * @type Date
   * @access private
   */
  this.purchaseDate = null;

  /**
   * @name TransferInvestmentTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(TransferInvestmentTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("TRANSFER", TransferInvestmentTransaction);


/**
 * Gets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was transferred
 */
TransferInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: TransferInvestmentTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was transferred
 */
TransferInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
  * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @return {String} the sub account type
  */
TransferInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 30, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
  * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @param {String} subAccountSecurity the sub account type
  */
TransferInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
   this.subAccountSecurity = subAccountSecurity;
 };


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
TransferInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the number of units of the security that was transferred. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units transferred
 */
TransferInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 40, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was transferred. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units transferred
 */
TransferInvestmentTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the type of transfer. One of "IN" or "OUT". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the type of transfer
 */
TransferInvestmentTransaction.prototype.getTransferAction = function() {
  return this.transferAction;
};
Element.add({name: "TFERACTION", required: true, order: 50, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getTransferAction"});


/**
 * Sets the type of transfer. One of "IN" or "OUT". This is a required field according to the
 * OFX spec.
 *
 * @param {String} transferAction the type of transfer
 */
TransferInvestmentTransaction.prototype.setTransferAction = function(transferAction) {
  this.transferAction = transferAction;
};


/**
 * Gets the transfer action as one of the well-known types.
 *
 * @return {TransferAction} the type of transfer or null if it's not well known
 */
TransferInvestmentTransaction.prototype.getTransferActionEnum = function() {
  return TransferAction.fromOfx(this.getTransferAction());
};


/**
 * Gets the type of position. One of "LONG" or "SHORT". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the position type
 */
TransferInvestmentTransaction.prototype.getPositionType = function() {
  return this.positionType;
};
Element.add({name: "POSTYPE", required: true, order: 60, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getPositionType"});


/**
 * Sets the type of position. One of "LONG" or "SHORT". This is a required field according to the
 * OFX spec.
 *
 * @param {String} positionType the position type
 */
TransferInvestmentTransaction.prototype.setPositionType = function(positionType) {
  this.positionType = positionType;
};


/**
 * Gets the position type as one of the well-known types.
 *
 * @return {PositionType} the position type or null if it's not well known
 */
TransferInvestmentTransaction.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(this.getPositionType());
};


/**
 * Gets the average cost basis for the securities being transfered. This is an optional field
 * according to the ofx spec.
 *
 * @return {Double} the average cost basis
 */
TransferInvestmentTransaction.prototype.getAverageCostBasis = function() {
  return this.averageCostBasis;
};
Element.add({name: "AVGCOSTBASIS", order: 70, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getAverageCostBasis"});


/**
 * Sets the average cost basis for the securities being transfered. This is an optional field
 * according to the ofx spec.
 *
 * @param {Double} averageCostBasis the average cost basis
 */
TransferInvestmentTransaction.prototype.setAverageCostBasis = function(averageCostBasis) {
  this.averageCostBasis = averageCostBasis;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
TransferInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 80, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
TransferInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the original date of purchase for the securities. This is an optional field according to
 * the ofx spec.
 *
 * @return {Date} the original date of purchase
 */
TransferInvestmentTransaction.prototype.getPurchaseDate = function() {
  return this.purchaseDate;
};
Element.add({name: "DTPURCHASE", order: 90, owner: TransferInvestmentTransaction, /*type: Date,*/ fcn: "getPurchaseDate"});


/**
 * Sets the original date of purchase for the securities. This is an optional field according to
 * the ofx spec.
 *
 * @param {Date} purchaseDate the original date of purchase
 */
TransferInvestmentTransaction.prototype.setPurchaseDate = function(purchaseDate) {
  this.purchaseDate = purchaseDate;
};


/**
 * Gets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
TransferInvestmentTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 100, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
TransferInvestmentTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known.
 */
TransferInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = TransferInvestmentTransaction;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../accounts/SubAccountType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/SubAccountType.js","../positions/Inv401KSource":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/Inv401KSource.js","../positions/PositionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/positions/PositionType.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransferAction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransferAction.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  BaseBuyInvestmentTransaction: require("./BaseBuyInvestmentTransaction"),
  BaseInvestmentTransaction: require("./BaseInvestmentTransaction"),
  BaseOtherInvestmentTransaction: require("./BaseOtherInvestmentTransaction"),
  BaseSellInvestmentTransaction: require("./BaseSellInvestmentTransaction"),
  BuyDebtTransaction: require("./BuyDebtTransaction"),
  BuyInvestmentTransaction: require("./BuyInvestmentTransaction"),
  BuyMutualFundTransaction: require("./BuyMutualFundTransaction"),
  BuyOptionTransaction: require("./BuyOptionTransaction"),
  BuyOtherTransaction: require("./BuyOtherTransaction"),
  BuyStockTransaction: require("./BuyStockTransaction"),
  BuyType: require("./BuyType"),
  CloseOptionAction: require("./CloseOptionAction"),
  CloseOptionTransaction: require("./CloseOptionTransaction"),
  IncomeTransaction: require("./IncomeTransaction"),
  IncomeType: require("./IncomeType"),
  InvestmentBankTransaction: require("./InvestmentBankTransaction"),
  InvestmentExpenseTransaction: require("./InvestmentExpenseTransaction"),
  InvestmentTransaction: require("./InvestmentTransaction"),
  InvestmentTransactionList: require("./InvestmentTransactionList"),
  JournalFundTransaction: require("./JournalFundTransaction"),
  JournalSecurityTransaction: require("./JournalSecurityTransaction"),
  MarginInterestTransaction: require("./MarginInterestTransaction"),
  OptionBuyType: require("./OptionBuyType"),
  OptionSellType: require("./OptionSellType"),
  OriginalCurrency: require("./OriginalCurrency"),
  ReinvestIncomeTransaction: require("./ReinvestIncomeTransaction"),
  RelatedOptionType: require("./RelatedOptionType"),
  ReturnOfCapitalTransaction: require("./ReturnOfCapitalTransaction"),
  SellDebtReason: require("./SellDebtReason"),
  SellDebtTransaction: require("./SellDebtTransaction"),
  SellInvestmentTransaction: require("./SellInvestmentTransaction"),
  SellMutualFundTransaction: require("./SellMutualFundTransaction"),
  SellOptionTransaction: require("./SellOptionTransaction"),
  SellOtherTransaction: require("./SellOtherTransaction"),
  SellStockTransaction: require("./SellStockTransaction"),
  SellType: require("./SellType"),
  SplitTransaction: require("./SplitTransaction"),
  TransactionType: require("./TransactionType"),
  TransactionWithSecurity: require("./TransactionWithSecurity"),
  TransferAction: require("./TransferAction"),
  TransferInvestmentTransaction: require("./TransferInvestmentTransaction"),
};

},{"./BaseBuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseBuyInvestmentTransaction.js","./BaseInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseInvestmentTransaction.js","./BaseOtherInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseOtherInvestmentTransaction.js","./BaseSellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BaseSellInvestmentTransaction.js","./BuyDebtTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyDebtTransaction.js","./BuyInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyInvestmentTransaction.js","./BuyMutualFundTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyMutualFundTransaction.js","./BuyOptionTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyOptionTransaction.js","./BuyOtherTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyOtherTransaction.js","./BuyStockTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyStockTransaction.js","./BuyType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/BuyType.js","./CloseOptionAction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/CloseOptionAction.js","./CloseOptionTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/CloseOptionTransaction.js","./IncomeTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeTransaction.js","./IncomeType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/IncomeType.js","./InvestmentBankTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentBankTransaction.js","./InvestmentExpenseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentExpenseTransaction.js","./InvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentTransaction.js","./InvestmentTransactionList":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/InvestmentTransactionList.js","./JournalFundTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/JournalFundTransaction.js","./JournalSecurityTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/JournalSecurityTransaction.js","./MarginInterestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/MarginInterestTransaction.js","./OptionBuyType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionBuyType.js","./OptionSellType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OptionSellType.js","./OriginalCurrency":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/OriginalCurrency.js","./ReinvestIncomeTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/ReinvestIncomeTransaction.js","./RelatedOptionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/RelatedOptionType.js","./ReturnOfCapitalTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/ReturnOfCapitalTransaction.js","./SellDebtReason":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellDebtReason.js","./SellDebtTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellDebtTransaction.js","./SellInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellInvestmentTransaction.js","./SellMutualFundTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellMutualFundTransaction.js","./SellOptionTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellOptionTransaction.js","./SellOtherTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellOtherTransaction.js","./SellStockTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellStockTransaction.js","./SellType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SellType.js","./SplitTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/SplitTransaction.js","./TransactionType":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionType.js","./TransactionWithSecurity":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransactionWithSecurity.js","./TransferAction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransferAction.js","./TransferInvestmentTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/transactions/TransferInvestmentTransaction.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * Information about a message set.
 *
 * @class
 * @see "Section 7.2.1, OFX Spec"
 */
function AbstractMessageSetInfo () {

  /**
   * @name AbstractMessageSetInfo#versionSpecificInformationList
   * @type List<VersionSpecificMessageSetInfo>
   * @access private
   */
  this.versionSpecificInformationList = null;
}





/**
 * List of information about a message set for each version supported.
 *
 * @return {VersionSpecificMessageSetInfo[]} List of information about a message set for each version supported.
 */
AbstractMessageSetInfo.prototype.getVersionSpecificInformationList = function() {
  return this.versionSpecificInformationList;
};
ChildAggregate.add({order: 0, owner: AbstractMessageSetInfo, /*type: VersionSpecificMessageSetInfo[],*/ fcn: "getVersionSpecificInformationList"});


/**
 * List of information about a message set for each version supported.
 *
 * @param {VersionSpecificMessageSetInfo[]} versionSpecificInformationList List of information about a message set for each version supported.
 */
AbstractMessageSetInfo.prototype.setVersionSpecificInformationList = function(versionSpecificInformationList) {
  this.versionSpecificInformationList = versionSpecificInformationList;
};




module.exports = AbstractMessageSetInfo;

},{"../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/CharacterType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 * @see "Section 7.2.2, OFX Spec"
 */
var CharacterType = {

  ALPHAONLY: 0,

  NUMERICONLY: 1,

  ALPHAORNUMERIC: 2,

  ALPHAANDNUMERIC: 3
};


module.exports = CharacterType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ClientRoutingCapability.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 * @see "Section 7.1.5, OFX Spec"
 */
var ClientRoutingCapability = {

  NONE: 0,

  SERVICE: 1,

  MESSAGE_SET: 2
};


module.exports = ClientRoutingCapability;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/CoreMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Core information about a specific version of a specific message set.
 *
 * @class
 * @see "Section 7.2.1, OFX Spec"
 */
function CoreMessageSetInfo () {

  /**
   * @name CoreMessageSetInfo#version
   * @type String
   * @access private
   */
  this.version = "1";

  /**
   * @name CoreMessageSetInfo#serviceProviderName
   * @type String
   * @access private
   */
  this.serviceProviderName = null;

  /**
   * @name CoreMessageSetInfo#url
   * @type String
   * @access private
   */
  this.url = null;

  /**
   * @name CoreMessageSetInfo#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = null;

  /**
   * @name CoreMessageSetInfo#sslRequired
   * @type Boolean
   * @access private
   */
  this.sslRequired = null;

  /**
   * @name CoreMessageSetInfo#realm
   * @type String
   * @access private
   */
  this.realm = null;

  /**
   * @name CoreMessageSetInfo#language
   * @type String
   * @access private
   */
  this.language = "eng";

  /**
   * @name CoreMessageSetInfo#syncCapability
   * @type SynchronizationCapability
   * @access private
   */
  this.syncCapability = null;

  /**
   * @name CoreMessageSetInfo#fileBasedErrorRecoverySupport
   * @type Boolean
   * @access private
   */
  this.fileBasedErrorRecoverySupport = null;

  /**
   * @name CoreMessageSetInfo#timeout
   * @type Integer
   * @access private
   */
  this.timeout = null;
}



Aggregate.add("MSGSETCORE", CoreMessageSetInfo);


/**
 * Version of the message set.
 *
 * @return {String} The version of the message set.
 */
CoreMessageSetInfo.prototype.getVersion = function() {
  return this.version;
};
Element.add({name: "VER", required: true, order: 0, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getVersion"});


/**
 * The version of the message set.
 *
 * @param {String} version The version of the message set.
 */
CoreMessageSetInfo.prototype.setVersion = function(version) {
  this.version = version;
};


/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @return {String} The name of the service provider (sometimes the message set processing is outsourced).
 */
CoreMessageSetInfo.prototype.getServiceProviderName = function() {
  return this.serviceProviderName;
};
Element.add({name: "SPNAME", order: 10, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getServiceProviderName"});


/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @param {String} serviceProviderName The name of the service provider (sometimes the message set processing is outsourced).
 */
CoreMessageSetInfo.prototype.setServiceProviderName = function(serviceProviderName) {
  this.serviceProviderName = serviceProviderName;
};


/**
 * The URL at which the message set is processed.
 *
 * @return {String} The URL at which the message set is processed.
 */
CoreMessageSetInfo.prototype.getUrl = function() {
  return this.url;
};
Element.add({name: "URL", required: true, order: 20, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getUrl"});


/**
 * The URL at which the message set is processed.
 *
 * @param {String} url The URL at which the message set is processed.
 */
CoreMessageSetInfo.prototype.setUrl = function(url) {
  this.url = url;
};


/**
 * The application-level security required for this message set.
 *
 * @return {ApplicationSecurity} The application-level security required for this message set.
 */
CoreMessageSetInfo.prototype.getSecurity = function() {
  return this.security;
};
Element.add({name: "OFXSEC", required: true, order: 30, owner: CoreMessageSetInfo, /*type: ApplicationSecurity,*/ fcn: "getSecurity"});


/**
 * The application-level security required for this message set.
 *
 * @param {ApplicationSecurity} security The application-level security required for this message set.
 */
CoreMessageSetInfo.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * Whether transport-level security is required for this message set.
 *
 * @return {Boolean} Whether transport-level security is required for this message set.
 */
CoreMessageSetInfo.prototype.getSslRequired = function() {
  return this.sslRequired;
};
Element.add({name: "TRANSPSEC", required: true, order: 40, owner: CoreMessageSetInfo, /*type: Boolean,*/ fcn: "getSslRequired"});


/**
 * Whether transport-level security is required for this message set.
 *
 * @param {Boolean} sslRequired Whether transport-level security is required for this message set.
 */
CoreMessageSetInfo.prototype.setSslRequired = function(sslRequired) {
  this.sslRequired = sslRequired;
};


/**
 * The sign-on realm.
 *
 * @return {String} The sign-on realm.
 */
CoreMessageSetInfo.prototype.getRealm = function() {
  return this.realm;
};
Element.add({name: "SIGNONREALM", required: true, order: 50, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getRealm"});


/**
 * The sign-on realm.
 *
 * @param {String} realm The sign-on realm.
 */
CoreMessageSetInfo.prototype.setRealm = function(realm) {
  this.realm = realm;
};


/**
 * The language.
 *
 * @return {String} The language.
 * @see java.util.Locale#getISO3Language()
 */
CoreMessageSetInfo.prototype.getLanguage = function() {
  return this.language;
};
Element.add({name: "LANGUAGE", required: true, order: 60, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getLanguage"});


/**
 * The language.
 *
 * @param {String} language The language.
 */
CoreMessageSetInfo.prototype.setLanguage = function(language) {
  this.language = language;
};


/**
 * The synchronization capability for this message set.
 *
 * @return {SynchronizationCapability} The synchronization capability for this message set.
 */
CoreMessageSetInfo.prototype.getSyncCapability = function() {
  return this.syncCapability;
};
Element.add({name: "SYNCMODE", required: true, order: 70, owner: CoreMessageSetInfo, /*type: SynchronizationCapability,*/ fcn: "getSyncCapability"});


/**
 * The synchronization capability for this message set.
 *
 * @param {SynchronizationCapability} syncCapability The synchronization capability for this message set.
 */
CoreMessageSetInfo.prototype.setSyncCapability = function(syncCapability) {
  this.syncCapability = syncCapability;
};


/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @return {Boolean} Whether there exists support for resposne-file based error recovery.
 */
CoreMessageSetInfo.prototype.getFileBasedErrorRecoverySupport = function() {
  return this.fileBasedErrorRecoverySupport;
};
Element.add({name: "RESPFILEER", required: true, order: 80, owner: CoreMessageSetInfo, /*type: Boolean,*/ fcn: "getFileBasedErrorRecoverySupport"});


/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @param {Boolean} fileBasedErrorRecoverySupport Whether there exists support for resposne-file based error recovery.
 */
CoreMessageSetInfo.prototype.setFileBasedErrorRecoverySupport = function(fileBasedErrorRecoverySupport) {
  this.fileBasedErrorRecoverySupport = fileBasedErrorRecoverySupport;
};


/**
 * Gets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
 * it. It likely is some type of timeout in seconds.
 *
 * @return {Integer} the "INTU.TIMEOUT" property
 */
CoreMessageSetInfo.prototype.getIntuTimeout = function() {
  return this.timeout;
};
Element.add({name: "INTU.TIMEOUT", order: 90, owner: CoreMessageSetInfo, /*type: Integer,*/ fcn: "getIntuTimeout"});


/**
 * Sets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
 * it. It likely is some type of timeout in seconds.
 *
 * @param {Integer} timeout the "INTU.TIMEOUT" property
 */
CoreMessageSetInfo.prototype.setIntuTimeout = function(timeout) {
  this.timeout = timeout;
};




module.exports = CoreMessageSetInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/MessageSetInfoList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @see "Section 7.2, OFX Spec"
 */
function MessageSetInfoList () {

  /**
   * @name MessageSetInfoList#informationList
   * @type List<AbstractMessageSetInfo>
   * @access private
   */
  this.informationList = null;
}



Aggregate.add("MSGSETLIST", MessageSetInfoList);


/**
 * The list of information for each message set.
 *
 * @return {AbstractMessageSetInfo[]} The list of information for each message set.
 */
MessageSetInfoList.prototype.getInformationList = function() {
  return this.informationList;
};
ChildAggregate.add({order: 0, owner: MessageSetInfoList, /*type: AbstractMessageSetInfo[],*/ fcn: "getInformationList"});


/**
 * The list of information for each message set.
 *
 * @param {AbstractMessageSetInfo[]} informationList The list of information for each message set.
 */
MessageSetInfoList.prototype.setInformationList = function(informationList) {
  this.informationList = informationList;
};




module.exports = MessageSetInfoList;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ClientRoutingCapability = require("./ClientRoutingCapability");

/**
 * @author Ryan Heaton
 * @see "Section 7.1.5, OFX Spec"
 */
function ProfileRequest () {

  /**
   * @name ProfileRequest#routingCapability
   * @type ClientRoutingCapability
   * @access private
   */
  this.routingCapability = ClientRoutingCapability.NONE;

  /**
   * @name ProfileRequest#profileLastUpdated
   * @type Date
   * @access private
   */
  this.profileLastUpdated = null;
}

inherit(ProfileRequest, "extends", RequestMessage);


Aggregate.add("PROFRQ", ProfileRequest);


/**
 * The client routing capability.
 *
 * @return {ClientRoutingCapability} The client routing capability.
 */
ProfileRequest.prototype.getRoutingCapability = function() {
  return this.routingCapability;
};
Element.add({name: "CLIENTROUTING", order: 0, owner: ProfileRequest, /*type: ClientRoutingCapability,*/ fcn: "getRoutingCapability"});


/**
 * The client routing capability.
 *
 * @param {ClientRoutingCapability} routingCapability The client routing capability.
 */
ProfileRequest.prototype.setRoutingCapability = function(routingCapability) {
  this.routingCapability = routingCapability;
};


/**
 * The date the profile was last updated.
 *
 * @return {Date} The date the profile was last updated.
 */
ProfileRequest.prototype.getProfileLastUpdated = function() {
  return this.profileLastUpdated;
};
Element.add({name: "DTPROFUP", order: 10, owner: ProfileRequest, /*type: Date,*/ fcn: "getProfileLastUpdated"});


/**
 * The date the profile was last updated.
 *
 * @param {Date} profileLastUpdated The date the profile was last updated.
 */
ProfileRequest.prototype.setProfileLastUpdated = function(profileLastUpdated) {
  this.profileLastUpdated = profileLastUpdated;
};




module.exports = ProfileRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js","./ClientRoutingCapability":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ClientRoutingCapability.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessageSet
 * @see "Section 7 OFX Spec"
 */
function ProfileRequestMessageSet () {

  /**
   * @name ProfileRequestMessageSet#profileRequest
   * @type ProfileRequestTransaction
   * @access private
   */
  this.profileRequest = null;
}

inherit(ProfileRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("PROFMSGSRQV1", ProfileRequestMessageSet);


ProfileRequestMessageSet.prototype.getType = function() {
  return MessageSetType.profile;
};


/**
 * The profile request.
 *
 * @return {ProfileRequestTransaction} The profile request.
 */
ProfileRequestMessageSet.prototype.getProfileRequest = function() {
  return this.profileRequest;
};
ChildAggregate.add({required: true, order: 0, owner: ProfileRequestMessageSet, /*type: ProfileRequestTransaction,*/ fcn: "getProfileRequest"});


/**
 * The profile request.
 *
 * @param {ProfileRequestTransaction} profileRequest The profile request.
 */
ProfileRequestMessageSet.prototype.setProfileRequest = function(profileRequest) {
  this.profileRequest = profileRequest;
};


// Inherited.
ProfileRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getProfileRequest() !== null) {
    requestMessages.push(this.getProfileRequest());
  }
  return requestMessages;
};




module.exports = ProfileRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var ProfileRequest = require("./ProfileRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function ProfileRequestTransaction () {

  /**
   * @name ProfileRequestTransaction#message
   * @type ProfileRequest
   * @access private
   */
  this.message = null;
}

inherit(ProfileRequestTransaction, "extends", new TransactionWrappedRequestMessage(ProfileRequest));


Aggregate.add("PROFTRNRQ", ProfileRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {ProfileRequest} The wrapped message.
 */
ProfileRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: ProfileRequestTransaction, /*type: ProfileRequest,*/ fcn: "getMessage"});


/**
 * The wrapped message.
 *
 * @param {ProfileRequest} message The wrapped message.
 */
ProfileRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
ProfileRequestTransaction.prototype.setWrappedMessage = function(/*ProfileRequest*/ message) {
  this.setMessage(message);
};




module.exports = ProfileRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./ProfileRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");
//var FinancialInstitutionProfile = require("client/FinancialInstitutionProfile");
//TODO
/**
 * @class
 * @augments ResponseMessage
 * @augments FinancialInstitutionProfile
 * @see "Section 7.2 OFX Spec"
 */
function ProfileResponse () {

  /**
   * @name ProfileResponse#messageSetList
   * @type MessageSetInfoList
   * @access private
   */
  this.messageSetList = null;

  /**
   * @name ProfileResponse#signonInfoList
   * @type SignonInfoList
   * @access private
   */
  this.signonInfoList = null;

  /**
   * @name ProfileResponse#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name ProfileResponse#financialInstitutionName
   * @type String
   * @access private
   */
  this.financialInstitutionName = null;

  /**
   * @name ProfileResponse#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name ProfileResponse#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name ProfileResponse#address3
   * @type String
   * @access private
   */
  this.address3 = null;

  /**
   * @name ProfileResponse#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name ProfileResponse#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name ProfileResponse#zip
   * @type String
   * @access private
   */
  this.zip = null;

  /**
   * @name ProfileResponse#country
   * @type String
   * @access private
   */
  this.country = null;

  /**
   * @name ProfileResponse#customerServicePhone
   * @type String
   * @access private
   */
  this.customerServicePhone = null;

  /**
   * @name ProfileResponse#technicalSupportPhone
   * @type String
   * @access private
   */
  this.technicalSupportPhone = null;

  /**
   * @name ProfileResponse#fax
   * @type String
   * @access private
   */
  this.fax = null;

  /**
   * @name ProfileResponse#siteURL
   * @type String
   * @access private
   */
  this.siteURL = null;

  /**
   * @name ProfileResponse#email
   * @type String
   * @access private
   */
  this.email = null;
}

inherit(ProfileResponse, "extends", ResponseMessage);
//inherit(ProfileResponse, "implements", FinancialInstitutionProfile);


Aggregate.add("PROFRS", ProfileResponse);


/**
 * List of message set information.
 * @return {MessageSetInfoList} List of message set information.
 */
ProfileResponse.prototype.getMessageSetList = function() {
  return this.messageSetList;
};
ChildAggregate.add({order: 0, owner: ProfileResponse, /*type: MessageSetInfoList,*/ fcn: "getMessageSetList"});


/**
 * List of message set information.
 *
 * @param {MessageSetInfoList} messageSetList List of message set information.
 */
ProfileResponse.prototype.setMessageSetList = function(messageSetList) {
  this.messageSetList = messageSetList;
};


/**
 * List of signon information.
 *
 * @return {SignonInfoList} List of signon information.
 */
ProfileResponse.prototype.getSignonInfoList = function() {
  return this.signonInfoList;
};
ChildAggregate.add({order: 10, owner: ProfileResponse, /*type: SignonInfoList,*/ fcn: "getSignonInfoList"});


/**
 * List of signon information.
 *
 * @param {SignonInfoList} signonInfoList List of signon information.
 */
ProfileResponse.prototype.setSignonInfoList = function(signonInfoList) {
  this.signonInfoList = signonInfoList;
};


// Inherited.
ProfileResponse.prototype.getResponseMessageName = function() {
  return "profile";
};


// Inherited.
ProfileResponse.prototype.getLastUpdated = function() {
  return this.getTimestamp();
};


/**
 * The timestamp of this profile update.
 *
 * @return {Date} The timestamp of this profile update.
 */
ProfileResponse.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTPROFUP", order: 20, owner: ProfileResponse, /*type: Date,*/ fcn: "getTimestamp"});


/**
 * The timestamp of this profile update.
 *
 * @param {Date} timestamp The timestamp of this profile update.
 */
ProfileResponse.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * The name of the financial institution.
 *
 * @return {String} The name of the financial institution.
 */
ProfileResponse.prototype.getFinancialInstitutionName = function() {
  return this.financialInstitutionName;
};
Element.add({name: "FINAME", order: 30, owner: ProfileResponse, /*type: String,*/ fcn: "getFinancialInstitutionName"});


/**
 * The name of the financial institution.
 *
 * @param {String} financialInstitutionName The name of the financial institution.
 */
ProfileResponse.prototype.setFinancialInstitutionName = function(financialInstitutionName) {
  this.financialInstitutionName = financialInstitutionName;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1", required: true, order: 40, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress1"});


/**
 * The address of the financial institution.
 *
 * @param {String} address1 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2", order: 50, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress2"});


/**
 * The address of the financial institution.
 *
 * @param {String} address2 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress3 = function() {
  return this.address3;
};
Element.add({name: "ADDR3", order: 60, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress3"});


/**
 * The address of the financial institution.
 *
 * @param {String} address3 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress3 = function(address3) {
  this.address3 = address3;
};


/**
 * The city of the financial institution.
 *
 * @return {String} The city of the financial institution.
 */
ProfileResponse.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY", required: true, order: 70, owner: ProfileResponse, /*type: String,*/ fcn: "getCity"});


/**
 * The city of the financial institution.
 *
 * @param {String} city The city of the financial institution.
 */
ProfileResponse.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * The state of this financial institution.
 *
 * @return {String} The state of this financial institution.
 */
ProfileResponse.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE", required: true, order: 80, owner: ProfileResponse, /*type: String,*/ fcn: "getState"});


/**
 * The state of this financial institution.
 *
 * @param {String} state The state of this financial institution.
 */
ProfileResponse.prototype.setState = function(state) {
  this.state = state;
};


/**
 * The postal code of this financial institution.
 *
 * @return {String} The postal code of this financial institution.
 */
ProfileResponse.prototype.getZip = function() {
  return this.zip;
};
Element.add({name: "POSTALCODE", required: true, order: 90, owner: ProfileResponse, /*type: String,*/ fcn: "getZip"});


/**
 * The postal code of this financial institution.
 *
 * @param {String} zip The postal code of this financial institution.
 */
ProfileResponse.prototype.setZip = function(zip) {
  this.zip = zip;
};


/**
 * The country code for this financial institution.
 *
 * @return {String} The country code for this financial institution.
 * @see java.util.Locale#getISO3Country()
 */
ProfileResponse.prototype.getCountry = function() {
  return this.country;
};
Element.add({name: "COUNTRY", required: true, order: 100, owner: ProfileResponse, /*type: String,*/ fcn: "getCountry"});


/**
 * The country code for this financial institution.
 *
 * @param {String} country The country code for this financial institution.
 */
ProfileResponse.prototype.setCountry = function(country) {
  this.country = country;
};


/**
 * The phone number to customer service.
 *
 * @return {String} The phone number to customer service.
 */
ProfileResponse.prototype.getCustomerServicePhone = function() {
  return this.customerServicePhone;
};
Element.add({name: "CSPHONE", order: 110, owner: ProfileResponse, /*type: String,*/ fcn: "getCustomerServicePhone"});


/**
 * The phone number to customer service.
 *
 * @param {String} customerServicePhone The phone number to customer service.
 */
ProfileResponse.prototype.setCustomerServicePhone = function(customerServicePhone) {
  this.customerServicePhone = customerServicePhone;
};


/**
 * The phone number to tech support.
 *
 * @return {String} The phone number to tech support.
 */
ProfileResponse.prototype.getTechnicalSupportPhone = function() {
  return this.technicalSupportPhone;
};
Element.add({name: "TSPHONE", order: 120, owner: ProfileResponse, /*type: String,*/ fcn: "getTechnicalSupportPhone"});


/**
 * The phone number to tech support.
 *
 * @param {String} technicalSupportPhone The phone number to tech support.
 */
ProfileResponse.prototype.setTechnicalSupportPhone = function(technicalSupportPhone) {
  this.technicalSupportPhone = technicalSupportPhone;
};


/**
 * The fax number.
 *
 * @return {String} The fax number.
 */
ProfileResponse.prototype.getFax = function() {
  return this.fax;
};
Element.add({name: "FAXPHONE", order: 130, owner: ProfileResponse, /*type: String,*/ fcn: "getFax"});


/**
 * The fax number.
 *
 * @param {String} fax The fax number.
 */
ProfileResponse.prototype.setFax = function(fax) {
  this.fax = fax;
};


/**
 * URL for the financial institution.
 *
 * @return {String} URL for the financial institution.
 */
ProfileResponse.prototype.getSiteURL = function() {
  return this.siteURL;
};
Element.add({name: "URL", order: 140, owner: ProfileResponse, /*type: String,*/ fcn: "getSiteURL"});


/**
 * URL for the financial institution.
 *
 * @param {String} siteURL URL for the financial institution.
 */
ProfileResponse.prototype.setSiteURL = function(siteURL) {
  this.siteURL = siteURL;
};


/**
 * The email for this FI
 *
 * @return {String} The email for this FI
 */
ProfileResponse.prototype.getEmail = function() {
  return this.email;
};
Element.add({name: "EMAIL", order: 150, owner: ProfileResponse, /*type: String,*/ fcn: "getEmail"});


/**
 * The email for this FI
 *
 * @param {String} email The email for this FI
 */
ProfileResponse.prototype.setEmail = function(email) {
  this.email = email;
};


ProfileResponse.prototype.getMessageSetProfile = function(/*MessageSetType*/ type) {
  var profiles = this.getProfiles(type);
  if (profiles.length > 1) {
    throw new Error("More than one profile of type " + type);
  }
  else if (profiles.isEmpty()) {
    return null;
  }
  else {
    return profiles[0];
  }
};


/**
 * Get all the profiles of the specified type.
 *
 * @param {MessageSetType} type The type.
 * @return {Collection<MessageSetProfile>} The profiles.
 */
ProfileResponse.prototype.getProfiles = function(type) {
  var profiles = [];
  if (this.getMessageSetList() !== null && this.getMessageSetList().getInformationList() !== null) {
    for (var info in this.getMessageSetList().getInformationList()) {
      if (info.getVersionSpecificInformationList() !== null) {
        for (var versionSpecificInfo in info.getVersionSpecificInformationList()) {
          if (versionSpecificInfo.getMessageSetType() == type) {
            profiles.add(versionSpecificInfo);
          }
        }
      }
    }
  }
  return profiles;
};


ProfileResponse.prototype.getMessageSetProfile = function(/*MessageSetType*/ type, /*String*/ version) {
  for (var profile in this.getProfiles(type)) {
    if (version === null) {
      if (profile.getVersion() === null) {
        return profile;
      }
    }
    else if (version.equals(profile.getVersion())) {
      return profile;
    }
  }
  
  return null;
};


ProfileResponse.prototype.getSignonProfile = function(/*MessageSetProfile*/ messageSet) {
  if (this.getSignonInfoList() !== null && this.getSignonInfoList().getInfoList() !== null) {
    for (var signonInfo in this.getSignonInfoList().getInfoList()) {
      if (messageSet.getRealm() === null) {
        if (signonInfo.getRealm() === null) {
          return signonInfo;
        }
      }
      else if (messageSet.getRealm().equals(signonInfo.getRealm())) {
        return signonInfo;
      }
    }
  }
  return null;
};




module.exports = ProfileResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");

/**
 * @class
 * @augments ResponseMessageSet
 * @see "Section 7 OFX Spec"
 */
function ProfileResponseMessageSet () {

  /**
   * @name ProfileResponseMessageSet#profileResponse
   * @type ProfileResponseTransaction
   * @access private
   */
  this.profileResponse = null;
}

inherit(ProfileResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("PROFMSGSRSV1", ProfileResponseMessageSet);


ProfileResponseMessageSet.prototype.getType = function() {
  return MessageSetType.profile;
};


/**
 * The profile response.
 *
 * @return {ProfileResponseTransaction} The profile response.
 */
ProfileResponseMessageSet.prototype.getProfileResponse = function() {
  return this.profileResponse;
};
ChildAggregate.add({required: true, order: 0, owner: ProfileResponseMessageSet, /*type: ProfileResponseTransaction,*/ fcn: "getProfileResponse"});


/**
 * The profile response.
 *
 * @param {ProfileResponseTransaction} profileResponse The profile response.
 */
ProfileResponseMessageSet.prototype.setProfileResponse = function(profileResponse) {
  this.profileResponse = profileResponse;
};


// Inherited.
ProfileResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getProfileResponse() !== null) {
    messages.add(this.getProfileResponse());
  }

  return messages;
};




module.exports = ProfileResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var ProfileResponse = require("./ProfileResponse");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function ProfileResponseTransaction () {

  /**
   * @name ProfileResponseTransaction#message
   * @type ProfileResponse
   * @access private
   */
  this.message = null;
}

inherit(ProfileResponseTransaction, "extends", new TransactionWrappedResponseMessage(ProfileResponse));


Aggregate.add("PROFTRNRS", ProfileResponseTransaction);


/**
 * The message.
 *
 * @return {ProfileResponse} The message.
 */
ProfileResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: ProfileResponseTransaction, /*type: ProfileResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {ProfileResponse} message The message.
 */
ProfileResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
ProfileResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = ProfileResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./ProfileResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SignonInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var SignonProfile = require("../SignonProfile");

/**
 * Sign-on information
 *
 * @class
 * @augments SignonProfile
 * @see "Section 7.2.2, OFX Spec"
 */
function SignonInfo () {

  /**
   * @name SignonInfo#realm
   * @type String
   * @access private
   */
  this.realm = null;

  /**
   * @name SignonInfo#minPasswordCharacters
   * @type Integer
   * @access private
   */
  this.minPasswordCharacters = null;

  /**
   * @name SignonInfo#maxPasswordCharacters
   * @type Integer
   * @access private
   */
  this.maxPasswordCharacters = null;

  /**
   * @name SignonInfo#passwordCharacterType
   * @type CharacterType
   * @access private
   */
  this.passwordCharacterType = null;

  /**
   * @name SignonInfo#passwordCaseSensitive
   * @type Boolean
   * @access private
   */
  this.passwordCaseSensitive = true;

  /**
   * @name SignonInfo#passwordSpecialCharsAllowed
   * @type Boolean
   * @access private
   */
  this.passwordSpecialCharsAllowed = true;

  /**
   * @name SignonInfo#passwordSpacesAllowed
   * @type Boolean
   * @access private
   */
  this.passwordSpacesAllowed = true;

  /**
   * @name SignonInfo#changePasswordSupported
   * @type Boolean
   * @access private
   */
  this.changePasswordSupported = null;

  /**
   * @name SignonInfo#changePasswordFirstRequired
   * @type Boolean
   * @access private
   */
  this.changePasswordFirstRequired = null;

  /**
   * @name SignonInfo#additionalCredientialsLabel1
   * @type String
   * @access private
   */
  this.additionalCredientialsLabel1 = null;

  /**
   * @name SignonInfo#additionalCredientialsLabel2
   * @type String
   * @access private
   */
  this.additionalCredientialsLabel2 = null;

  /**
   * @name SignonInfo#clientUIDRequired
   * @type Boolean
   * @access private
   */
  this.clientUIDRequired = null;

  /**
   * @name SignonInfo#authTokenRequiredForFirstSignon
   * @type Boolean
   * @access private
   */
  this.authTokenRequiredForFirstSignon = null;

  /**
   * @name SignonInfo#authTokenLabel
   * @type String
   * @access private
   */
  this.authTokenLabel = null;

  /**
   * @name SignonInfo#authTokenInfoURL
   * @type String
   * @access private
   */
  this.authTokenInfoURL = null;

  /**
   * @name SignonInfo#mfaSupported
   * @type Boolean
   * @access private
   */
  this.mfaSupported = null;

  /**
   * @name SignonInfo#mfaChallengeRequiredForFirstSignon
   * @type Boolean
   * @access private
   */
  this.mfaChallengeRequiredForFirstSignon = null;
}

inherit(SignonInfo, "implements", SignonProfile);


Aggregate.add("SIGNONINFO", SignonInfo);


/**
 * The name of the sign-on realm.
 *
 * @return {String} The name of the sign-on realm.
 */
SignonInfo.prototype.getRealm = function() {
  return this.realm;
};
Element.add({name: "SIGNONREALM", required: true, order: 0, owner: SignonInfo, /*type: String,*/ fcn: "getRealm"});


/**
 * The name of the sign-on realm.
 *
 * @param {String} realm The name of the sign-on realm.
 */
SignonInfo.prototype.setRealm = function(realm) {
  this.realm = realm;
};


/**
 * The minimum number of password characters.
 *
 * @return {Integer} The minimum number of password characters.
 */
SignonInfo.prototype.getMinPasswordCharacters = function() {
  return this.minPasswordCharacters;
};
Element.add({name: "MIN", required: true, order: 10, owner: SignonInfo, /*type: Integer,*/ fcn: "getMinPasswordCharacters"});


/**
 * The minimum number of password characters.
 *
 * @param {Integer} minPasswordCharacters The minimum number of password characters.
 */
SignonInfo.prototype.setMinPasswordCharacters = function(minPasswordCharacters) {
  this.minPasswordCharacters = minPasswordCharacters;
};


/**
 * The maximum number of password characters.
 *
 * @return {Integer} The maximum number of password characters.
 */
SignonInfo.prototype.getMaxPasswordCharacters = function() {
  return this.maxPasswordCharacters;
};
Element.add({name: "MAX", required: true, order: 20, owner: SignonInfo, /*type: Integer,*/ fcn: "getMaxPasswordCharacters"});


/**
 * The maximum number of password characters.
 *
 * @param {Integer} maxPasswordCharacters The maximum number of password characters.
 */
SignonInfo.prototype.setMaxPasswordCharacters = function(maxPasswordCharacters) {
  this.maxPasswordCharacters = maxPasswordCharacters;
};


/**
 * The type of password characters supported.
 *
 * @return {CharacterType} The type of password characters supported.
 */
SignonInfo.prototype.getPasswordCharacterType = function() {
  return this.passwordCharacterType;
};
Element.add({name: "CHARTYPE", required: true, order: 30, owner: SignonInfo, /*type: CharacterType,*/ fcn: "getPasswordCharacterType"});


/**
 * The type of password characters supported.
 *
 * @param {CharacterType} passwordCharacterType The type of password characters supported.
 */
SignonInfo.prototype.setPasswordCharacterType = function(passwordCharacterType) {
  this.passwordCharacterType = passwordCharacterType;
};


/**
 * Whether the password is case-sensitive.
 *
 * @return {Boolean} Whether the password is case-sensitive.
 */
SignonInfo.prototype.getPasswordCaseSensitive = function() {
  return this.passwordCaseSensitive;
};
Element.add({name: "CASESEN", required: true, order: 40, owner: SignonInfo, /*type: Boolean,*/ fcn: "getPasswordCaseSensitive"});


/**
 * Whether the password is case-sensitive.
 *
 * @param {Boolean} passwordCaseSensitive Whether the password is case-sensitive.
 */
SignonInfo.prototype.setPasswordCaseSensitive = function(passwordCaseSensitive) {
  this.passwordCaseSensitive = passwordCaseSensitive;
};


/**
 * Whether special characters are allowed in the password.
 *
 * @return {Boolean} Whether special characters are allowed in the password.
 */
SignonInfo.prototype.getPasswordSpecialCharsAllowed = function() {
  return this.passwordSpecialCharsAllowed;
};
Element.add({name: "SPECIAL", required: true, order: 50, owner: SignonInfo, /*type: Boolean,*/ fcn: "getPasswordSpecialCharsAllowed"});


/**
 * Whether special characters are allowed in the password.
 *
 * @param {Boolean} passwordSpecialCharsAllowed Whether special characters are allowed in the password.
 */
SignonInfo.prototype.setPasswordSpecialCharsAllowed = function(passwordSpecialCharsAllowed) {
  this.passwordSpecialCharsAllowed = passwordSpecialCharsAllowed;
};


/**
 * Whether spaces are allowed in the password.
 *
 * @return {Boolean} Whether spaces are allowed in the password.
 */
SignonInfo.prototype.getPasswordSpacesAllowed = function() {
  return this.passwordSpacesAllowed;
};
Element.add({name: "SPACES", required: true, order: 60, owner: SignonInfo, /*type: Boolean,*/ fcn: "getPasswordSpacesAllowed"});


/**
 * Whether spaces are allowed in the password.
 *
 * @param {Boolean} passwordSpacesAllowed Whether spaces are allowed in the password.
 */
SignonInfo.prototype.setPasswordSpacesAllowed = function(passwordSpacesAllowed) {
  this.passwordSpacesAllowed = passwordSpacesAllowed;
};


/**
 * Whether the server can process a password change request for this realm.
 *
 * @return {Boolean} Whether the server can process a password change request for this realm.
 */
SignonInfo.prototype.getChangePasswordSupported = function() {
  return this.changePasswordSupported;
};
Element.add({name: "PINCH", required: true, order: 70, owner: SignonInfo, /*type: Boolean,*/ fcn: "getChangePasswordSupported"});


/**
 * Whether the server can process a password change request for this realm.
 *
 * @param {Boolean} changePasswordSupported Whether the server can process a password change request for this realm.
 */
SignonInfo.prototype.setChangePasswordSupported = function(changePasswordSupported) {
  this.changePasswordSupported = changePasswordSupported;
};


/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @return {Boolean} Whether the server requires the user to change their password as part of their first signon.
 */
SignonInfo.prototype.getChangePasswordFirstRequired = function() {
  return this.changePasswordFirstRequired;
};
Element.add({name: "CHGPINFIRST", required: true, order: 80, owner: SignonInfo, /*type: Boolean,*/ fcn: "getChangePasswordFirstRequired"});


/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @param {Boolean} changePasswordFirstRequired Whether the server requires the user to change their password as part of their first signon.
 */
SignonInfo.prototype.setChangePasswordFirstRequired = function(changePasswordFirstRequired) {
  this.changePasswordFirstRequired = changePasswordFirstRequired;
};


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.getAdditionalCredientialsLabel1 = function() {
  return this.additionalCredientialsLabel1;
};
Element.add({name: "USERCRED1LABEL", order: 90, owner: SignonInfo, /*type: String,*/ fcn: "getAdditionalCredientialsLabel1"});


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @param {String} additionalCredientialsLabel1 Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.setAdditionalCredientialsLabel1 = function(additionalCredientialsLabel1) {
  this.additionalCredientialsLabel1 = additionalCredientialsLabel1;
};


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.getAdditionalCredientialsLabel2 = function() {
  return this.additionalCredientialsLabel2;
};
Element.add({name: "USERCRED2LABEL", order: 100, owner: SignonInfo, /*type: String,*/ fcn: "getAdditionalCredientialsLabel2"});


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @param {String} additionalCredientialsLabel2 Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.setAdditionalCredientialsLabel2 = function(additionalCredientialsLabel2) {
  this.additionalCredientialsLabel2 = additionalCredientialsLabel2;
};


/**
 * Whether a client UID is required for teh sign-on.
 *
 * @return {Boolean} Whether a client UID is required for teh sign-on.
 */
SignonInfo.prototype.getClientUIDRequired = function() {
  return this.clientUIDRequired;
};
Element.add({name: "CLIENTUIDREQ", order: 110, owner: SignonInfo, /*type: Boolean,*/ fcn: "getClientUIDRequired"});


/**
 * Whether a client UID is required for teh sign-on.
 *
 * @param {Boolean} clientUIDRequired Whether a client UID is required for teh sign-on.
 */
SignonInfo.prototype.setClientUIDRequired = function(clientUIDRequired) {
  this.clientUIDRequired = clientUIDRequired;
};


/**
 * Whether an auth token is required for the sign-on.
 *
 * @return {Boolean} Whether an auth token is required for the sign-on.
 */
SignonInfo.prototype.getAuthTokenRequiredForFirstSignon = function() {
  return this.authTokenRequiredForFirstSignon;
};
Element.add({name: "AUTHTOKENFIRST", order: 120, owner: SignonInfo, /*type: Boolean,*/ fcn: "getAuthTokenRequiredForFirstSignon"});


/**
 * Whether an auth token is required for the sign-on.
 *
 * @param {Boolean} authTokenRequiredForFirstSignon
 *         Whether an auth token is required for the sign-on.
 */
SignonInfo.prototype.setAuthTokenRequiredForFirstSignon = function(authTokenRequiredForFirstSignon) {
  this.authTokenRequiredForFirstSignon = authTokenRequiredForFirstSignon;
};


/**
 * The label of the auth token.
 *
 * @return {String} The label of the auth token.
 */
SignonInfo.prototype.getAuthTokenLabel = function() {
  return this.authTokenLabel;
};
Element.add({name: "AUTHTOKENLABEL", order: 130, owner: SignonInfo, /*type: String,*/ fcn: "getAuthTokenLabel"});


/**
 * The label of the auth token.
 *
 * @param {String} authTokenLabel The label of the auth token.
 */
SignonInfo.prototype.setAuthTokenLabel = function(authTokenLabel) {
  this.authTokenLabel = authTokenLabel;
};


/**
 * The URL for the auth token information.
 *
 * @return {String} The URL for the auth token information.
 */
SignonInfo.prototype.getAuthTokenInfoURL = function() {
  return this.authTokenInfoURL;
};
Element.add({name: "AUTHTOKENINFOURL", order: 140, owner: SignonInfo, /*type: String,*/ fcn: "getAuthTokenInfoURL"});


/**
 * The URL for the auth token information.
 *
 * @param {String} authTokenInfoURL The URL for the auth token information.
 */
SignonInfo.prototype.setAuthTokenInfoURL = function(authTokenInfoURL) {
  this.authTokenInfoURL = authTokenInfoURL;
};


/**
 * Whether MFA is supported.
 *
 * @return {Boolean} Whether MFA is supported.
 */
SignonInfo.prototype.getMfaSupported = function() {
  return this.mfaSupported;
};
Element.add({name: "MFACHALLENGESUPT", order: 150, owner: SignonInfo, /*type: Boolean,*/ fcn: "getMfaSupported"});


/**
 * Whether MFA is supported.
 *
 * @param {Boolean} mfaSupported Whether MFA is supported.
 */
SignonInfo.prototype.setMfaSupported = function(mfaSupported) {
  this.mfaSupported = mfaSupported;
};


/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @return {Boolean} Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonInfo.prototype.getMfaChallengeRequiredForFirstSignon = function() {
  return this.mfaChallengeRequiredForFirstSignon;
};
Element.add({name: "MFACHALLENGEFIRST", order: 160, owner: SignonInfo, /*type: Boolean,*/ fcn: "getMfaChallengeRequiredForFirstSignon"});


/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @param {Boolean} mfaChallengeRequiredForFirstSignon
 *         Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonInfo.prototype.setMfaChallengeRequiredForFirstSignon = function(mfaChallengeRequiredForFirstSignon) {
  this.mfaChallengeRequiredForFirstSignon = mfaChallengeRequiredForFirstSignon;
};




module.exports = SignonInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../SignonProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/SignonProfile.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SignonInfoList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

//import java.util.List;

/**
 * List of signon information.
 *
 * @class
 * @see "Section 7.2.2, OFX Spec"
 */
function SignonInfoList () {

  /**
   * @name SignonInfoList#infoList
   * @type List<SignonInfo>
   * @access private
   */
  this.infoList = null;
}



Aggregate.add("SIGNONINFOLIST", SignonInfoList);


/**
 * List of sign-on information.
 *
 * @return {SignonInfo[]} List of sign-on information.
 */
SignonInfoList.prototype.getInfoList = function() {
  return this.infoList;
};
ChildAggregate.add({order: 0, owner: SignonInfoList, /*type: SignonInfo[],*/ fcn: "getInfoList"});


/**
 * List of sign-on information.
 *
 * @param {SignonInfo[]} infoList List of sign-on information.
 */
SignonInfoList.prototype.setInfoList = function(infoList) {
  this.infoList = infoList;
};




module.exports = SignonInfoList;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SynchronizationCapability.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @enum
 * @see "Section 7.2.1, OFX Spec"
 */
var SynchronizationCapability = {

  FULL: 0,

  LITE: 1
};


module.exports = SynchronizationCapability;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ChildAggregate = require("../../../meta/ChildAggregate");
var MessageSetProfile = require("../MessageSetProfile");

/**
 * Information specific to a version of a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
function VersionSpecificMessageSetInfo () {

  /**
   * @name VersionSpecificMessageSetInfo#core
   * @type CoreMessageSetInfo
   * @access private
   */
  this.core = null;
}

inherit(VersionSpecificMessageSetInfo, "implements", MessageSetProfile);




/**
 * The information core.
 *
 * @return {CoreMessageSetInfo} The information core.
 */
VersionSpecificMessageSetInfo.prototype.getCore = function() {
  return this.core;
};
ChildAggregate.add({order: 0, owner: VersionSpecificMessageSetInfo, /*type: CoreMessageSetInfo,*/ fcn: "getCore"});


/**
 * The information core.
 *
 * @param {CoreMessageSetInfo} core The information core.
 */
VersionSpecificMessageSetInfo.prototype.setCore = function(core) {
  this.core = core;
};


/**
 * The message set type.
 *
 * @return {MessageSetType} The message set type.
 */
VersionSpecificMessageSetInfo.prototype.getMessageSetType = function() { throw new Error("not implemented"); };

VersionSpecificMessageSetInfo.prototype.getVersion = function() {
  return this.core !== null ? this.core.getVersion() : null;
};

VersionSpecificMessageSetInfo.prototype.getServiceProviderName = function() {
  return this.core !== null ? this.core.getServiceProviderName() : null;
};

VersionSpecificMessageSetInfo.prototype.getUrl = function() {
  return this.core !== null ? this.core.getUrl() : null;
};

VersionSpecificMessageSetInfo.prototype.getSecurity = function() {
  return this.core !== null ? this.core.getSecurity() : null;
};

VersionSpecificMessageSetInfo.prototype.isSslRequired = function() {
  return this.core !== null && this.core.getSslRequired() !== null ? this.core.getSslRequired() : true;
};

VersionSpecificMessageSetInfo.prototype.getRealm = function() {
  return this.core !== null ? this.core.getRealm() : null;
};

VersionSpecificMessageSetInfo.prototype.getLanguage = function() {
  return this.core !== null ? this.core.getLanguage() : null;
};

VersionSpecificMessageSetInfo.prototype.getSyncCapability = function() {
  return this.core !== null ? this.core.getSyncCapability() : null;
};

VersionSpecificMessageSetInfo.prototype.hasFileBasedErrorRecoverySupport = function() {
  return this.core !== null && this.core.getFileBasedErrorRecoverySupport() !== null ? this.core.getFileBasedErrorRecoverySupport() : false;
};




module.exports = VersionSpecificMessageSetInfo;

},{"../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetProfile.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  info: require("./info/index"),
  AbstractMessageSetInfo: require("./AbstractMessageSetInfo"),
  CharacterType: require("./CharacterType"),
  ClientRoutingCapability: require("./ClientRoutingCapability"),
  CoreMessageSetInfo: require("./CoreMessageSetInfo"),
  MessageSetInfoList: require("./MessageSetInfoList"),
  ProfileRequest: require("./ProfileRequest"),
  ProfileRequestMessageSet: require("./ProfileRequestMessageSet"),
  ProfileRequestTransaction: require("./ProfileRequestTransaction"),
  ProfileResponse: require("./ProfileResponse"),
  ProfileResponseMessageSet: require("./ProfileResponseMessageSet"),
  ProfileResponseTransaction: require("./ProfileResponseTransaction"),
  SignonInfo: require("./SignonInfo"),
  SignonInfoList: require("./SignonInfoList"),
  SynchronizationCapability: require("./SynchronizationCapability"),
  VersionSpecificMessageSetInfo: require("./VersionSpecificMessageSetInfo"),
};

},{"./AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js","./CharacterType":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/CharacterType.js","./ClientRoutingCapability":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ClientRoutingCapability.js","./CoreMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/CoreMessageSetInfo.js","./MessageSetInfoList":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/MessageSetInfoList.js","./ProfileRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequest.js","./ProfileRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequestMessageSet.js","./ProfileRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileRequestTransaction.js","./ProfileResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponse.js","./ProfileResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponseMessageSet.js","./ProfileResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/ProfileResponseTransaction.js","./SignonInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SignonInfo.js","./SignonInfoList":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SignonInfoList.js","./SynchronizationCapability":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/SynchronizationCapability.js","./VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js","./info/index":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/index.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BankingMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function BankingMessageSetInfo () {

  /**
   * @name BankingMessageSetInfo#version1Info
   * @type BankingV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(BankingMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("BANKMSGSET", BankingMessageSetInfo);


BankingMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: BankingMessageSetInfo, /*type: BankingV1MessageSetInfo,*/ fcn: "getVersion1Info"});


BankingMessageSetInfo.prototype.setVersion1Info = function(/*BankingV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = BankingMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BankingV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Banking Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.2.1 OFX Spec"
 */
function BankingV1MessageSetInfo () {

  /**
   * @name BankingV1MessageSetInfo#invalidAccountTypes
   * @type List<AccountType>
   * @access private
   */
  this.invalidAccountTypes = null;

  /**
   * @name BankingV1MessageSetInfo#closingAvail
   * @type Boolean
   * @access private
   */
  this.closingAvail = null;

  /**
   * @name BankingV1MessageSetInfo#transferProfile
   * @type TransferProfile
   * @access private
   */
  this.transferProfile = null;

  /**
   * @name BankingV1MessageSetInfo#stopCheckProfile
   * @type StopCheckProfile
   * @access private
   */
  this.stopCheckProfile = null;

  /**
   * @name BankingV1MessageSetInfo#emailProfile
   * @type EmailProfile
   * @access private
   */
  this.emailProfile = null;

  /**
   * @name BankingV1MessageSetInfo#imageProfile
   * @type ImageProfile
   * @access private
   */
  this.imageProfile = null;
}

inherit(BankingV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("BANKMSGSETV1", BankingV1MessageSetInfo);


BankingV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.banking;
};


/**
 * The invalidAccountTypes list.
 *
 * @return {AccountType[]} The invalidAccountTypes list.
 */
BankingV1MessageSetInfo.prototype.getInvalidAccountTypes = function() {
  return this.invalidAccountTypes;
};
ChildAggregate.add({order: 10, owner: BankingV1MessageSetInfo, /*type: AccountType[],*/ fcn: "getInvalidAccountTypes"});


/**
 * The invalidAccountTypes list.
 *
 * @param {AccountType[]} invalidAccountTypes The invalidAccountTypes list.
 */
BankingV1MessageSetInfo.prototype.setInvalidAccountTypes = function(invalidAccountTypes) {
  this.invalidAccountTypes = invalidAccountTypes;
};


/**
 * Gets whether closing statement information is available
 *
 * @return {Boolean} whether closing statement information is available
 */
BankingV1MessageSetInfo.prototype.getClosingAvail = function() {
  return this.closingAvail;
};
Element.add({name: "CLOSINGAVAIL", required: true, order: 20, owner: BankingV1MessageSetInfo, /*type: Boolean,*/ fcn: "getClosingAvail"});


/**
 * Sets whether closing statement information is available
 *
 * @param {Boolean} closingAvail whether closing statement information is available
 */
BankingV1MessageSetInfo.prototype.setClosingAvail = function(closingAvail) {
  this.closingAvail = closingAvail;
};


BankingV1MessageSetInfo.prototype.getTransferProfile = function() {
  return this.transferProfile;
};
ChildAggregate.add({name: "XFERPROF", order: 30, owner: BankingV1MessageSetInfo, /*type: TransferProfile,*/ fcn: "getTransferProfile"});


BankingV1MessageSetInfo.prototype.setTransferProfile = function(/*TransferProfile*/ transferProfile) {
  this.transferProfile = transferProfile;
};


BankingV1MessageSetInfo.prototype.getStopCheckProfile = function() {
  return this.stopCheckProfile;
};
ChildAggregate.add({name: "STPCKPROF", order: 40, owner: BankingV1MessageSetInfo, /*type: StopCheckProfile,*/ fcn: "getStopCheckProfile"});


BankingV1MessageSetInfo.prototype.setStopCheckProfile = function(/*StopCheckProfile*/ stopCheckProfile) {
  this.stopCheckProfile = stopCheckProfile;
};


BankingV1MessageSetInfo.prototype.getEmailProfile = function() {
  return this.emailProfile;
};
ChildAggregate.add({name: "EMAILPROF", required: true, order: 50, owner: BankingV1MessageSetInfo, /*type: EmailProfile,*/ fcn: "getEmailProfile"});


BankingV1MessageSetInfo.prototype.setEmailProfile = function(/*EmailProfile*/ emailProfile) {
  this.emailProfile = emailProfile;
};


BankingV1MessageSetInfo.prototype.getImageProfile = function() {
  return this.imageProfile;
};
ChildAggregate.add({name: "IMAGEPROF", order: 60, owner: BankingV1MessageSetInfo, /*type: ImageProfile,*/ fcn: "getImageProfile"});


BankingV1MessageSetInfo.prototype.setImageProfile = function(/*ImageProfile*/ imageProfile) {
  this.imageProfile = imageProfile;
};




module.exports = BankingV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BillpayMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function BillpayMessageSetInfo () {

  /**
   * @name BillpayMessageSetInfo#version1Info
   * @type BillpayV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(BillpayMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("BILLPAYMSGSET", BillpayMessageSetInfo);


BillpayMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: BillpayMessageSetInfo, /*type: BillpayV1MessageSetInfo,*/ fcn: "getVersion1Info"});


BillpayMessageSetInfo.prototype.setVersion1Info = function(/*BillpayV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = BillpayMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BillpayV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * BillPay Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 12.11.2 OFX Spec"
 */
function BillpayV1MessageSetInfo () {

  /**
   * @name BillpayV1MessageSetInfo#daysWith
   * @type Integer
   * @access private
   */
  this.daysWith = null;

  /**
   * @name BillpayV1MessageSetInfo#defaultDaysToPay
   * @type Integer
   * @access private
   */
  this.defaultDaysToPay = null;

  /**
   * @name BillpayV1MessageSetInfo#transferDaysWith
   * @type Integer
   * @access private
   */
  this.transferDaysWith = null;

  /**
   * @name BillpayV1MessageSetInfo#transferDefaultDaysToPay
   * @type Integer
   * @access private
   */
  this.transferDefaultDaysToPay = null;

  /**
   * @name BillpayV1MessageSetInfo#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name BillpayV1MessageSetInfo#processorEndTime
   * @type String
   * @access private
   */
  this.processorEndTime = null;

  /**
   * @name BillpayV1MessageSetInfo#modelWindow
   * @type Integer
   * @access private
   */
  this.modelWindow = null;

  /**
   * @name BillpayV1MessageSetInfo#postProcessorWindow
   * @type Integer
   * @access private
   */
  this.postProcessorWindow = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsStatusUpdateViaPaymentModificationResponse
   * @type Boolean
   * @access private
   */
  this.supportsStatusUpdateViaPaymentModificationResponse = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByAddress
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByAddress = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByTransfer
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByTransfer = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByPayeeId
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByPayeeId = null;

  /**
   * @name BillpayV1MessageSetInfo#userCanAddPayee
   * @type Boolean
   * @access private
   */
  this.userCanAddPayee = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsExtendedPayment
   * @type Boolean
   * @access private
   */
  this.supportsExtendedPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#canModifyPayments
   * @type Boolean
   * @access private
   */
  this.canModifyPayments = null;

  /**
   * @name BillpayV1MessageSetInfo#canModifyModels
   * @type Boolean
   * @access private
   */
  this.canModifyModels = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsDifferentFirstPayment
   * @type Boolean
   * @access private
   */
  this.supportsDifferentFirstPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsDifferentLastPayment
   * @type Boolean
   * @access private
   */
  this.supportsDifferentLastPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsBillPresentmentContext
   * @type Boolean
   * @access private
   */
  this.supportsBillPresentmentContext = null;
}

inherit(BillpayV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("BILLPAYMSGSETV1", BillpayV1MessageSetInfo);


BillpayV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.payments;
};


BillpayV1MessageSetInfo.prototype.getDaysWith = function() {
  return this.daysWith;
};
Element.add({name: "DAYSWITH", required: true, order: 10, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getDaysWith"});


BillpayV1MessageSetInfo.prototype.setDaysWith = function(/*Integer*/ daysWith) {
  this.daysWith = daysWith;
};


BillpayV1MessageSetInfo.prototype.getDefaultDaysToPay = function() {
  return this.defaultDaysToPay;
};
Element.add({name: "DFLTDAYSTOPAY", required: true, order: 20, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getDefaultDaysToPay"});


BillpayV1MessageSetInfo.prototype.setDefaultDaysToPay = function(/*Integer*/ defaultDaysToPay) {
  this.defaultDaysToPay = defaultDaysToPay;
};


BillpayV1MessageSetInfo.prototype.getTransferDaysWith = function() {
  return this.transferDaysWith;
};
Element.add({name: "XFERDAYSWITH", required: true, order: 30, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getTransferDaysWith"});


BillpayV1MessageSetInfo.prototype.setTransferDaysWith = function(/*Integer*/ transferDaysWith) {
  this.transferDaysWith = transferDaysWith;
};


BillpayV1MessageSetInfo.prototype.getTransferDefaultDaysToPay = function() {
  return this.transferDefaultDaysToPay;
};
Element.add({name: "XFERDFLTDAYSTOPAY", required: true, order: 40, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getTransferDefaultDaysToPay"});


BillpayV1MessageSetInfo.prototype.setTransferDefaultDaysToPay = function(/*Integer*/ transferDefaultDaysToPay) {
  this.transferDefaultDaysToPay = transferDefaultDaysToPay;
};


BillpayV1MessageSetInfo.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 50, owner: BillpayV1MessageSetInfo, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


BillpayV1MessageSetInfo.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


BillpayV1MessageSetInfo.prototype.getProcessorEndTime = function() {
  return this.processorEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 60, owner: BillpayV1MessageSetInfo, /*type: String,*/ fcn: "getProcessorEndTime"});


BillpayV1MessageSetInfo.prototype.setProcessorEndTime = function(/*String*/ processorEndTime) {
  this.processorEndTime = processorEndTime;
};


BillpayV1MessageSetInfo.prototype.getModelWindow = function() {
  return this.modelWindow;
};
Element.add({name: "MODELWND", required: true, order: 70, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getModelWindow"});


BillpayV1MessageSetInfo.prototype.setModelWindow = function(/*Integer*/ modelWindow) {
  this.modelWindow = modelWindow;
};


BillpayV1MessageSetInfo.prototype.getPostProcessorWindow = function() {
  return this.postProcessorWindow;
};
Element.add({name: "POSTPROCWND", required: true, order: 80, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getPostProcessorWindow"});


BillpayV1MessageSetInfo.prototype.setPostProcessorWindow = function(/*Integer*/ postProcessorWindow) {
  this.postProcessorWindow = postProcessorWindow;
};


BillpayV1MessageSetInfo.prototype.getSupportsStatusUpdateViaPaymentModificationResponse = function() {
  return this.supportsStatusUpdateViaPaymentModificationResponse;
};
Element.add({name: "STSVIAMODS", required: true, order: 90, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsStatusUpdateViaPaymentModificationResponse"});


BillpayV1MessageSetInfo.prototype.setSupportsStatusUpdateViaPaymentModificationResponse = function(/*Boolean*/ supportsStatusUpdateViaPaymentModificationResponse) {
  this.supportsStatusUpdateViaPaymentModificationResponse = supportsStatusUpdateViaPaymentModificationResponse;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByAddress = function() {
  return this.supportsPaymentByAddress;
};
Element.add({name: "PMTBYADDR", required: true, order: 100, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByAddress"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByAddress = function(/*Boolean*/ supportsPaymentByAddress) {
  this.supportsPaymentByAddress = supportsPaymentByAddress;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByTransfer = function() {
  return this.supportsPaymentByTransfer;
};
Element.add({name: "PMTBYXFER", required: true, order: 110, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByTransfer"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByTransfer = function(/*Boolean*/ supportsPaymentByTransfer) {
  this.supportsPaymentByTransfer = supportsPaymentByTransfer;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByPayeeId = function() {
  return this.supportsPaymentByPayeeId;
};
Element.add({name: "PMTBYPAYEEID", required: true, order: 120, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByPayeeId"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByPayeeId = function(/*Boolean*/ supportsPaymentByPayeeId) {
  this.supportsPaymentByPayeeId = supportsPaymentByPayeeId;
};


BillpayV1MessageSetInfo.prototype.getUserCanAddPayee = function() {
  return this.userCanAddPayee;
};
Element.add({name: "CANADDPAYEE", required: true, order: 130, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getUserCanAddPayee"});


BillpayV1MessageSetInfo.prototype.setUserCanAddPayee = function(/*Boolean*/ userCanAddPayee) {
  this.userCanAddPayee = userCanAddPayee;
};


BillpayV1MessageSetInfo.prototype.getSupportsExtendedPayment = function() {
  return this.supportsExtendedPayment;
};
Element.add({name: "HASEXTDPMT", required: true, order: 140, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsExtendedPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsExtendedPayment = function(/*Boolean*/ supportsExtendedPayment) {
  this.supportsExtendedPayment = supportsExtendedPayment;
};


BillpayV1MessageSetInfo.prototype.getCanModifyPayments = function() {
  return this.canModifyPayments;
};
Element.add({name: "CANMODPMTS", required: true, order: 150, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getCanModifyPayments"});


BillpayV1MessageSetInfo.prototype.setCanModifyPayments = function(/*Boolean*/ canModifyPayments) {
  this.canModifyPayments = canModifyPayments;
};


BillpayV1MessageSetInfo.prototype.getCanModifyModels = function() {
  return this.canModifyModels;
};
Element.add({name: "CANMODMDLS", required: true, order: 160, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getCanModifyModels"});


BillpayV1MessageSetInfo.prototype.setCanModifyModels = function(/*Boolean*/ canModifyModels) {
  this.canModifyModels = canModifyModels;
};


BillpayV1MessageSetInfo.prototype.getSupportsDifferentFirstPayment = function() {
  return this.supportsDifferentFirstPayment;
};
Element.add({name: "DIFFFIRSTPMT", required: true, order: 170, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsDifferentFirstPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsDifferentFirstPayment = function(/*Boolean*/ supportsDifferentFirstPayment) {
  this.supportsDifferentFirstPayment = supportsDifferentFirstPayment;
};


BillpayV1MessageSetInfo.prototype.getSupportsDifferentLastPayment = function() {
  return this.supportsDifferentLastPayment;
};
Element.add({name: "DIFFLASTPMT", required: true, order: 180, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsDifferentLastPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsDifferentLastPayment = function(/*Boolean*/ supportsDifferentLastPayment) {
  this.supportsDifferentLastPayment = supportsDifferentLastPayment;
};


BillpayV1MessageSetInfo.prototype.getSupportsBillPresentmentContext = function() {
  return this.supportsBillPresentmentContext;
};
Element.add({name: "BILLPUBCONTEXT", order: 190, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBillPresentmentContext"});


BillpayV1MessageSetInfo.prototype.setSupportsBillPresentmentContext = function(/*Boolean*/ supportsBillPresentmentContext) {
  this.supportsBillPresentmentContext = supportsBillPresentmentContext;
};




module.exports = BillpayV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/CreditCardMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function CreditCardMessageSetInfo () {

  /**
   * @name CreditCardMessageSetInfo#version1Info
   * @type CreditCardV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(CreditCardMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("CREDITCARDMSGSET", CreditCardMessageSetInfo);


CreditCardMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: CreditCardMessageSetInfo, /*type: CreditCardV1MessageSetInfo,*/ fcn: "getVersion1Info"});


CreditCardMessageSetInfo.prototype.setVersion1Info = function(/*CreditCardV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = CreditCardMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/CreditCardV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Credit Card Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.3 OFX Spec"
 */
function CreditCardV1MessageSetInfo () {

  /**
   * @name CreditCardV1MessageSetInfo#closingAvail
   * @type Boolean
   * @access private
   */
  this.closingAvail = null;

  /**
   * @name CreditCardV1MessageSetInfo#imageProfile
   * @type ImageProfile
   * @access private
   */
  this.imageProfile = null;
}

inherit(CreditCardV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("CREDITCARDMSGSETV1", CreditCardV1MessageSetInfo);


CreditCardV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.creditcard;
};


/**
 * Closing statement information available
 * @return {Boolean} Boolean
 */
CreditCardV1MessageSetInfo.prototype.getClosingAvail = function() {
  return this.closingAvail;
};
Element.add({name: "CLOSINGAVAIL", required: true, order: 20, owner: CreditCardV1MessageSetInfo, /*type: Boolean,*/ fcn: "getClosingAvail"});


CreditCardV1MessageSetInfo.prototype.setClosingAvail = function(/*Boolean*/ closingAvail) {
  this.closingAvail = closingAvail;
};


/**
 * Image profile (if supported)
 * @return {ImageProfile} ImageProfile
 */
CreditCardV1MessageSetInfo.prototype.getImageProfile = function() {
  return this.imageProfile;
};
ChildAggregate.add({name: "IMAGEPROF", order: 10, owner: CreditCardV1MessageSetInfo, /*type: ImageProfile,*/ fcn: "getImageProfile"});


CreditCardV1MessageSetInfo.prototype.setImageProfile = function(/*ImageProfile*/ imageProfile) {
  this.imageProfile = imageProfile;
};




module.exports = CreditCardV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/EmailMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function EmailMessageSetInfo () {

  /**
   * @name EmailMessageSetInfo#version1Info
   * @type EmailV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(EmailMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("EMAILMSGSET", EmailMessageSetInfo);


EmailMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: EmailMessageSetInfo, /*type: EmailV1MessageSetInfo,*/ fcn: "getVersion1Info"});


EmailMessageSetInfo.prototype.setVersion1Info = function(/*EmailV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = EmailMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/EmailV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Email Message Set Profile Information
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 9.4.2 OFX Spec"
 */
function EmailV1MessageSetInfo () {

  /**
   * @name EmailV1MessageSetInfo#supportsMail
   * @type Boolean
   * @access private
   */
  this.supportsMail = null;

  /**
   * @name EmailV1MessageSetInfo#supportsMimeType
   * @type Boolean
   * @access private
   */
  this.supportsMimeType = null;
}

inherit(EmailV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("EMAILMSGSETV1", EmailV1MessageSetInfo);


EmailV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.email;
};


/**
 * Y if server supports <MAILRQ> request.
 * N if server supports only the <MAILSYNCRQ> request.
 * @return {Boolean} Boolean
 */
EmailV1MessageSetInfo.prototype.getSupportsMail = function() {
  return this.supportsMail;
};
Element.add({name: "MAILSUP", required: true, order: 10, owner: EmailV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsMail"});


EmailV1MessageSetInfo.prototype.setSupportsMail = function(/*Boolean*/ supportsMail) {
  this.supportsMail = supportsMail;
};


/**
 * Y if server supports get MIME message
 * @return {Boolean} Boolean
 */
EmailV1MessageSetInfo.prototype.getSupportsMimeType = function() {
  return this.supportsMimeType;
};
Element.add({name: "GETMIMESUP", required: true, order: 20, owner: EmailV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsMimeType"});


EmailV1MessageSetInfo.prototype.setSupportsMimeType = function(/*Boolean*/ supportsMimeType) {
  this.supportsMimeType = supportsMimeType;
};




module.exports = EmailV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InterbankTransferMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function InterbankTransferMessageSetInfo () {

  /**
   * @name InterbankTransferMessageSetInfo#version1Info
   * @type InterbankTransferV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(InterbankTransferMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("INTERXFERMSGSET", InterbankTransferMessageSetInfo);


InterbankTransferMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: InterbankTransferMessageSetInfo, /*type: InterbankTransferV1MessageSetInfo,*/ fcn: "getVersion1Info"});


InterbankTransferMessageSetInfo.prototype.setVersion1Info = function(/*InterbankTransferV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = InterbankTransferMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InterbankTransferV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Interbank Funds Transfer Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.4 OFX Spec"
 */
function InterbankTransferV1MessageSetInfo () {

  /**
   * @name InterbankTransferV1MessageSetInfo#transferProfile
   * @type TransferProfile
   * @access private
   */
  this.transferProfile = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#supportsBillPay
   * @type Boolean
   * @access private
   */
  this.supportsBillPay = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#cancelWindow
   * @type Integer
   * @access private
   */
  this.cancelWindow = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#domesticInterbankTransferFee
   * @type Double
   * @access private
   */
  this.domesticInterbankTransferFee = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#internationalInterbankTransferFee
   * @type Double
   * @access private
   */
  this.internationalInterbankTransferFee = null;
}

inherit(InterbankTransferV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("INTERXFERMSGSETV1", InterbankTransferV1MessageSetInfo);


InterbankTransferV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.interbank_transfer;
};


InterbankTransferV1MessageSetInfo.prototype.getTransferProfile = function() {
  return this.transferProfile;
};
ChildAggregate.add({name: "XFERPROF", required: true, order: 10, owner: InterbankTransferV1MessageSetInfo, /*type: TransferProfile,*/ fcn: "getTransferProfile"});


InterbankTransferV1MessageSetInfo.prototype.setTransferProfile = function(/*TransferProfile*/ transferProfile) {
  this.transferProfile = transferProfile;
};


InterbankTransferV1MessageSetInfo.prototype.getSupportsBillPay = function() {
  return this.supportsBillPay;
};
Element.add({name: "CANBILLPAY", required: true, order: 20, owner: InterbankTransferV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBillPay"});


InterbankTransferV1MessageSetInfo.prototype.setSupportsBillPay = function(/*Boolean*/ supportsBillPay) {
  this.supportsBillPay = supportsBillPay;
};


InterbankTransferV1MessageSetInfo.prototype.getCancelWindow = function() {
  return this.cancelWindow;
};
Element.add({name: "CANCELWND", required: true, order: 30, owner: InterbankTransferV1MessageSetInfo, /*type: Integer,*/ fcn: "getCancelWindow"});


InterbankTransferV1MessageSetInfo.prototype.setCancelWindow = function(/*Integer*/ cancelWindow) {
  this.cancelWindow = cancelWindow;
};


InterbankTransferV1MessageSetInfo.prototype.getDomesticInterbankTransferFee = function() {
  return this.domesticInterbankTransferFee;
};
Element.add({name: "DOMXFERFEE", required: true, order: 40, owner: InterbankTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getDomesticInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setDomesticInterbankTransferFee = function(/*Double*/ domesticInterbankTransferFee) {
  this.domesticInterbankTransferFee = domesticInterbankTransferFee;
};


InterbankTransferV1MessageSetInfo.prototype.getInternationalInterbankTransferFee = function() {
  return this.internationalInterbankTransferFee;
};
Element.add({name: "INTLXFERFEE", required: true, order: 50, owner: InterbankTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getInternationalInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setInternationalInterbankTransferFee = function(/*Double*/ internationalInterbankTransferFee) {
  this.internationalInterbankTransferFee = internationalInterbankTransferFee;
};




module.exports = InterbankTransferV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InvestmentMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function InvestmentMessageSetInfo () {

  /**
   * @name InvestmentMessageSetInfo#version1Info
   * @type InvestmentV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(InvestmentMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("INVSTMTMSGSET", InvestmentMessageSetInfo);


InvestmentMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: InvestmentMessageSetInfo, /*type: InvestmentV1MessageSetInfo,*/ fcn: "getVersion1Info"});


InvestmentMessageSetInfo.prototype.setVersion1Info = function(/*InvestmentV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = InvestmentMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InvestmentV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * @see "Section 13.7.1.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
function InvestmentV1MessageSetInfo () {

  /**
   * @name InvestmentV1MessageSetInfo#supportsStatementsDownload
   * @type Boolean
   * @access private
   */
  this.supportsStatementsDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsOpenOrdersDownload
   * @type Boolean
   * @access private
   */
  this.supportsOpenOrdersDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsPositionsDownload
   * @type Boolean
   * @access private
   */
  this.supportsPositionsDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsBalanceDownload
   * @type Boolean
   * @access private
   */
  this.supportsBalanceDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsEmail
   * @type Boolean
   * @access private
   */
  this.supportsEmail = null;

  /**
   * @name InvestmentV1MessageSetInfo#supports401kInformation
   * @type Boolean
   * @access private
   */
  this.supports401kInformation = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsClosingStatements
   * @type Boolean
   * @access private
   */
  this.supportsClosingStatements = null;
}

inherit(InvestmentV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("INVSTMTMSGSETV1", InvestmentV1MessageSetInfo);


InvestmentV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.investment;
};


InvestmentV1MessageSetInfo.prototype.getSupportsStatementsDownload = function() {
  return this.supportsStatementsDownload;
};
Element.add({name: "TRANDNLD", required:true, order: 10, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsStatementsDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsStatementsDownload = function(/*Boolean*/ supportsStatementsDownload) {
  this.supportsStatementsDownload = supportsStatementsDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsOpenOrdersDownload = function() {
  return this.supportsOpenOrdersDownload;
};
Element.add({name: "OODNLD", required:true, order: 20, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsOpenOrdersDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsOpenOrdersDownload = function(/*Boolean*/ supportsOpenOrdersDownload) {
  this.supportsOpenOrdersDownload = supportsOpenOrdersDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsPositionsDownload = function() {
  return this.supportsPositionsDownload;
};
Element.add({name: "POSDNLD", required:true, order: 30, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPositionsDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsPositionsDownload = function(/*Boolean*/ supportsPositionsDownload) {
  this.supportsPositionsDownload = supportsPositionsDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsBalanceDownload = function() {
  return this.supportsBalanceDownload;
};
Element.add({name: "BALDNLD", required:true, order: 40, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBalanceDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsBalanceDownload = function(/*Boolean*/ supportsBalanceDownload) {
  this.supportsBalanceDownload = supportsBalanceDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsEmail = function() {
  return this.supportsEmail;
};
Element.add({name: "CANEMAIL", required:true, order: 50, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsEmail"});


InvestmentV1MessageSetInfo.prototype.setSupportsEmail = function(/*Boolean*/ supportsEmail) {
  this.supportsEmail = supportsEmail;
};


InvestmentV1MessageSetInfo.prototype.getSupports401kInformation = function() {
  return this.supports401kInformation;
};
Element.add({name: "INV401KDNLD", order: 60, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupports401kInformation"});


InvestmentV1MessageSetInfo.prototype.setSupports401kInformation = function(/*Boolean*/ supports401kInformation) {
  this.supports401kInformation = supports401kInformation;
};


InvestmentV1MessageSetInfo.prototype.getSupportsClosingStatements = function() {
  return this.supportsClosingStatements;
};
Element.add({name: "CLOSINGAVAIL", order: 70, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsClosingStatements"});


InvestmentV1MessageSetInfo.prototype.setSupportsClosingStatements = function(/*Boolean*/ supportsClosingStatements) {
  this.supportsClosingStatements = supportsClosingStatements;
};




module.exports = InvestmentV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/ProfileMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function ProfileMessageSetInfo () {

  /**
   * @name ProfileMessageSetInfo#version1Info
   * @type ProfileV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(ProfileMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("PROFMSGSET", ProfileMessageSetInfo);


ProfileMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: ProfileMessageSetInfo, /*type: ProfileV1MessageSetInfo,*/ fcn: "getVersion1Info"});


ProfileMessageSetInfo.prototype.setVersion1Info = function(/*ProfileV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = ProfileMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/ProfileV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");

/**
 * @class
 * @augments VersionSpecificMessageSetInfo
 */
function ProfileV1MessageSetInfo () {
}

inherit(ProfileV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("PROFMSGSETV1", ProfileV1MessageSetInfo);


ProfileV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.profile;
};




module.exports = ProfileV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SecurityListMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function SecurityListMessageSetInfo () {

  /**
   * @name SecurityListMessageSetInfo#version1Info
   * @type SecurityListV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(SecurityListMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("SECLISTMSGSET", SecurityListMessageSetInfo);


SecurityListMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: SecurityListMessageSetInfo, /*type: SecurityListV1MessageSetInfo,*/ fcn: "getVersion1Info"});


SecurityListMessageSetInfo.prototype.setVersion1Info = function(/*SecurityListV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = SecurityListMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SecurityListV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * @see "Section 13.7.2.1, OFX Spec"
 *
 * @class
 * @augments VersionSpecificMessageSetInfo
 */
function SecurityListV1MessageSetInfo () {

  /**
   * @name SecurityListV1MessageSetInfo#supportsSecurityListDownload
   * @type Boolean
   * @access private
   */
  this.supportsSecurityListDownload = null;
}

inherit(SecurityListV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SECLISTMSGSETV1", SecurityListV1MessageSetInfo);


SecurityListV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.investment_security;
};


SecurityListV1MessageSetInfo.prototype.getSupportsSecurityListDownload = function() {
  return this.supportsSecurityListDownload;
};
Element.add({name: "SECLISTRQDNLD", required:true, order: 10, owner: SecurityListV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsSecurityListDownload"});


SecurityListV1MessageSetInfo.prototype.setSupportsSecurityListDownload = function(/*Boolean*/ supportsSecurityListDownload) {
  this.supportsSecurityListDownload = supportsSecurityListDownload;
};




module.exports = SecurityListV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignOnMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function SignOnMessageSetInfo () {

  /**
   * @name SignOnMessageSetInfo#version1Info
   * @type SignOnV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(SignOnMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("SIGNONMSGSET", SignOnMessageSetInfo);


SignOnMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: SignOnMessageSetInfo, /*type: SignOnV1MessageSetInfo,*/ fcn: "getVersion1Info"});


SignOnMessageSetInfo.prototype.setVersion1Info = function(/*SignOnV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = SignOnMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignOnV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var MessageSetType = require("../../MessageSetType");
var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");

/**
 * @class
 * @augments VersionSpecificMessageSetInfo
 */
function SignOnV1MessageSetInfo () {
}

inherit(SignOnV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SIGNONMSGSETV1", SignOnV1MessageSetInfo);


SignOnV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.signon;
};




module.exports = SignOnV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignupMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function SignupMessageSetInfo () {

  /**
   * @name SignupMessageSetInfo#version1Info
   * @type SignupV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(SignupMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("SIGNUPMSGSET", SignupMessageSetInfo);


SignupMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: SignupMessageSetInfo, /*type: SignupV1MessageSetInfo,*/ fcn: "getVersion1Info"});


SignupMessageSetInfo.prototype.setVersion1Info = function(/*SignupV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = SignupMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignupV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Servers use the Signup Message Set Profile Information to define how enrollment should proceed.
 *
 * This aggregate should contain 1 Enrollment option among <CLIENTENROLL>, <WEBENROLL>, or <OTHERENROLL>.
 * todo: review how best to enforce this constraint
 *
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 8.8 OFX Spec"
 */
function SignupV1MessageSetInfo () {

  /**
   * @name SignupV1MessageSetInfo#clientEnrollment
   * @type ClientEnrollment
   * @access private
   */
  this.clientEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#webEnrollment
   * @type WebEnrollment
   * @access private
   */
  this.webEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#otherEnrollment
   * @type OtherEnrollment
   * @access private
   */
  this.otherEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#supportsClientUserInfoChanges
   * @type Boolean
   * @access private
   */
  this.supportsClientUserInfoChanges = null;

  /**
   * @name SignupV1MessageSetInfo#supportsAvailableAccounts
   * @type Boolean
   * @access private
   */
  this.supportsAvailableAccounts = null;

  /**
   * @name SignupV1MessageSetInfo#supportsClientServiceActivationRequests
   * @type Boolean
   * @access private
   */
  this.supportsClientServiceActivationRequests = null;
}

inherit(SignupV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SIGNUPMSGSETV1", SignupV1MessageSetInfo);


SignupV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.signup;
};


SignupV1MessageSetInfo.prototype.getClientEnrollment = function() {
  return this.clientEnrollment;
};
ChildAggregate.add({name: "CLIENTENROLL", order: 10, owner: SignupV1MessageSetInfo, /*type: ClientEnrollment,*/ fcn: "getClientEnrollment"});


SignupV1MessageSetInfo.prototype.setClientEnrollment = function(/*ClientEnrollment*/ clientEnrollment) {
  this.clientEnrollment = clientEnrollment;
};


SignupV1MessageSetInfo.prototype.getWebEnrollment = function() {
  return this.webEnrollment;
};
ChildAggregate.add({name: "WEBENROLL", order: 20, owner: SignupV1MessageSetInfo, /*type: WebEnrollment,*/ fcn: "getWebEnrollment"});


SignupV1MessageSetInfo.prototype.setWebEnrollment = function(/*WebEnrollment*/ webEnrollment) {
  this.webEnrollment = webEnrollment;
};


SignupV1MessageSetInfo.prototype.getOtherEnrollment = function() {
  return this.otherEnrollment;
};
ChildAggregate.add({name: "OTHERENROLL", order: 30, owner: SignupV1MessageSetInfo, /*type: OtherEnrollment,*/ fcn: "getOtherEnrollment"});


SignupV1MessageSetInfo.prototype.setOtherEnrollment = function(/*OtherEnrollment*/ otherEnrollment) {
  this.otherEnrollment = otherEnrollment;
};


/**
 * Y if server supports client-based user information changes,
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsClientUserInfoChanges = function() {
  return this.supportsClientUserInfoChanges;
};
Element.add({name: "CHGUSERINFO", required: true, order: 40, owner: SignupV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsClientUserInfoChanges"});


SignupV1MessageSetInfo.prototype.setSupportsClientUserInfoChanges = function(/*Boolean*/ supportsClientUserInfoChanges) {
  this.supportsClientUserInfoChanges = supportsClientUserInfoChanges;
};


/**
 * Y if server can provide information on accounts with SVCSTATUS available,
 * N means client should expect to ask user for specific account information
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsAvailableAccounts = function() {
  return this.supportsAvailableAccounts;
};
Element.add({name: "AVAILACCTS", required: true, order: 50, owner: SignupV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsAvailableAccounts"});


SignupV1MessageSetInfo.prototype.setSupportsAvailableAccounts = function(/*Boolean*/ supportsAvailableAccounts) {
  this.supportsAvailableAccounts = supportsAvailableAccounts;
};


/**
 * Y if server allows clients to make service activation requests (<ACCTRQ>),
 * N if server will only advise clients via synchronization of service additions,
 * changes, or deletions.
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsClientServiceActivationRequests = function() {
  return this.supportsClientServiceActivationRequests;
};
Element.add({name: "CLIENTACTREQ", required: true, order: 60, owner: SignupV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsClientServiceActivationRequests"});


SignupV1MessageSetInfo.prototype.setSupportsClientServiceActivationRequests = function(/*Boolean*/ supportsClientServiceActivationRequests) {
  this.supportsClientServiceActivationRequests = supportsClientServiceActivationRequests;
};




module.exports = SignupV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/WireTransferMessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function WireTransferMessageSetInfo () {

  /**
   * @name WireTransferMessageSetInfo#version1Info
   * @type WireTransferV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(WireTransferMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("WIREXFERMSGSET", WireTransferMessageSetInfo);


WireTransferMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add({order: 0, owner: WireTransferMessageSetInfo, /*type: WireTransferV1MessageSetInfo,*/ fcn: "getVersion1Info"});


WireTransferMessageSetInfo.prototype.setVersion1Info = function(/*WireTransferV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = WireTransferMessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../profile/AbstractMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/AbstractMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/WireTransferV1MessageSetInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Wire Transfer Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.5 OFX Spec"
 */
function WireTransferV1MessageSetInfo () {

  /**
   * @name WireTransferV1MessageSetInfo#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name WireTransferV1MessageSetInfo#processEndTime
   * @type String
   * @access private
   */
  this.processEndTime = null;

  /**
   * @name WireTransferV1MessageSetInfo#supportsScheduledTransfers
   * @type Boolean
   * @access private
   */
  this.supportsScheduledTransfers = null;

  /**
   * @name WireTransferV1MessageSetInfo#domesticWireTransferFee
   * @type Double
   * @access private
   */
  this.domesticWireTransferFee = null;

  /**
   * @name WireTransferV1MessageSetInfo#internationalWireTransferFee
   * @type Double
   * @access private
   */
  this.internationalWireTransferFee = null;
}

inherit(WireTransferV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("WIREXFERMSGSETV1", WireTransferV1MessageSetInfo);


WireTransferV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.wire_transfer;
};


WireTransferV1MessageSetInfo.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 10, owner: WireTransferV1MessageSetInfo, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


WireTransferV1MessageSetInfo.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


WireTransferV1MessageSetInfo.prototype.getProcessEndTime = function() {
  return this.processEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 20, owner: WireTransferV1MessageSetInfo, /*type: String,*/ fcn: "getProcessEndTime"});


WireTransferV1MessageSetInfo.prototype.setProcessEndTime = function(/*String*/ processEndTime) {
  this.processEndTime = processEndTime;
};


WireTransferV1MessageSetInfo.prototype.getSupportsScheduledTransfers = function() {
  return this.supportsScheduledTransfers;
};
Element.add({name: "CANSCHED", required: true, order: 30, owner: WireTransferV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsScheduledTransfers"});


WireTransferV1MessageSetInfo.prototype.setSupportsScheduledTransfers = function(/*Boolean*/ supportsScheduledTransfers) {
  this.supportsScheduledTransfers = supportsScheduledTransfers;
};


WireTransferV1MessageSetInfo.prototype.getDomesticWireTransferFee = function() {
  return this.domesticWireTransferFee;
};
Element.add({name: "DOMXFERFEE", required: true, order: 40, owner: WireTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getDomesticWireTransferFee"});


WireTransferV1MessageSetInfo.prototype.setDomesticWireTransferFee = function(/*Double*/ domesticWireTransferFee) {
  this.domesticWireTransferFee = domesticWireTransferFee;
};


WireTransferV1MessageSetInfo.prototype.getInternationalWireTransferFee = function() {
  return this.internationalWireTransferFee;
};
Element.add({name: "INTLXFERFEE", required: true, order: 50, owner: WireTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getInternationalWireTransferFee"});


WireTransferV1MessageSetInfo.prototype.setInternationalWireTransferFee = function(/*Double*/ internationalWireTransferFee) {
  this.internationalWireTransferFee = internationalWireTransferFee;
};




module.exports = WireTransferV1MessageSetInfo;

},{"../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../../profile/VersionSpecificMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/VersionSpecificMessageSetInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/EmailProfile.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Email Profile
 * @class
 * @see "Section 11.13.2.3 OFX Spec"
 */
function EmailProfile () {

  /**
   * @name EmailProfile#canEmail
   * @type Boolean
   * @access private
   */
  this.canEmail = null;

  /**
   * @name EmailProfile#canNotify
   * @type Boolean
   * @access private
   */
  this.canNotify = null;
}



Aggregate.add("EMAILPROF", EmailProfile);


EmailProfile.prototype.getCanEmail = function() {
  return this.canEmail;
};
Element.add({name: "CANEMAIL", required: true, order: 10, owner: EmailProfile, /*type: Boolean,*/ fcn: "getCanEmail"});


EmailProfile.prototype.setCanEmail = function(/*Boolean*/ canEmail) {
  this.canEmail = canEmail;
};


EmailProfile.prototype.getCanNotify = function() {
  return this.canNotify;
};
Element.add({name: "CANNOTIFY", required: true, order: 20, owner: EmailProfile, /*type: Boolean,*/ fcn: "getCanNotify"});


EmailProfile.prototype.setCanNotify = function(/*Boolean*/ canNotify) {
  this.canNotify = canNotify;
};




module.exports = EmailProfile;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/StopCheckProfile.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Stop Check Profile
 * @class
 * @see "Section 11.13.2.3 OFX Spec"
 */
function StopCheckProfile () {

  /**
   * @name StopCheckProfile#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name StopCheckProfile#processEndTime
   * @type String
   * @access private
   */
  this.processEndTime = null;

  /**
   * @name StopCheckProfile#canUseRange
   * @type Boolean
   * @access private
   */
  this.canUseRange = null;

  /**
   * @name StopCheckProfile#canUseDescription
   * @type Boolean
   * @access private
   */
  this.canUseDescription = null;

  /**
   * @name StopCheckProfile#stopCheckFee
   * @type Double
   * @access private
   */
  this.stopCheckFee = null;
}



Aggregate.add("STPCHKPROF", StopCheckProfile);


/**
 * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
 * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
 * @return {ProcessorDayOff[]} List of days during the week that no processing occurs.
 */
StopCheckProfile.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 0, owner: StopCheckProfile, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


StopCheckProfile.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


/**
 * Gets time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.
 * @see "Section 3.2.8.3 OFX Spec"
 * @return {String} Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
StopCheckProfile.prototype.getProcessEndTime = function() {
  return this.processEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 10, owner: StopCheckProfile, /*type: String,*/ fcn: "getProcessEndTime"});


/**
 * Sets the time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.

 * @see "Section 3.2.8.3 OFX Spec"
 * @param {String} processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
StopCheckProfile.prototype.setProcessEndTime = function(processEndTime) {
  this.processEndTime = processEndTime;
};


StopCheckProfile.prototype.getCanUseRange = function() {
  return this.canUseRange;
};
Element.add({name: "CANUSERANGE", required: true, order: 20, owner: StopCheckProfile, /*type: Boolean,*/ fcn: "getCanUseRange"});


StopCheckProfile.prototype.setCanUseRange = function(/*Boolean*/ canUseRange) {
  this.canUseRange = canUseRange;
};


StopCheckProfile.prototype.getCanUseDescription = function() {
  return this.canUseDescription;
};
Element.add({name: "CANUSEDESC", required: true, order: 30, owner: StopCheckProfile, /*type: Boolean,*/ fcn: "getCanUseDescription"});


StopCheckProfile.prototype.setCanUseDescription = function(/*Boolean*/ canUseDescription) {
  this.canUseDescription = canUseDescription;
};


StopCheckProfile.prototype.getStopCheckFee = function() {
  return this.stopCheckFee;
};
Element.add({name: "STPCHKFEE", required: true, order: 40, owner: StopCheckProfile, /*type: Double,*/ fcn: "getStopCheckFee"});


StopCheckProfile.prototype.setStopCheckFee = function(/*Double*/ stopCheckFee) {
  this.stopCheckFee = stopCheckFee;
};




module.exports = StopCheckProfile;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  EmailProfile: require("./EmailProfile"),
  StopCheckProfile: require("./StopCheckProfile"),
};

},{"./EmailProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/EmailProfile.js","./StopCheckProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/StopCheckProfile.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/ImageProfile.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Image Profile
 * @class
 * @see "Section 3.1.6.2 OFX Spec"
 */
function ImageProfile () {

  /**
   * @name ImageProfile#closingImageAvailable
   * @type Boolean
   * @access private
   */
  this.closingImageAvailable = null;

  /**
   * @name ImageProfile#transactionImageAvailable
   * @type Boolean
   * @access private
   */
  this.transactionImageAvailable = null;
}



Aggregate.add("IMAGEPROF", ImageProfile);


ImageProfile.prototype.getClosingImageAvailable = function() {
  return this.closingImageAvailable;
};
Element.add({name: "CLOSINGIMGAVAIL", required: true, order: 10, owner: ImageProfile, /*type: Boolean,*/ fcn: "getClosingImageAvailable"});


ImageProfile.prototype.setClosingImageAvailable = function(/*Boolean*/ closingImageAvailable) {
  this.closingImageAvailable = closingImageAvailable;
};


ImageProfile.prototype.getTransactionImageAvailable = function() {
  return this.transactionImageAvailable;
};
Element.add({name: "TRANIMGAVAIL", required: true, order: 20, owner: ImageProfile, /*type: Boolean,*/ fcn: "getTransactionImageAvailable"});


ImageProfile.prototype.setTransactionImageAvailable = function(/*Boolean*/ transactionImageAvailable) {
  this.transactionImageAvailable = transactionImageAvailable;
};




module.exports = ImageProfile;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/TransferProfile.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Funds Transfer Profile
 * @author Scott Priddy
 * @see "Section 11.13.2.2 OFX Spec"
 */
function TransferProfile () {

  /**
   * @name TransferProfile#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name TransferProfile#processEndTime
   * @type String
   * @access private
   */
  this.processEndTime = null;

  /**
   * @name TransferProfile#supportsScheduledTransfers
   * @type Boolean
   * @access private
   */
  this.supportsScheduledTransfers = null;

  /**
   * @name TransferProfile#supportsRecurringTransfers
   * @type Boolean
   * @access private
   */
  this.supportsRecurringTransfers = null;

  /**
   * @name TransferProfile#supportsLoanTransfers
   * @type Boolean
   * @access private
   */
  this.supportsLoanTransfers = null;

  /**
   * @name TransferProfile#supportsScheduledLoanTransfers
   * @type Boolean
   * @access private
   */
  this.supportsScheduledLoanTransfers = null;

  /**
   * @name TransferProfile#supportsRecurringLoanTransfers
   * @type Boolean
   * @access private
   */
  this.supportsRecurringLoanTransfers = null;

  /**
   * @name TransferProfile#supportsTransferModification
   * @type Boolean
   * @access private
   */
  this.supportsTransferModification = null;

  /**
   * @name TransferProfile#supportsModelModification
   * @type Boolean
   * @access private
   */
  this.supportsModelModification = null;

  /**
   * @name TransferProfile#modelWindow
   * @type Integer
   * @access private
   */
  this.modelWindow = null;

  /**
   * @name TransferProfile#withdrawnDays
   * @type Integer
   * @access private
   */
  this.withdrawnDays = null;

  /**
   * @name TransferProfile#defaultDaysToPay
   * @type Integer
   * @access private
   */
  this.defaultDaysToPay = null;
}



Aggregate.add("XFERPROF", TransferProfile);


/**
 * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
 * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
 * @return {ProcessorDayOff[]} List of days during the week that no processing occurs.
 */
TransferProfile.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 0, owner: TransferProfile, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


TransferProfile.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


/**
 * Gets time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.
 * @see "Section 3.2.8.3 OFX Spec"
 * @return {String} Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
TransferProfile.prototype.getProcessEndTime = function() {
  return this.processEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 10, owner: TransferProfile, /*type: String,*/ fcn: "getProcessEndTime"});


/**
 * Sets the time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.

 * @see "Section 3.2.8.3 OFX Spec"
 * @param {String} processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
TransferProfile.prototype.setProcessEndTime = function(processEndTime) {
  this.processEndTime = processEndTime;
};


TransferProfile.prototype.getSupportsScheduledTransfers = function() {
  return this.supportsScheduledTransfers;
};
Element.add({name: "CANSCHED", required: true, order: 20, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsScheduledTransfers"});


TransferProfile.prototype.setSupportsScheduledTransfers = function(/*Boolean*/ supportsScheduledTransfers) {
  this.supportsScheduledTransfers = supportsScheduledTransfers;
};


/**
 * Requires <CANSCHED>
 * @return {Boolean} Boolean whether supports recurring transfers
 */
TransferProfile.prototype.getSupportsRecurringTransfers = function() {
  return this.supportsRecurringTransfers;
};
Element.add({name: "CANRECUR", required: true, order: 30, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsRecurringTransfers"});


TransferProfile.prototype.setSupportsRecurringTransfers = function(/*Boolean*/ supportsRecurringTransfers) {
  this.supportsRecurringTransfers = supportsRecurringTransfers;
};


/**
 * <CANLOAN>Y must be present for transfers to involve loans
 * @return {Boolean} Boolean whether supports loan transfers
 */
TransferProfile.prototype.getSupportsLoanTransfers = function() {
  return this.supportsLoanTransfers;
};
Element.add({name: "CANLOAN", order: 40, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsLoanTransfers"});


TransferProfile.prototype.setSupportsLoanTransfers = function(/*Boolean*/ supportsLoanTransfers) {
  this.supportsLoanTransfers = supportsLoanTransfers;
};


TransferProfile.prototype.getSupportsScheduledLoanTransfers = function() {
  return this.supportsScheduledLoanTransfers;
};
Element.add({name: "CANSCHEDLOAN", order: 50, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsScheduledLoanTransfers"});


TransferProfile.prototype.setSupportsScheduledLoanTransfers = function(/*Boolean*/ supportsScheduledLoanTransfers) {
  this.supportsScheduledLoanTransfers = supportsScheduledLoanTransfers;
};


TransferProfile.prototype.getSupportsRecurringLoanTransfers = function() {
  return this.supportsRecurringLoanTransfers;
};
Element.add({name: "CANRECURLOAN", order: 60, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsRecurringLoanTransfers"});


TransferProfile.prototype.setSupportsRecurringLoanTransfers = function(/*Boolean*/ supportsRecurringLoanTransfers) {
  this.supportsRecurringLoanTransfers = supportsRecurringLoanTransfers;
};


TransferProfile.prototype.getSupportsTransferModification = function() {
  return this.supportsTransferModification;
};
Element.add({name: "CANMODXFERS", required: true, order: 70, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsTransferModification"});


TransferProfile.prototype.setSupportsTransferModification = function(/*Boolean*/ supportsTransferModification) {
  this.supportsTransferModification = supportsTransferModification;
};


TransferProfile.prototype.getSupportsModelModification = function() {
  return this.supportsModelModification;
};
Element.add({name: "CANMODMDLS", required: true, order: 80, owner: TransferProfile, /*type: Boolean,*/ fcn: "getSupportsModelModification"});


TransferProfile.prototype.setSupportsModelModification = function(/*Boolean*/ supportsModelModification) {
  this.supportsModelModification = supportsModelModification;
};


/**
 * Model window
 * the number of days before a recurring transaction is scheduled to be processed that it is
 * instantiated on the system
 * @return {Integer} Integer number of days before a recurring transaction is scheduled to be processed that it is instantiated on the system
 */
TransferProfile.prototype.getModelWindow = function() {
  return this.modelWindow;
};
Element.add({name: "MODELWND", required: true, order: 90, owner: TransferProfile, /*type: Integer,*/ fcn: "getModelWindow"});


TransferProfile.prototype.setModelWindow = function(/*Integer*/ modelWindow) {
  this.modelWindow = modelWindow;
};


/**
 * Number of days before processing date that funds are withdrawn
 * @return {Integer} Integer number of days before processing date that funds are withdrawn
 */
TransferProfile.prototype.getWithdrawnDays = function() {
  return this.withdrawnDays;
};
Element.add({name: "DAYSWITH", required: true, order: 100, owner: TransferProfile, /*type: Integer,*/ fcn: "getWithdrawnDays"});


TransferProfile.prototype.setWithdrawnDays = function(/*Integer*/ withdrawnDays) {
  this.withdrawnDays = withdrawnDays;
};


/**
 * Default number of days to pay
 * @return {Integer} Integer Default number of days to pay
 */
TransferProfile.prototype.getDefaultDaysToPay = function() {
  return this.defaultDaysToPay;
};
Element.add({name: "DFLTDAYSTOPAY", required: true, order: 110, owner: TransferProfile, /*type: Integer,*/ fcn: "getDefaultDaysToPay"});


TransferProfile.prototype.setDefaultDaysToPay = function(/*Integer*/ defaultDaysToPay) {
  this.defaultDaysToPay = defaultDaysToPay;
};




module.exports = TransferProfile;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  ImageProfile: require("./ImageProfile"),
  TransferProfile: require("./TransferProfile")
};

},{"./ImageProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/ImageProfile.js","./TransferProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/TransferProfile.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  banking: require("./banking/index"),
  common: require("./common/index"),
  signup: require("./signup/index"),

  BankingMessageSetInfo: require("./BankingMessageSetInfo"),
  BankingV1MessageSetInfo: require("./BankingV1MessageSetInfo"),
  BillpayMessageSetInfo: require("./BillpayMessageSetInfo"),
  BillpayV1MessageSetInfo: require("./BillpayV1MessageSetInfo"),
  CreditCardMessageSetInfo: require("./CreditCardMessageSetInfo"),
  CreditCardV1MessageSetInfo: require("./CreditCardV1MessageSetInfo"),
  EmailMessageSetInfo: require("./EmailMessageSetInfo"),
  EmailV1MessageSetInfo: require("./EmailV1MessageSetInfo"),
  InterbankTransferMessageSetInfo: require("./InterbankTransferMessageSetInfo"),
  InterbankTransferV1MessageSetInfo: require("./InterbankTransferV1MessageSetInfo"),
  InvestmentMessageSetInfo: require("./InvestmentMessageSetInfo"),
  InvestmentV1MessageSetInfo: require("./InvestmentV1MessageSetInfo"),
  ProfileMessageSetInfo: require("./ProfileMessageSetInfo"),
  ProfileV1MessageSetInfo: require("./ProfileV1MessageSetInfo"),
  SecurityListMessageSetInfo: require("./SecurityListMessageSetInfo"),
  SecurityListV1MessageSetInfo: require("./SecurityListV1MessageSetInfo"),
  SignOnMessageSetInfo: require("./SignOnMessageSetInfo"),
  SignOnV1MessageSetInfo: require("./SignOnV1MessageSetInfo"),
  SignupMessageSetInfo: require("./SignupMessageSetInfo"),
  SignupV1MessageSetInfo: require("./SignupV1MessageSetInfo"),
  WireTransferMessageSetInfo: require("./WireTransferMessageSetInfo"),
  WireTransferV1MessageSetInfo: require("./WireTransferV1MessageSetInfo"),
};

},{"./BankingMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BankingMessageSetInfo.js","./BankingV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BankingV1MessageSetInfo.js","./BillpayMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BillpayMessageSetInfo.js","./BillpayV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/BillpayV1MessageSetInfo.js","./CreditCardMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/CreditCardMessageSetInfo.js","./CreditCardV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/CreditCardV1MessageSetInfo.js","./EmailMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/EmailMessageSetInfo.js","./EmailV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/EmailV1MessageSetInfo.js","./InterbankTransferMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InterbankTransferMessageSetInfo.js","./InterbankTransferV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InterbankTransferV1MessageSetInfo.js","./InvestmentMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InvestmentMessageSetInfo.js","./InvestmentV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/InvestmentV1MessageSetInfo.js","./ProfileMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/ProfileMessageSetInfo.js","./ProfileV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/ProfileV1MessageSetInfo.js","./SecurityListMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SecurityListMessageSetInfo.js","./SecurityListV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SecurityListV1MessageSetInfo.js","./SignOnMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignOnMessageSetInfo.js","./SignOnV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignOnV1MessageSetInfo.js","./SignupMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignupMessageSetInfo.js","./SignupV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/SignupV1MessageSetInfo.js","./WireTransferMessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/WireTransferMessageSetInfo.js","./WireTransferV1MessageSetInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/WireTransferV1MessageSetInfo.js","./banking/index":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/banking/index.js","./common/index":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/common/index.js","./signup/index":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/index.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/ClientEnrollment.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Client Enrollment option, contains indicator as to whether the account number is required as part of enrollment
 * @class
 * @see "Section 8.8 OFX Spec"
 */
function ClientEnrollment () {

  /**
   * @name ClientEnrollment#accountRequired
   * @type Boolean
   * @access private
   */
  this.accountRequired = null;
}



Aggregate.add("CLIENTENROLL", ClientEnrollment);


/**
 * Y if account number is required as part of enrollment
 * @return {Boolean} Boolean
 */
ClientEnrollment.prototype.getAccountRequired = function() {
  return this.accountRequired;
};
Element.add({name: "ACCTREQUIRED", required: true, order: 0, owner: ClientEnrollment, /*type: Boolean,*/ fcn: "getAccountRequired"});


ClientEnrollment.prototype.setAccountRequired = function(/*Boolean*/ accountRequired) {
  this.accountRequired = accountRequired;
};




module.exports = ClientEnrollment;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/OtherEnrollment.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
 * @class
 * @see "Section 8.8 OFX Spec"
 */

function OtherEnrollment () {

  /**
   * @name OtherEnrollment#message
   * @type String
   * @access private
   */
  this.message = null;
}



Aggregate.add("OTHERENROLL", OtherEnrollment);


/**
 * Message to consumer about what to do next (for example, a phone number),
 * @return {String} String
 */
OtherEnrollment.prototype.getMessage = function() {
  return this.message;
};
Element.add({name: "MESSAGE", required: true, order: 0, owner: OtherEnrollment, /*type: String,*/ fcn: "getMessage"});


OtherEnrollment.prototype.setMessage = function(/*String*/ message) {
  this.message = message;
};




module.exports = OtherEnrollment;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/WebEnrollment.js":[function(require,module,exports){
/*
 * Copyright 2012 TheStash
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Web Enrollment option containing URL to direct user for web based enrollment, if supported.
 * @class
 * @see "Section 8.8 OFX Spec"
 */
function WebEnrollment () {

  /**
   * @name WebEnrollment#url
   * @type String
   * @access private
   */
  this.url = null;
}



Aggregate.add("WEBENROLL", WebEnrollment);


/**
 * URL to start enrollment process
 * @return {String} String
 */
WebEnrollment.prototype.getUrl = function() {
  return this.url;
};
Element.add({name: "URL", required: true, order: 0, owner: WebEnrollment, /*type: String,*/ fcn: "getUrl"});


WebEnrollment.prototype.setUrl = function(/*String*/ url) {
  this.url = url;
};




module.exports = WebEnrollment;

},{"../../../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  ClientEnrollment: require("./ClientEnrollment"),
  OtherEnrollment: require("./OtherEnrollment"),
  WebEnrollment: require("./WebEnrollment"),
};

},{"./ClientEnrollment":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/ClientEnrollment.js","./OtherEnrollment":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/OtherEnrollment.js","./WebEnrollment":"/Users/aolson/Developer/ofx4js/src/domain/data/profile/info/signup/WebEnrollment.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

/**
 * Asset class for debt.
 * @see "Section 13.8.5.7, OFX Spec"
 *
 * @enum
 */
var AssetClass = {
  /**
   * Government: 0 or corporate bonds issued in the United States.
   */
  DOMESTIC_BOND: 1,

  /**
   * Government: 2 or corporate bonds issued in foreign countries or the United States.
   */
  INTL_BOND: 3,

  /**
   * Stocks: 4 for US companies with market caps of $2B or more.
   */
  LARGE_STOCK: 5,

  /**
   * Stocks: 6 for US companies with market caps of ~$100M to $2B.
   */
  SMALL_STOCK: 7,

  /**
   * Publicallt: 8 traded stocks for companies based in foreign countries.
   */
  INTL_STOCK: 9,

  /**
   * Stable: 10, short-term investments which provide income that rises and falls with short-term
   * interest: 11 rates.
   */
  MONEY_MARKET: 12,

  /**
   * Investments: 13 which do not fit into any of the other types.
   */
  OTHER: 14,

  fromOfx: function(/*String*/ ofxVal) {
    if ("DOMESTICBOND".equals(ofxVal)) {
      return AssetClass.DOMESTIC_BOND;
    } else if ("INTLBOND".equals(ofxVal)) {
      return AssetClass.INTL_BOND;
    } else if ("LARGESTOCK".equals(ofxVal)) {
      return AssetClass.LARGE_STOCK;
    } else if ("SMALLSTOCK".equals(ofxVal)) {
      return AssetClass.SMALL_STOCK;
    } else if ("INTLSTOCK".equals(ofxVal)) {
      return AssetClass.INTL_STOCK;
    } else if ("MONEYMARKET".equals(ofxVal)) {
      return AssetClass.MONEY_MARKET;
    } else if ("OTHER".equals(ofxVal)) {
      return AssetClass.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = AssetClass;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * Base class for info about the various types of securities.
 * @see "Section 13.8.5.1, OFX Spec"
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all security info as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
function BaseSecurityInfo () {

  /**
   * @name BaseSecurityInfo#securityInfo
   * @type SecurityInfo
   * @access private
   */
  this.securityInfo = null;
}





/**
 * Gets the security info aggregate.
 *
 * @return {SecurityInfo} the security info aggregate.
 */
BaseSecurityInfo.prototype.getSecurityInfo = function() {
  return this.securityInfo;
};
ChildAggregate.add({required: true, order: 10, owner: BaseSecurityInfo, /*type: SecurityInfo,*/ fcn: "getSecurityInfo"});


/**
 * Sets the security info aggregate.
 *
 * @param {SecurityInfo} securityInfo the security info aggregate.
 */
BaseSecurityInfo.prototype.setSecurityInfo = function(securityInfo) {
  this.securityInfo = securityInfo;
};


/**
 * Gets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id
 */
BaseSecurityInfo.prototype.getSecurityId = function() {
  return this.getSecurityInfo().getSecurityId();
};


/**
 * Gets the full name of the security. This is a required field according to the OFX spec.
 *
 * @return {String} the full name of the security.
 */
BaseSecurityInfo.prototype.getSecurityName = function() {
  return this.getSecurityInfo().getSecurityName();
};


/**
 * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the ticket symbol or null if there's no ticker symbol
 */
BaseSecurityInfo.prototype.getTickerSymbol = function() {
  return this.getSecurityInfo().getTickerSymbol();
};


/**
 * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the FI ID number for the security
 */
BaseSecurityInfo.prototype.getFiId = function() {
  return this.getSecurityInfo().getFiId();
};


/**
 * Gets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the rating
 */
BaseSecurityInfo.prototype.getRating = function() {
  return this.getSecurityInfo().getRating();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a noptional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseSecurityInfo.prototype.getUnitPrice = function() {
  return this.getSecurityInfo().getUnitPrice();
};


/**
 * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date as-of for the unit price
 */
BaseSecurityInfo.prototype.getUnitPriceAsOfDate = function() {
  return this.getSecurityInfo().getUnitPriceAsOfDate();
};


/**
 * Gets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the overriding currency code or null to mean the default currency
 */
BaseSecurityInfo.prototype.getCurrencyCode = function() {
  return this.getSecurityInfo().getCurrencyCode();
};


/**
 * Gets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the memo
 */
BaseSecurityInfo.prototype.getMemo = function() {
  return this.getSecurityInfo().getMemo();
};




module.exports = BaseSecurityInfo;

},{"../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CallType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Call type for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @enum
 */
var CallType = {
  CALL: 0,
  PUT: 1,
  PREFUND: 2,
  MATURITY: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("CALL".equals(ofxVal)) {
      return CallType.CALL;
    } else if ("PUT".equals(ofxVal)) {
      return CallType.PUT;
    } else if ("PREFUND".equals(ofxVal)) {
      return CallType.PREFUND;
    } else if ("MATURITY".equals(ofxVal)) {
      return CallType.MATURITY;
    } else {
      return null;
    }
  }
};


module.exports = CallType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CouponFrequency.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Coupon freqency for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @enum
 */
var CouponFrequency = {
  MONTHLY: 0,
  QUARTERLY: 1,
  SEMIANNUAL: 2,
  ANNUAL: 3,
  OTHER: 4,

  fromOfx: function(/*String*/ ofxVal) {
    if ("MONTHLY".equals(ofxVal)) {
      return CouponFrequency.MONTHLY;
    } else if ("QUARTERLY".equals(ofxVal)) {
      return CouponFrequency.QUARTERLY;
    } else if ("SEMIANNUAL".equals(ofxVal)) {
      return CouponFrequency.SEMIANNUAL;
    } else if ("ANNUAL".equals(ofxVal)) {
      return CouponFrequency.ANNUAL;
    } else if ("OTHER".equals(ofxVal)) {
      return CouponFrequency.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = CouponFrequency;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtClass.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * The class of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @enum
 */
var DebtClass = {
  TREASURY: 0,
  MUNICIPAL: 1,
  CORPORATE: 2,
  OTHER: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("TREASURY".equals(ofxVal)) {
      return DebtClass.TREASURY;
    } else if ("MUNICIPAL".equals(ofxVal)) {
      return DebtClass.MUNICIPAL;
    } else if ("CORPORATE".equals(ofxVal)) {
      return DebtClass.CORPORATE;
    } else if ("OTHER".equals(ofxVal)) {
      return DebtClass.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = DebtClass;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var DebtType = require("./DebtType");
var DebtClass = require("./DebtClass");
var CouponFrequency = require("./CouponFrequency");
var CallType = require("./CallType");
var AssetClass = require("./AssetClass");

/**
 * Info about a debt security.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function DebtSecurityInfo () {

  /**
   * @name DebtSecurityInfo#parValue
   * @type Double
   * @access private
   */
  this.parValue = null;

  /**
   * @name DebtSecurityInfo#debtType
   * @type String
   * @access private
   */
  this.debtType = null;

  /**
   * @name DebtSecurityInfo#debtClass
   * @type String
   * @access private
   */
  this.debtClass = null;

  /**
   * @name DebtSecurityInfo#couponRate
   * @type Double
   * @access private
   */
  this.couponRate = null;

  /**
   * @name DebtSecurityInfo#nextMaturityDate
   * @type Date
   * @access private
   */
  this.nextMaturityDate = null;

  /**
   * @name DebtSecurityInfo#couponFrequency
   * @type String
   * @access private
   */
  this.couponFrequency = null;

  /**
   * @name DebtSecurityInfo#callPrice
   * @type Double
   * @access private
   */
  this.callPrice = null;

  /**
   * @name DebtSecurityInfo#yieldToCall
   * @type Double
   * @access private
   */
  this.yieldToCall = null;

  /**
   * @name DebtSecurityInfo#nextCallDate
   * @type Date
   * @access private
   */
  this.nextCallDate = null;

  /**
   * @name DebtSecurityInfo#callType
   * @type String
   * @access private
   */
  this.callType = null;

  /**
   * @name DebtSecurityInfo#yieldToMaturity
   * @type Double
   * @access private
   */
  this.yieldToMaturity = null;

  /**
   * @name DebtSecurityInfo#debtMaturityDate
   * @type Date
   * @access private
   */
  this.debtMaturityDate = null;

  /**
   * @name DebtSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name DebtSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(DebtSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("DEBTINFO", DebtSecurityInfo);


/**
 * Gets the par value of the debt. This is a required field according to the OFX spec.
 *
 * @return {Double} the par value of the debt
 */
DebtSecurityInfo.prototype.getParValue = function() {
  return this.parValue;
};
Element.add({name: "PARVALUE", required:true, order: 20, owner: DebtSecurityInfo, /*type: Double,*/ fcn: "getParValue"});


/**
 * Sets the par value of the debt. This is a required field according to the OFX spec.
 *
 * @param {Double} parValue the par value of the debt
 */
DebtSecurityInfo.prototype.setParValue = function(parValue) {
  this.parValue = parValue;
};


/**
 * Gets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the type of debt
 */
DebtSecurityInfo.prototype.getDebtType = function() {
  return this.debtType;
};
Element.add({name: "DEBTTYPE", required:true, order: 30, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getDebtType"});


/**
 * Sets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
 * OFX spec.
 *
 * @param {String} debtType the type of debt
 */
DebtSecurityInfo.prototype.setDebtType = function(debtType) {
  this.debtType = debtType;
};


/**
 * Gets the type of debt as one of the well-known types.
 *
 * @return {DebtType} the type of debt or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getDebtTypeEnum = function() {
  return DebtType.fromOfx(this.getDebtType());
};


/**
 * Gets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the class of debt
 */
DebtSecurityInfo.prototype.getDebtClass = function() {
  return this.debtClass;
};
Element.add({name: "DEBTCLASS", order: 40, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getDebtClass"});


/**
 * Sets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} debtClass the class of debt
 */
DebtSecurityInfo.prototype.setDebtClass = function(debtClass) {
  this.debtClass = debtClass;
};


/**
 * Gets the class of debt as one of the well-known types.
 *
 * @return {DebtClass} the class of debt or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getDebtClassEnum = function() {
  return DebtClass.fromOfx(this.debtClass);
};


/**
 * Gets the coupon rate of the debt for the next closest call date.
 * This is an optional field according to the OFX spec.
 *
 * @return {Double} the coupon rate
 */
DebtSecurityInfo.prototype.getCouponRate = function() {
  return this.couponRate;
};
Element.add({name: "COUPONRT", order: 50, owner: DebtSecurityInfo, /*type: Double,*/ fcn: "getCouponRate"});


/**
 * Sets the coupon rate of the debt for the next closest call date.
 * This is an optional field according to the OFX spec.
 *
 * @param {Double} couponRate the coupon rate
 */
DebtSecurityInfo.prototype.setCouponRate = function(couponRate) {
  this.couponRate = couponRate;
};


/**
 * Gets the next maturity date for the next coupon.
 * This is an optional field according to the OFX spec.
 *
 * @return {Date} the maturity date for the next coupon
 */
DebtSecurityInfo.prototype.getNextMaturityDate = function() {
  return this.nextMaturityDate;
};
Element.add({name: "DTCOUPON", order: 60, owner: DebtSecurityInfo, /*type: Date,*/ fcn: "getNextMaturityDate"});


/**
 * Sets the next maturity date for the next coupon.
 * This is an optional field according to the OFX spec.
 *
 * @param {Date} nextMaturityDate the maturity date for the next coupon.
 */
DebtSecurityInfo.prototype.setNextMaturityDate = function(nextMaturityDate) {
  this.nextMaturityDate = nextMaturityDate;
};


/**
 * Gets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the coupon frequency
 */
DebtSecurityInfo.prototype.getCouponFrequency = function() {
  return this.couponFrequency;
};
Element.add({name: "COUPONFREQ", order: 70, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getCouponFrequency"});


/**
 * Sets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} couponFrequency the coupon frequency
 */
DebtSecurityInfo.prototype.setCouponFrequency = function(couponFrequency) {
  this.couponFrequency = couponFrequency;
};


/**
 * Gets the coupon frequency as one of the well-known types.
 *
 * @return {CouponFrequency} the coupon frequency or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getCouponFrequencyEnum = function() {
  return CouponFrequency.fromOfx(this.getCouponFrequency());
};


/**
 * Gets the bond price. This is an optional field according to the OFX spec.
 *
 * @return {Double} the bond price
 */
DebtSecurityInfo.prototype.getCallPrice = function() {
  return this.callPrice;
};
Element.add({name: "CALLPRICE", order: 80, owner: DebtSecurityInfo, /*type: Double,*/ fcn: "getCallPrice"});


/**
 * Sets the bond price. This is an optional field according to the OFX spec.
 *
 * @param {Double} callPrice the bond price
 */
DebtSecurityInfo.prototype.setCallPrice = function(callPrice) {
  this.callPrice = callPrice;
};


/**
 * Gets the yield to call as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield to call rate
 */
DebtSecurityInfo.prototype.getYieldToCall = function() {
  return this.yieldToCall;
};
Element.add({name: "YIELDTOCALL", order: 90, owner: DebtSecurityInfo, /*type: Double,*/ fcn: "getYieldToCall"});


/**
 * Sets the yield to call as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yieldToCall the yield to call rate
 */
DebtSecurityInfo.prototype.setYieldToCall = function(yieldToCall) {
  this.yieldToCall = yieldToCall;
};


/**
 * Gets the next call date. This is an optional field according to the OFX spec.
 *
 * @return {Date} the next call date.
 */
DebtSecurityInfo.prototype.getNextCallDate = function() {
  return this.nextCallDate;
};
Element.add({name: "DTCALL", order: 100, owner: DebtSecurityInfo, /*type: Date,*/ fcn: "getNextCallDate"});


/**
 * Sets the next call date. This is an optional field according to the OFX spec.
 *
 * @param {Date} nextCallDate the next call date.
 */
DebtSecurityInfo.prototype.setNextCallDate = function(nextCallDate) {
  this.nextCallDate = nextCallDate;
};


/**
 * Gets the type of call.
 *
 * @return {String} the type of call
 */
DebtSecurityInfo.prototype.getCallType = function() {
  return this.callType;
};
Element.add({name: "CALLTYPE", order: 110, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getCallType"});


/**
 * Sets the type of call.
 *
 * @param {String} callType the type of call
 */
DebtSecurityInfo.prototype.setCallType = function(callType) {
  this.callType = callType;
};


/**
 * Gets the type of call as one of the well-known types.
 *
 * @return {CallType} the type of call or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getCallTypeEnum = function() {
  return CallType.fromOfx(this.getCallType());
};


/**
 * Gets the yield to maturity as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield to call rate
 */
DebtSecurityInfo.prototype.getYieldToMaturity = function() {
  return this.yieldToMaturity;
};
Element.add({name: "YIELDTOMAT", order: 120, owner: DebtSecurityInfo, /*type: Double,*/ fcn: "getYieldToMaturity"});


/**
 * Sets the yield to maturity as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yieldToMaturity the yield to call rate
 */
DebtSecurityInfo.prototype.setYieldToMaturity = function(yieldToMaturity) {
  this.yieldToMaturity = yieldToMaturity;
};


/**
 * Gets the date when the debt matures. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date when the debt matures
 */
DebtSecurityInfo.prototype.getDebtMaturityDate = function() {
  return this.debtMaturityDate;
};
Element.add({name: "DTMAT", order: 130, owner: DebtSecurityInfo, /*type: Date,*/ fcn: "getDebtMaturityDate"});


/**
 * Sets the date when the debt matures. This is an optional field according to the OFX spec.
 *
 * @param {Date} debtMaturityDate the date when the debt matures
 */
DebtSecurityInfo.prototype.setDebtMaturityDate = function(debtMaturityDate) {
  this.debtMaturityDate = debtMaturityDate;
};


/**
 * Gets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the debt
 */
DebtSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add({name: "ASSETCLASS", order: 140, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the debt
 */
DebtSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the debt
 */
DebtSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 150, owner: DebtSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the debt
 */
DebtSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = DebtSecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./AssetClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js","./CallType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CallType.js","./CouponFrequency":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CouponFrequency.js","./DebtClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtClass.js","./DebtType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * The type of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var DebtType = {
  COUPON: 0,
  ZERO: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("COUPON".equals(ofxVal)) {
      return DebtType.COUPON;
    } else if ("ZERO".equals(ofxVal)) {
      return DebtType.ZERO;
    } else {
      return null;
    }
  }
};


module.exports = DebtType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/MutualFundSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var MutualFundType = require("./MutualFundType");

/**
 * Info about a mutual fund security.
 * @see "Section 13.8.5.3, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function MutualFundSecurityInfo () {

  /**
   * @name MutualFundSecurityInfo#mfType
   * @type String
   * @access private
   */
  this.mfType = null;

  /**
   * @name MutualFundSecurityInfo#yield
   * @type Double
   * @access private
   */
  this.yield = null;

  /**
   * @name MutualFundSecurityInfo#dateYieldAsOf
   * @type Date
   * @access private
   */
  this.dateYieldAsOf = null;
}

inherit(MutualFundSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("MFINFO", MutualFundSecurityInfo);


/**
 * Gets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
 * according to the OFX spec.
 *
 * @return {String} the mutual fund type
 */
MutualFundSecurityInfo.prototype.getType = function() {
  return this.mfType;
};
Element.add({name: "MFTYPE", order: 20, owner: MutualFundSecurityInfo, /*type: String,*/ fcn: "getType"});


/**
 * Sets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
 * according to the OFX spec.
 *
 * @param {String} mfType the mutual fund type
 */
MutualFundSecurityInfo.prototype.setType = function(mfType) {
  this.mfType = mfType;
};


/**
 * Gets the mutual fund type as one of the well-known types.
 *
 * @return {MutualFundType} the mutual fund type or null if it's not one of the well-known types
 */
MutualFundSecurityInfo.prototype.getTypeEnum = function() {
  return MutualFundType.fromOfx(this.getType());
};


/**
 * Gets the yield as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield as a rate
 */
MutualFundSecurityInfo.prototype.getYield = function() {
  return this.yield;
};
Element.add({name: "YIELD", order: 30, owner: MutualFundSecurityInfo, /*type: Double,*/ fcn: "getYield"});


/**
 * Sets the yield as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yield the yield as a rate
 */
MutualFundSecurityInfo.prototype.setYield = function(yield_) {
  this.yield = yield_;
};


/**
 * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @return {Date} the as-of date for the yield
 */
MutualFundSecurityInfo.prototype.getDateYieldAsOf = function() {
  return this.dateYieldAsOf;
};
Element.add({name: "DTYIELDASOF", order: 40, owner: MutualFundSecurityInfo, /*type: Date,*/ fcn: "getDateYieldAsOf"});


/**
 * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @param {Date} dateYieldAsOf the as-of date for the yield
 */
MutualFundSecurityInfo.prototype.setDateYieldAsOf = function(dateYieldAsOf) {
  this.dateYieldAsOf = dateYieldAsOf;
};




module.exports = MutualFundSecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js","./MutualFundType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/MutualFundType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/MutualFundType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * The type of mutual fund.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @enum
 */
var MutualFundType = {
  OPEN_END: 0,
  CLOSE_END: 1,
  OTHER: 2,

  fromOfx: function(/*String*/ ofxVal) {
    if ("OPENEND".equals(ofxVal)) {
      return MutualFundType.OPEN_END;
    } else if ("CLOSEEND".equals(ofxVal)) {
      return MutualFundType.CLOSE_END;
    } else if ("OTHER".equals(ofxVal)) {
      return MutualFundType.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = MutualFundType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OptionSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var OptionType = require("./OptionType");
var AssetClass = require("./AssetClass");

/**
 * Info about an option security.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function OptionSecurityInfo () {

  /**
   * @name OptionSecurityInfo#optionType
   * @type String
   * @access private
   */
  this.optionType = null;

  /**
   * @name OptionSecurityInfo#strikePrice
   * @type Double
   * @access private
   */
  this.strikePrice = null;

  /**
   * @name OptionSecurityInfo#expirationDate
   * @type Date
   * @access private
   */
  this.expirationDate = null;

  /**
   * @name OptionSecurityInfo#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name OptionSecurityInfo#underlyingSecurity
   * @type SecurityId
   * @access private
   */
  this.underlyingSecurity = null;

  /**
   * @name OptionSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name OptionSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(OptionSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("OPTINFO", OptionSecurityInfo);


/**
 * Gets the type of option. One of "PUT" or "CALL". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the option type
 */
OptionSecurityInfo.prototype.getOptionType = function() {
  return this.optionType;
};
Element.add({name: "OPTTYPE", order: 20, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getOptionType"});


/**
 * Sets the type of option. One of "PUT" or "CALL". This is a required field according to the
 * OFX spec.
 *
 * @param {String} optionType the option type
 */
OptionSecurityInfo.prototype.setOptionType = function(optionType) {
  this.optionType = optionType;
};


/**
 * Gets the option type as a well-known enum value.
 *
 * @return {OptionType} the option type or null if it's not one of the well-known types
 */
OptionSecurityInfo.prototype.getOptionTypeEnum = function() {
  return OptionType.fromOfx(this.getOptionType());
};


/**
 * Gets the strike price of the option. This is a required field according to the OFX spec.
 *
 * @return {Double} the option strike price
 */
OptionSecurityInfo.prototype.getStrikePrice = function() {
  return this.strikePrice;
};
Element.add({name: "STRIKEPRICE", order: 30, owner: OptionSecurityInfo, /*type: Double,*/ fcn: "getStrikePrice"});


/**
 * Sets the strike price of the option. This is a required field according to the OFX spec.
 *
 * @param {Double} strikePrice the option strike price
 */
OptionSecurityInfo.prototype.setStrikePrice = function(strikePrice) {
  this.strikePrice = strikePrice;
};


/**
 * Gets the expiration date of the option. This is a required field according to the OFX spec.
 *
 * @return {Date} the expiration date of the option
 */
OptionSecurityInfo.prototype.getExpirationDate = function() {
  return this.expirationDate;
};
Element.add({name: "DTEXPIRE", order: 40, owner: OptionSecurityInfo, /*type: Date,*/ fcn: "getExpirationDate"});


/**
 * Sets the expiration date of the option. This is a required field according to the OFX spec.
 *
 * @param {Date} expirationDate the expiration date of the option
 */
OptionSecurityInfo.prototype.setExpirationDate = function(expirationDate) {
  this.expirationDate = expirationDate;
};


/**
 * Gets the number of shares per option contact. This is a required field according to the OFX
 * spec.
 *
 * @return {Integer} the number of shares per option contact
 */
OptionSecurityInfo.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", order: 50, owner: OptionSecurityInfo, /*type: Integer,*/ fcn: "getSharesPerContact"});


/**
 * Sets the number of shares per option contact. This is a required field according to the OFX
 * spec.
 *
 * @param {Integer} sharesPerContact the number of shares per option contact
 */
OptionSecurityInfo.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets the security id of the underling security. This is an optional field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id of the underlying security
 */
OptionSecurityInfo.prototype.getUnderlyingSecurity = function() {
  return this.underlyingSecurity;
};
Element.add({name: "SECID", order: 60, owner: OptionSecurityInfo, /*type: SecurityId,*/ fcn: "getUnderlyingSecurity"});


/**
 * Sets the security id of the underling security. This is an optional field according to the OFX
 * spec.
 *
 * @param {SecurityId} underlyingSecurity the security id of the underlying security
 */
OptionSecurityInfo.prototype.setUnderlyingSecurity = function(underlyingSecurity) {
  this.underlyingSecurity = underlyingSecurity;
};


/**
 * Gets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the option
 */
OptionSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add({name: "ASSETCLASS", order: 70, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the option
 */
OptionSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
OptionSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the option. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the option
 */
OptionSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 80, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the option. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the option
 */
OptionSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = OptionSecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./AssetClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js","./OptionType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OptionType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OptionType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * Type of option.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @enum
 */
var OptionType = {
  PUT: 0,
  CALL: 1,

  fromOfx: function(/*String*/ ofxVal) {
    if ("PUT".equals(ofxVal)) {
      return OptionType.PUT;
    } else if ("CALL".equals(ofxVal)) {
      return OptionType.CALL;
    } else {
      return null;
    }
  }
};


module.exports = OptionType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OtherSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var AssetClass = require("./AssetClass");

/**
 * Info about any other type of security.
 * @see "Section 13.8.5.5, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function OtherSecurityInfo () {

  /**
   * @name OtherSecurityInfo#typeDesc
   * @type String
   * @access private
   */
  this.typeDesc = null;

  /**
   * @name OtherSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name OtherSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(OtherSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("OTHERINFO", OtherSecurityInfo);


/**
 * Gets a description of the type of security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the description of the security
 */
OtherSecurityInfo.prototype.getTypeDesc = function() {
  return this.typeDesc;
};
Element.add({name: "TYPEDESC", order: 20, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getTypeDesc"});


/**
 * Sets a description of the type of security. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} typeDesc the description of the security
 */
OtherSecurityInfo.prototype.setTypeDesc = function(typeDesc) {
  this.typeDesc = typeDesc;
};


/**
 * Gets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the debt
 */
OtherSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add({name: "ASSETCLASS", order: 30, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the debt
 */
OtherSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
OtherSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the debt
 */
OtherSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 40, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the debt
 */
OtherSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = OtherSecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./AssetClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityId.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Identifier for a security.
 * @see "Section 13.8.1, OFX Spec"
 *
 * @class
 */
function SecurityId () {

  /**
   * @name SecurityId#uniqueId
   * @type String
   * @access private
   */
  this.uniqueId = null;

  /**
   * @name SecurityId#uniqueIdType
   * @type String
   * @access private
   */
  this.uniqueIdType = null;
}



Aggregate.add("SECID", SecurityId);


/**
 * Gets the unique id for the security. This is a required field according to the OFX spec.
 *
 * @return {String} the unique id
 */
SecurityId.prototype.getUniqueId = function() {
  return this.uniqueId;
};
Element.add({name: "UNIQUEID", required: true, order: 10, owner: SecurityId, /*type: String,*/ fcn: "getUniqueId"});


/**
 * Sets the unique id for the security. This is a required field according to the OFX spec.
 *
 * @param {String} uniqueId the unique id
 */
SecurityId.prototype.setUniqueId = function(uniqueId) {
  this.uniqueId = uniqueId;
};


/**
 * Gets the type of unique id.
 *
 * @return {String} the type of unique id
 */
SecurityId.prototype.getUniqueIdType = function() {
  return this.uniqueIdType;
};
Element.add({name: "UNIQUEIDTYPE", required: true, order: 20, owner: SecurityId, /*type: String,*/ fcn: "getUniqueIdType"});


/**
 * Sets the type of unique id.
 *
 * @param {String} uniqueIdType the type of unique id
 */
SecurityId.prototype.setUniqueIdType = function(uniqueIdType) {
  this.uniqueIdType = uniqueIdType;
};




module.exports = SecurityId;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

//import java.util.Date;

/**
 * Info about a security.
 * @see "Section 13.8.5.1, OFX Spec"
 *
 * @class
 */
function SecurityInfo () {

  /**
   * @name SecurityInfo#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SecurityInfo#securityName
   * @type String
   * @access private
   */
  this.securityName = null;

  /**
   * @name SecurityInfo#tickerSymbol
   * @type String
   * @access private
   */
  this.tickerSymbol = null;

  /**
   * @name SecurityInfo#fiId
   * @type String
   * @access private
   */
  this.fiId = null;

  /**
   * @name SecurityInfo#rating
   * @type String
   * @access private
   */
  this.rating = null;

  /**
   * @name SecurityInfo#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name SecurityInfo#marketValueDate
   * @type Date
   * @access private
   */
  this.marketValueDate = null;

  /**
   * @name SecurityInfo#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SecurityInfo#memo
   * @type String
   * @access private
   */
  this.memo = null;
}



Aggregate.add("SECINFO", SecurityInfo);


/**
 * Gets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id
 */
SecurityInfo.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 10, owner: SecurityInfo, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @param {SecurityId} securityId the security id
 */
SecurityInfo.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the full name of the security. This is a required field according to the OFX spec.
 *
 * @return {String} the full name of the security
 */
SecurityInfo.prototype.getSecurityName = function() {
  return this.securityName;
};
Element.add({name: "SECNAME", required: true, order: 20, owner: SecurityInfo, /*type: String,*/ fcn: "getSecurityName"});


/**
 * Sets the full name of the security. This is a required field according to the OFX spec.
 *
 * @param {String} securityName the full name of the security
 */
SecurityInfo.prototype.setSecurityName = function(securityName) {
  this.securityName = securityName;
};


/**
 * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the ticket symbol or null if there's no ticker symbol
 */
SecurityInfo.prototype.getTickerSymbol = function() {
  return this.tickerSymbol;
};
Element.add({name: "TICKER", order: 30, owner: SecurityInfo, /*type: String,*/ fcn: "getTickerSymbol"});


/**
 * Sets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @param {String} tickerSymbol the ticket symbol or null if there's no ticker symbol
 */
SecurityInfo.prototype.setTickerSymbol = function(tickerSymbol) {
  this.tickerSymbol = tickerSymbol;
};


/**
 * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the FI ID number for the security
 */
SecurityInfo.prototype.getFiId = function() {
  return this.fiId;
};
Element.add({name: "FIID", order: 40, owner: SecurityInfo, /*type: String,*/ fcn: "getFiId"});


/**
 * Sets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @param {String} fiId the FI ID number for the security
 */
SecurityInfo.prototype.setFiId = function(fiId) {
  this.fiId = fiId;
};


/**
 * Gets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the rating
 */
SecurityInfo.prototype.getRating = function() {
  return this.rating;
};
Element.add({name: "RATING", order: 50, owner: SecurityInfo, /*type: String,*/ fcn: "getRating"});


/**
 * Sets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @param {String} rating the rating
 */
SecurityInfo.prototype.setRating = function(rating) {
  this.rating = rating;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a noptional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
SecurityInfo.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", order: 60, owner: SecurityInfo, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
SecurityInfo.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date as-of for the unit price
 */
SecurityInfo.prototype.getUnitPriceAsOfDate = function() {
  return this.marketValueDate;
};
Element.add({name: "DTASOF", order: 70, owner: SecurityInfo, /*type: Date,*/ fcn: "getUnitPriceAsOfDate"});


/**
 * Sets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * param marketValueDate the date as-of for the unit price
 */
SecurityInfo.prototype.setUnitPriceAsOfDate = function(/*Date*/ marketValueDate) {
  this.marketValueDate = marketValueDate;
};


/**
 * Gets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the overriding currency code or null to mean the default currency
 */
SecurityInfo.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: SecurityInfo, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @param {String} currencyCode the overriding currency code or null to mean the default currency
 */
SecurityInfo.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * Gets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the memo
 */
SecurityInfo.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 90, owner: SecurityInfo, /*type: String,*/ fcn: "getMemo"});


/**
 * Sets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} memo the memo
 */
SecurityInfo.prototype.setMemo = function(memo) {
  this.memo = memo;
};




module.exports = SecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityList.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * Aggregate for a list of securities.
 * @see "Section 13.8.4, OFX Spec"
 *
 * @class
 */
function SecurityList () {

  /**
   * @name SecurityList#securityInfos
   * @type List<BaseSecurityInfo>
   * @access private
   */
  this.securityInfos = null;
}



Aggregate.add("SECLIST", SecurityList);


SecurityList.prototype.getSecurityInfos = function() {
  return this.securityInfos;
};
ChildAggregate.add({order: 10, owner: SecurityList, /*type: BaseSecurityInfo[],*/ fcn: "getSecurityInfos"});


SecurityList.prototype.setSecurityInfos = function(/*BaseSecurityInfo[]*/ securityInfos) {
  this.securityInfos = securityInfos;
};




module.exports = SecurityList;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * Request aggregate for the security list.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @class
 */
function SecurityListRequest () {

  /**
   * @name SecurityListRequest#securityRequests
   * @type List<SecurityRequest>
   * @access private
   */
  this.securityRequests = null;
}

inherit(SecurityListRequest, "extends", RequestMessage);


Aggregate.add("SECLISTRQ", SecurityListRequest);


SecurityListRequest.prototype.getSecurityRequests = function() {
  return this.securityRequests;
};
ChildAggregate.add({required: true, order: 10, owner: SecurityListRequest, /*type: SecurityRequest[],*/ fcn: "getSecurityRequests"});


SecurityListRequest.prototype.setSecurityRequests = function(/*SecurityRequest[]*/ securityRequests) {
  this.securityRequests = securityRequests;
};




module.exports = SecurityListRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * Security list request message set.
 * @see "Section 13.7.2.2.1, OFX Spec"
 *
 * @class
 * @augments RequestMessageSet
 */
function SecurityListRequestMessageSet () {

  /**
   * @name SecurityListRequestMessageSet#securityListRequest
   * @type SecurityListRequestTransaction
   * @access private
   */
  this.securityListRequest = null;
}

inherit(SecurityListRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SECLISTMSGSRQV1", SecurityListRequestMessageSet);


SecurityListRequestMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the security list request.
 *
 * @return {SecurityListRequestTransaction} the request
 */
SecurityListRequestMessageSet.prototype.getSecurityListRequest = function() {
  return this.securityListRequest;
};
ChildAggregate.add({order: 0, owner: SecurityListRequestMessageSet, /*type: SecurityListRequestTransaction,*/ fcn: "getSecurityListRequest"});


/**
 * Sets the security list request.
 *
 * @param {SecurityListRequestTransaction} statementRequest the request
 */
SecurityListRequestMessageSet.prototype.setSecurityListRequest = function(statementRequest) {
  this.securityListRequest = statementRequest;
};


// Inherited.
SecurityListRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getSecurityListRequest() !== null) {
    requestMessages.push(this.getSecurityListRequest());
  }
  return requestMessages;
};




module.exports = SecurityListRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityListRequest = require("./SecurityListRequest");

/**
 * Security list transaction request.
 * @see "Section 13.8.2.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function SecurityListRequestTransaction () {

  /**
   * @name SecurityListRequestTransaction#message
   * @type SecurityListRequest
   * @access private
   */
  this.message = null;
}

inherit(SecurityListRequestTransaction, "extends", new TransactionWrappedRequestMessage(SecurityListRequest));


Aggregate.add("SECLISTTRNRQ", SecurityListRequestTransaction);


/**
 * The message.
 *
 * @return {SecurityListRequest} The message.
 */
SecurityListRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: SecurityListRequestTransaction, /*type: SecurityListRequest,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {SecurityListRequest} message The message.
 *
 */
SecurityListRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
SecurityListRequestTransaction.prototype.setWrappedMessage = function(/*SecurityListRequest*/ message) {
  this.setMessage(message);
};




module.exports = SecurityListRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./SecurityListRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");

/**
 * Security list response. This is an empty aggregate. The actual security information is included
 * in the "SECLIST" aggregate.
 * @see "Section 13.8.3, OFX Spec"
 *
 * @class
 * @augments ResponseMessage
 */
function SecurityListResponse () {
}

inherit(SecurityListResponse, "extends", ResponseMessage);


Aggregate.add("SECLISTRS", SecurityListResponse);


SecurityListResponse.prototype.getResponseMessageName = function() {
  return "security list";
};




module.exports = SecurityListResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessageSet
 */
function SecurityListResponseMessageSet () {

  /**
   * @name SecurityListResponseMessageSet#securityListResponse
   * @type SecurityListResponseTransaction
   * @access private
   */
  this.securityListResponse = null;

  /**
   * @name SecurityListResponseMessageSet#securityList
   * @type SecurityList
   * @access private
   */
  this.securityList = null;
}

inherit(SecurityListResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SECLISTMSGSRSV1", SecurityListResponseMessageSet);


SecurityListResponseMessageSet.prototype.getType = function() {
  return MessageSetType.investment_security;
};


/**
 * The security list response list transaction.
 *
 * Most OFX files have a single security response.
 *
 * @return {SecurityListResponseTransaction} The security list response list.
 */
SecurityListResponseMessageSet.prototype.getSecurityListResponse = function() {
  return this.securityListResponse;
};
ChildAggregate.add({order: 0, owner: SecurityListResponseMessageSet, /*type: SecurityListResponseTransaction,*/ fcn: "getSecurityListResponse"});


/**
 * The security list response.
 *
 * @param {SecurityListResponseTransaction} securityListResponse The security list response.
 */
SecurityListResponseMessageSet.prototype.setSecurityListResponse = function(securityListResponse) {
  this.securityListResponse = securityListResponse;
};


SecurityListResponseMessageSet.prototype.getSecurityList = function() {
  return this.securityList;
};
ChildAggregate.add({order: 10, owner: SecurityListResponseMessageSet, /*type: SecurityList,*/ fcn: "getSecurityList"});


SecurityListResponseMessageSet.prototype.setSecurityList = function(/*SecurityList*/ securityList) {
  this.securityList = securityList;
};


// Inherited.
SecurityListResponseMessageSet.prototype.getResponseMessages = function() {
  var ret = [];
  ret.push(this.securityListResponse);
  return ret;
};




module.exports = SecurityListResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityListResponse = require("./SecurityListResponse");

/**
 * Security list transaction response.
 * @see "Section 13.8.3.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function SecurityListResponseTransaction () {

  /**
   * @name SecurityListResponseTransaction#message
   * @type SecurityListResponse
   * @access private
   */
  this.message = null;
}

inherit(SecurityListResponseTransaction, "extends", new TransactionWrappedResponseMessage(SecurityListResponse));


Aggregate.add("SECLISTTRNRS", SecurityListResponseTransaction);


/**
 * The message.
 *
 * @return {SecurityListResponse} The message.
 */
SecurityListResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: SecurityListResponseTransaction, /*type: SecurityListResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {SecurityListResponse} message The message.
 */
SecurityListResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
SecurityListResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = SecurityListResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./SecurityListResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Security request aggregate.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @class
 */
function SecurityRequest () {

  /**
   * @name SecurityRequest#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SecurityRequest#tickerSymbol
   * @type String
   * @access private
   */
  this.tickerSymbol = null;

  /**
   * @name SecurityRequest#fiId
   * @type String
   * @access private
   */
  this.fiId = null;
}



Aggregate.add("SECRQ", SecurityRequest);


SecurityRequest.prototype.getSecurityId = function() {
  return this.securityId;
};
Element.add({name: "SECID", order: 10, owner: SecurityRequest, /*type: SecurityId,*/ fcn: "getSecurityId"});


SecurityRequest.prototype.setSecurityId = function(/*SecurityId*/ securityId) {
  this.securityId = securityId;
  this.tickerSymbol = null;
  this.fiId = null;
};


SecurityRequest.prototype.getTickerSymbol = function() {
  return this.tickerSymbol;
};
Element.add({name: "TICKER", order: 20, owner: SecurityRequest, /*type: String,*/ fcn: "getTickerSymbol"});


SecurityRequest.prototype.setTickerSymbol = function(/*String*/ tickerSymbol) {
  this.tickerSymbol = tickerSymbol;
  this.securityId = null;
  this.fiId = null;
};


SecurityRequest.prototype.getFiId = function() {
  return this.fiId;
};
Element.add({name: "FIID", order: 30, owner: SecurityRequest, /*type: String,*/ fcn: "getFiId"});


SecurityRequest.prototype.setFiId = function(/*String*/ fiId) {
  this.fiId = fiId;
  this.securityId = null;
  this.tickerSymbol = null;
};




module.exports = SecurityRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/StockSecurityInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var StockType = require("./StockType");
var AssetClass = require("./AssetClass");

/**
 * Info about a stock security.
 * @see "Section 13.8.5.6, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function StockSecurityInfo () {

  /**
   * @name StockSecurityInfo#stockType
   * @type String
   * @access private
   */
  this.stockType = null;

  /**
   * @name StockSecurityInfo#yield
   * @type Double
   * @access private
   */
  this.yield = null;

  /**
   * @name StockSecurityInfo#dateYieldAsOf
   * @type Date
   * @access private
   */
  this.dateYieldAsOf = null;

  /**
   * @name StockSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name StockSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(StockSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("STOCKINFO", StockSecurityInfo);


/**
 * Gets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
 * optional field according to the OFX spec.
 *
 * @return {String} the type of stock
 */
StockSecurityInfo.prototype.getType = function() {
  return this.stockType;
};
Element.add({name: "STOCKTYPE", order: 20, owner: StockSecurityInfo, /*type: String,*/ fcn: "getType"});


/**
 * Sets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
 * optional field according to the OFX spec.
 *
 * @param {String} stockType the type of stock
 */
StockSecurityInfo.prototype.setType = function(stockType) {
  this.stockType = stockType;
};


/**
 * Gets the type of stock as one of the well-known types.
 *
 * @return {StockType} the type of stock or null if it's not one of the well-known types
 */
StockSecurityInfo.prototype.getTypeEnum = function() {
  return StockType.fromOfx(this.getType());
};


/**
 * Gets the current yield reported as the dividend expressed as a portion of the current stock
 * price, a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the dividend yield
 */
StockSecurityInfo.prototype.getYield = function() {
  return this.yield;
};
Element.add({name: "YIELD", order: 30, owner: StockSecurityInfo, /*type: Double,*/ fcn: "getYield"});


/**
 * Sets the current yield reported as the dividend expressed as a portion of the current stock
 * price, a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yield the dividend yield
 */
StockSecurityInfo.prototype.setYield = function(yield_) {
  this.yield = yield_;
};


/**
 * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @return {Date} the as-of date for the yield
 */
StockSecurityInfo.prototype.getDateYieldAsOf = function() {
  return this.dateYieldAsOf;
};
Element.add({name: "DTYIELDASOF", order: 40, owner: StockSecurityInfo, /*type: Date,*/ fcn: "getDateYieldAsOf"});


/**
 * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @param {Date} dateYieldAsOf the as-of date for the yield
 */
StockSecurityInfo.prototype.setDateYieldAsOf = function(dateYieldAsOf) {
  this.dateYieldAsOf = dateYieldAsOf;
};


/**
 * Gets the asset class of the stock. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the stock
 */
StockSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add({name: "ASSETCLASS", order: 50, owner: StockSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the stock. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the stock
 */
StockSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
StockSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the stock. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the stock
 */
StockSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 60, owner: StockSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the stock. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the stock
 */
StockSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = StockSecurityInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","./AssetClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js","./StockType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/StockType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/StockType.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * The type of debt.
 * @see "Section 13.8.5.6, OFX Spec"
 *
 * @enum
 */
var StockType = {
  COMMON: 0,
  PREFERRED: 1,
  CONVERTIBLE: 2,
  OTHER: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("COMMON".equals(ofxVal)) {
      return StockType.COMMON;
    } else if ("PREFERRED".equals(ofxVal)) {
      return StockType.PREFERRED;
    } else if ("CONVERTIBLE".equals(ofxVal)) {
      return StockType.CONVERTIBLE;
    } else if ("OTHER".equals(ofxVal)) {
      return StockType.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = StockType;

},{}],"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  AssetClass: require("./AssetClass"),
  BaseSecurityInfo: require("./BaseSecurityInfo"),
  CallType: require("./CallType"),
  CouponFrequency: require("./CouponFrequency"),
  DebtClass: require("./DebtClass"),
  DebtSecurityInfo: require("./DebtSecurityInfo"),
  DebtType: require("./DebtType"),
  MutualFundSecurityInfo: require("./MutualFundSecurityInfo"),
  MutualFundType: require("./MutualFundType"),
  OptionSecurityInfo: require("./OptionSecurityInfo"),
  OptionType: require("./OptionType"),
  OtherSecurityInfo: require("./OtherSecurityInfo"),
  SecurityId: require("./SecurityId"),
  SecurityInfo: require("./SecurityInfo"),
  SecurityList: require("./SecurityList"),
  SecurityListRequest: require("./SecurityListRequest"),
  SecurityListRequestMessageSet: require("./SecurityListRequestMessageSet"),
  SecurityListRequestTransaction: require("./SecurityListRequestTransaction"),
  SecurityListResponse: require("./SecurityListResponse"),
  SecurityListResponseMessageSet: require("./SecurityListResponseMessageSet"),
  SecurityListResponseTransaction: require("./SecurityListResponseTransaction"),
  SecurityRequest: require("./SecurityRequest"),
  StockSecurityInfo: require("./StockSecurityInfo"),
  StockType: require("./StockType"),
};

},{"./AssetClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/AssetClass.js","./BaseSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/BaseSecurityInfo.js","./CallType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CallType.js","./CouponFrequency":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/CouponFrequency.js","./DebtClass":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtClass.js","./DebtSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtSecurityInfo.js","./DebtType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/DebtType.js","./MutualFundSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/MutualFundSecurityInfo.js","./MutualFundType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/MutualFundType.js","./OptionSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OptionSecurityInfo.js","./OptionType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OptionType.js","./OtherSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/OtherSecurityInfo.js","./SecurityId":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityId.js","./SecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityInfo.js","./SecurityList":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityList.js","./SecurityListRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequest.js","./SecurityListRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequestMessageSet.js","./SecurityListRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListRequestTransaction.js","./SecurityListResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponse.js","./SecurityListResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponseMessageSet.js","./SecurityListResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityListResponseTransaction.js","./SecurityRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/SecurityRequest.js","./StockSecurityInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/StockSecurityInfo.js","./StockType":"/Users/aolson/Developer/ofx4js/src/domain/data/seclist/StockType.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/FinancialInstitution.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function FinancialInstitution () {

  /**
   * @name FinancialInstitution#id
   * @type String
   * @access private
   */
  this.id = null;

  /**
   * @name FinancialInstitution#organization
   * @type String
   * @access private
   */
  this.organization = null;
}



Aggregate.add("FI", FinancialInstitution);


/**
 * Financial institution id.
 *
 * @return {String} Financial institution id.
 */
FinancialInstitution.prototype.getId = function() {
  return this.id;
};
Element.add({name: "FID", order: 10, owner: FinancialInstitution, /*type: String,*/ fcn: "getId"});


/**
 * Financial institution id.
 *
 * @param {String} id Financial institution id.
 */
FinancialInstitution.prototype.setId = function(id) {
  this.id = id;
};


/**
 * The organization.
 *
 * @return {String} The organization.
 */
FinancialInstitution.prototype.getOrganization = function() {
  return this.organization;
};
Element.add({name: "ORG", required: true, order: 0, owner: FinancialInstitution, /*type: String,*/ fcn: "getOrganization"});


/**
 * The organization.
 *
 * @param {String} organization The organization.
 */
FinancialInstitution.prototype.setOrganization = function(organization) {
  this.organization = organization;
};




module.exports = FinancialInstitution;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Request to change a user password.
 *
 * @class
 * @see "Section 2.5.2.1, OFX Spec."
 */
function PasswordChangeRequest () {

  /**
   * @name PasswordChangeRequest#userId
   * @type String
   * @access private
   */
  this.userId = null;

  /**
   * @name PasswordChangeRequest#newPassword
   * @type String
   * @access private
   */
  this.newPassword = null;
}

inherit(PasswordChangeRequest, "extends", RequestMessage);


Aggregate.add("PINCHRQ", PasswordChangeRequest);


/**
 * The id of the user changing password.
 *
 * @return {String} The id of the user changing password.
 */
PasswordChangeRequest.prototype.getUserId = function() {
  return this.userId;
};
Element.add({name: "USERID", required: true, order: 0, owner: PasswordChangeRequest, /*type: String,*/ fcn: "getUserId"});


/**
 * The id of the user changing password.
 *
 * @param {String} userId The id of the user changing password.
 */
PasswordChangeRequest.prototype.setUserId = function(userId) {
  this.userId = userId;
};


/**
 * The new password.
 *
 * @return {String} The new password.
 */
PasswordChangeRequest.prototype.getNewPassword = function() {
  return this.newPassword;
};
Element.add({name: "NEWUSERPASS", required: true, order: 10, owner: PasswordChangeRequest, /*type: String,*/ fcn: "getNewPassword"});


/**
 * The new password.
 *
 * @param {String} newPassword The new password.
 */
PasswordChangeRequest.prototype.setNewPassword = function(newPassword) {
  this.newPassword = newPassword;
};




module.exports = PasswordChangeRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var PasswordChangeRequest = require("./PasswordChangeRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function PasswordChangeRequestTransaction () {

  /**
   * @name PasswordChangeRequestTransaction#message
   * @type PasswordChangeRequest
   * @access private
   */
  this.message = null;
}

inherit(PasswordChangeRequestTransaction, "extends", new TransactionWrappedRequestMessage(PasswordChangeRequest));


Aggregate.add("PINCHTRNRQ", PasswordChangeRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {PasswordChangeRequest} The wrapped message.
 */
PasswordChangeRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: PasswordChangeRequestTransaction, /*type: PasswordChangeRequest,*/ fcn: "getMessage"});


/**
 * The wrapped message.
 *
 * @param {PasswordChangeRequest} message The wrapped message.
 */
PasswordChangeRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
PasswordChangeRequestTransaction.prototype.setWrappedMessage = function(/*PasswordChangeRequest*/ message) {
  this.setMessage(message);
};




module.exports = PasswordChangeRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./PasswordChangeRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Response to a change a user password request.
 *
 * @class
 * @augments ResponseMessage
 * @see "Section 2.5.2.2, OFX Spec."
 */
function PasswordChangeResponse () {

  /**
   * @name PasswordChangeResponse#userId
   * @type String
   * @access private
   */
  this.userId = null;

  /**
   * @name PasswordChangeResponse#changeTimestamp
   * @type Date
   * @access private
   */
  this.changeTimestamp = null;
}

inherit(PasswordChangeResponse, "extends", ResponseMessage);


Aggregate.add("PINCHRQ", PasswordChangeResponse);


/**
 * The id of the user changing password.
 *
 * @return {String} The id of the user changing password.
 */
PasswordChangeResponse.prototype.getUserId = function() {
  return this.userId;
};
Element.add({name: "USERID", required: true, order: 0, owner: PasswordChangeResponse, /*type: String,*/ fcn: "getUserId"});


// Inherited.
PasswordChangeResponse.prototype.getResponseMessageName = function() {
  return "password change";
};


/**
 * The id of the user changing password.
 *
 * @param {String} userId The id of the user changing password.
 */
PasswordChangeResponse.prototype.setUserId = function(userId) {
  this.userId = userId;
};


/**
 * The timestamp of the password change.
 *
 * @return {Date} The timestamp of the password change.
 */
PasswordChangeResponse.prototype.getChangeTimestamp = function() {
  return this.changeTimestamp;
};
Element.add({name: "DTCHANGED", order: 10, owner: PasswordChangeResponse, /*type: Date,*/ fcn: "getChangeTimestamp"});


/**
 * The timestamp of the password change.
 *
 * @param {Date} changeTimestamp The timestamp of the password change.
 */
PasswordChangeResponse.prototype.setChangeTimestamp = function(changeTimestamp) {
  this.changeTimestamp = changeTimestamp;
};




module.exports = PasswordChangeResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var PasswordChangeResponse = require("./PasswordChangeResponse");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function PasswordChangeResponseTransaction () {

  /**
   * @name PasswordChangeResponseTransaction#message
   * @type PasswordChangeResponse
   * @access private
   */
  this.message = null;
}

inherit(PasswordChangeResponseTransaction, "extends", new TransactionWrappedResponseMessage(PasswordChangeResponse));


Aggregate.add("PINCHTRNRS", PasswordChangeResponseTransaction);


/**
 * The message.
 *
 * @return {PasswordChangeResponse} The message.
 */
PasswordChangeResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: PasswordChangeResponseTransaction, /*type: PasswordChangeResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {PasswordChangeResponse} message The message.
 */
PasswordChangeResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
PasswordChangeResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = PasswordChangeResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./PasswordChangeResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");
var RequestMessage = require("../RequestMessage");

/**
 * Sign-on request
 *
 * @class
 * @augments RequestMessage
 * @see "Section 2.5.1.2, OFX Spec."
 */
function SignonRequest () {

  /**
   * @name SignonRequest#ANONYMOUS_USER
   * @type String
   */
  this.ANONYMOUS_USER = "anonymous00000000000000000000000";

  /**
   * @name SignonRequest#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name SignonRequest#userId
   * @type String
   * @access private
   */
  this.userId = null;

  /**
   * @name SignonRequest#password
   * @type String
   * @access private
   */
  this.password = null;

  /**
   * @name SignonRequest#userKey
   * @type String
   * @access private
   */
  this.userKey = null;

  /**
   * @name SignonRequest#generateUserKey
   * @type Boolean
   * @access private
   */
  this.generateUserKey = null;

  /**
   * @name SignonRequest#language
   * @type String
   * @access private
   */
  this.language = "ENG";

  /**
   * @name SignonRequest#financialInstitution
   * @type FinancialInstitution
   * @access private
   */
  this.financialInstitution = null;

  /**
   * @name SignonRequest#sessionId
   * @type String
   * @access private
   */
  this.sessionId = null;

  /**
   * @name SignonRequest#applicationId
   * @type String
   * @access private
   */
  this.applicationId = "Money";

  /**
   * @name SignonRequest#applicationVersion
   * @type String
   * @access private
   */
  this.applicationVersion = "1600";

  /**
   * @name SignonRequest#clientUID
   * @type String
   * @access private
   */
  this.clientUID = null;

  /**
   * @name SignonRequest#additionalCredentials1
   * @type String
   * @access private
   */
  this.additionalCredentials1 = null;

  /**
   * @name SignonRequest#additionalCredentials2
   * @type String
   * @access private
   */
  this.additionalCredentials2 = null;

  /**
   * @name SignonRequest#authToken
   * @type String
   * @access private
   */
  this.authToken = null;

  /**
   * @name SignonRequest#accessKey
   * @type String
   * @access private
   */
  this.accessKey = null;
}

inherit(SignonRequest, "extends", RequestMessage);


Aggregate.add("SONRQ", SignonRequest);


/**
 * The date and time of the request.
 *
 * @return {Date} The date and time of the request.
 */
SignonRequest.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTCLIENT", required: true, order: 0, owner: SignonRequest, /*type: Date,*/ fcn: "getTimestamp"});


/**
 * The date and time of the request.
 *
 * @param {Date} timestamp The date and time of the request.
 */
SignonRequest.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * The user id.
 *
 * @return {String} The user id.
 */
SignonRequest.prototype.getUserId = function() {
  return this.userId;
};
Element.add({name: "USERID", order: 10, owner: SignonRequest, /*type: String,*/ fcn: "getUserId"});


/**
 * The user id.
 *
 * @param {String} userId The user id.
 */
SignonRequest.prototype.setUserId = function(userId) {
  this.userId = userId;
};


/**
 * The password.
 *
 * @return {String} The password.
 */
SignonRequest.prototype.getPassword = function() {
  return this.password;
};
Element.add({name: "USERPASS", order: 20, owner: SignonRequest, /*type: String,*/ fcn: "getPassword"});


/**
 * The password.
 *
 * @param {String} password The password.
 */
SignonRequest.prototype.setPassword = function(password) {
  this.password = password;
};


/**
 * The user key provided by the server so as not to require further username/password authentication.
 *
 * @return {String} The user key provided by the server so as not to require further username/password authentication.
 */
SignonRequest.prototype.getUserKey = function() {
  return this.userKey;
};
Element.add({name: "USERKEY", order: 30, owner: SignonRequest, /*type: String,*/ fcn: "getUserKey"});


/**
 * The user key provided by the server so as not to require further username/password authentication.
 *
 * @param {String} userKey The user key provided by the server so as not to require further username/password authentication.
 */
SignonRequest.prototype.setUserKey = function(userKey) {
  this.userKey = userKey;
};


/**
 * Whether to request the server to generate a user key.
 *
 * @return {Boolean} Whether to request the server to generate a user key.
 */
SignonRequest.prototype.getGenerateUserKey = function() {
  return this.generateUserKey;
};
Element.add({name: "GENUSERKEY", order: 40, owner: SignonRequest, /*type: Boolean,*/ fcn: "getGenerateUserKey"});


/**
 * Whether to request the server to generate a user key.
 *
 * @param {Boolean} generateUserKey Whether to request the server to generate a user key.
 */
SignonRequest.prototype.setGenerateUserKey = function(generateUserKey) {
  this.generateUserKey = generateUserKey;
};


/**
 * The three-letter langauge code.
 *
 * @return {String} The three-letter langauge code.
 * @see java.util.Locale#getISO3Language()
 */
SignonRequest.prototype.getLanguage = function() {
  return this.language;
};
Element.add({name: "LANGUAGE", required: true, order: 50, owner: SignonRequest, /*type: String,*/ fcn: "getLanguage"});


/**
 * The three-letter langauge code.
 *
 * @param {String} language The three-letter langauge code.
 */
SignonRequest.prototype.setLanguage = function(language) {
  this.language = language;
};


/**
 * The financial institution.
 *
 * @return {FinancialInstitution} The financial institution.
 */
SignonRequest.prototype.getFinancialInstitution = function() {
  return this.financialInstitution;
};
ChildAggregate.add({order: 60, owner: SignonRequest, /*type: FinancialInstitution,*/ fcn: "getFinancialInstitution"});


/**
 * The financial institution.
 *
 * @param {FinancialInstitution} financialInstitution The financial institution.
 */
SignonRequest.prototype.setFinancialInstitution = function(financialInstitution) {
  this.financialInstitution = financialInstitution;
};


/**
 * The server-supplied session id.
 *
 * @return {String} The server-supplied session id.
 */
SignonRequest.prototype.getSessionId = function() {
  return this.sessionId;
};
Element.add({name: "SESSCOOKIE", order: 70, owner: SignonRequest, /*type: String,*/ fcn: "getSessionId"});


/**
 * The server-supplied session id.
 *
 * @param {String} sessionId The server-supplied session id.
 */
SignonRequest.prototype.setSessionId = function(sessionId) {
  this.sessionId = sessionId;
};


/**
 * The application id.
 *
 * @return {String} The application id.
 */
SignonRequest.prototype.getApplicationId = function() {
  return this.applicationId;
};
Element.add({name: "APPID", required: true, order: 80, owner: SignonRequest, /*type: String,*/ fcn: "getApplicationId"});


/**
 * The application id.
 *
 * @param {String} applicationId The application id.
 */
SignonRequest.prototype.setApplicationId = function(applicationId) {
  this.applicationId = applicationId;
};


/**
 * The application version.
 *
 * @return {String} The application version.
 */
SignonRequest.prototype.getApplicationVersion = function() {
  return this.applicationVersion;
};
Element.add({name: "APPVER", required: true, order: 90, owner: SignonRequest, /*type: String,*/ fcn: "getApplicationVersion"});


/**
 * The application version.
 *
 * @param {String} applicationVersion The application version.
 */
SignonRequest.prototype.setApplicationVersion = function(applicationVersion) {
  this.applicationVersion = applicationVersion;
};


/**
 * The client-supplied UID.
 *
 * @return {String} The client-supplied UID.
 */
SignonRequest.prototype.getClientUID = function() {
  return this.clientUID;
};
Element.add({name: "CLIENTUID", order: 100, owner: SignonRequest, /*type: String,*/ fcn: "getClientUID"});


/**
 * The client-supplied UID.
 *
 * @param {String} clientUID The client-supplied UID.
 */
SignonRequest.prototype.setClientUID = function(clientUID) {
  this.clientUID = clientUID;
};


/**
 * Any additional credentials.
 *
 * @return {String} Any additional credentials.
 */
SignonRequest.prototype.getAdditionalCredentials1 = function() {
  return this.additionalCredentials1;
};
Element.add({name: "USERCRED1", order: 110, owner: SignonRequest, /*type: String,*/ fcn: "getAdditionalCredentials1"});


/**
 * Any additional credentials.
 *
 * @param {String} additionalCredentials1 Any additional credentials.
 */
SignonRequest.prototype.setAdditionalCredentials1 = function(additionalCredentials1) {
  this.additionalCredentials1 = additionalCredentials1;
};


/**
 * Any additional credentials.
 *
 * @return {String} Any additional credentials.
 */
SignonRequest.prototype.getAdditionalCredentials2 = function() {
  return this.additionalCredentials2;
};
Element.add({name: "USERCRED2", order: 120, owner: SignonRequest, /*type: String,*/ fcn: "getAdditionalCredentials2"});


/**
 * Any additional credentials.
 *
 * @param {String} additionalCredentials2 Any additional credentials.
 */
SignonRequest.prototype.setAdditionalCredentials2 = function(additionalCredentials2) {
  this.additionalCredentials2 = additionalCredentials2;
};


/**
 * The authentication token.
 *
 * @return {String} The authentication token.
 */
SignonRequest.prototype.getAuthToken = function() {
  return this.authToken;
};
Element.add({name: "AUTHTOKEN", order: 130, owner: SignonRequest, /*type: String,*/ fcn: "getAuthToken"});


/**
 * The authentication token.
 *
 * @param {String} authToken The authentication token.
 */
SignonRequest.prototype.setAuthToken = function(authToken) {
  this.authToken = authToken;
};


/**
 * The access key.
 *
 * @return {String} The access key.
 */
SignonRequest.prototype.getAccessKey = function() {
  return this.accessKey;
};
Element.add({name: "ACCESSKEY", order: 140, owner: SignonRequest, /*type: String,*/ fcn: "getAccessKey"});


/**
 * The access key.
 *
 * @param {String} accessKey The access key.
 */
SignonRequest.prototype.setAccessKey = function(accessKey) {
  this.accessKey = accessKey;
};




module.exports = SignonRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");

/**
 * The sign-on request message set.
 *
 * @class
 * @augments RequestMessageSet
 * @see "Section 2.5, OFX Spec."
 */
function SignonRequestMessageSet () {

  /**
   * @name SignonRequestMessageSet#signonRequest
   * @type SignonRequest
   * @access private
   */
  this.signonRequest = null;

  /**
   * @name SignonRequestMessageSet#passwordChangeRequest
   * @type PasswordChangeRequestTransaction
   * @access private
   */
  this.passwordChangeRequest = null;
}

inherit(SignonRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SIGNONMSGSRQV1", SignonRequestMessageSet);


SignonRequestMessageSet.prototype.getType = function() {
  return MessageSetType.signon;
};


/**
 * The message for this message set.
 *
 * @return {SignonRequest} The message for this message set.
 */
SignonRequestMessageSet.prototype.getSignonRequest = function() {
  return this.signonRequest;
};
ChildAggregate.add({required: true, order: 0, owner: SignonRequestMessageSet, /*type: SignonRequest,*/ fcn: "getSignonRequest"});


/**
 * The message for this message set.
 *
 * @param {SignonRequest} signonRequest The message for this message set.
 */
SignonRequestMessageSet.prototype.setSignonRequest = function(signonRequest) {
  this.signonRequest = signonRequest;
};


/**
 * The password change request.
 *
 * @return {PasswordChangeRequestTransaction} The password change request.
 */
SignonRequestMessageSet.prototype.getPasswordChangeRequest = function() {
  return this.passwordChangeRequest;
};
ChildAggregate.add({order: 10, owner: SignonRequestMessageSet, /*type: PasswordChangeRequestTransaction,*/ fcn: "getPasswordChangeRequest"});


/**
 * The password change request.
 *
 * @param {PasswordChangeRequestTransaction} passwordChangeRequest The password change request.
 */
SignonRequestMessageSet.prototype.setPasswordChangeRequest = function(passwordChangeRequest) {
  this.passwordChangeRequest = passwordChangeRequest;
};


//todo: challenge request/response
// Inherited.
SignonRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];

  if (this.getSignonRequest() !== null) {
    requestMessages.push(this.getSignonRequest());
  }

  if (this.getPasswordChangeRequest() !== null) {
    requestMessages.this(this.getPasswordChangeRequest());
  }

  return requestMessages;
};




module.exports = SignonRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var StatusHolder = require("../common/StatusHolder");
var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * The signon response message.
 *
 * @class
 * @augments ResponseMessage
 * @augments StatusHolder
 * @see "Section 2.5.1.2, OFX Spec."
 */
function SignonResponse () {

  /**
   * @name SignonResponse#status
   * @type Status
   * @access private
   */
  this.status = null;

  /**
   * @name SignonResponse#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name SignonResponse#userKey
   * @type String
   * @access private
   */
  this.userKey = null;

  /**
   * @name SignonResponse#userKeyExpiration
   * @type Date
   * @access private
   */
  this.userKeyExpiration = null;

  /**
   * @name SignonResponse#language
   * @type String
   * @access private
   */
  this.language = "eng";

  /**
   * @name SignonResponse#profileLastUpdated
   * @type Date
   * @access private
   */
  this.profileLastUpdated = null;

  /**
   * @name SignonResponse#accountLastUpdated
   * @type Date
   * @access private
   */
  this.accountLastUpdated = null;

  /**
   * @name SignonResponse#financialInstitution
   * @type FinancialInstitution
   * @access private
   */
  this.financialInstitution = null;

  /**
   * @name SignonResponse#sessionId
   * @type String
   * @access private
   */
  this.sessionId = null;

  /**
   * @name SignonResponse#accessKey
   * @type String
   * @access private
   */
  this.accessKey = null;
}

inherit(SignonResponse, "extends", ResponseMessage);
inherit(SignonResponse, "implements", StatusHolder);


Aggregate.add("SONRS", SignonResponse);


SignonResponse.prototype.getResponseMessageName = function() {
  return "signon";
};


SignonResponse.prototype.getStatusHolderName = function() {
  return this.getResponseMessageName();
};


/**
 * The signon response status.
 *
 * @return {Status} The signon response status.
 */
SignonResponse.prototype.getStatus = function() {
  return this.status;
};
ChildAggregate.add({required: true, order: 0, owner: SignonResponse, /*type: Status,*/ fcn: "getStatus"});


/**
 * The signon response status.
 *
 * @param {Status} status The signon response status.
 */
SignonResponse.prototype.setStatus = function(status) {
  this.status = status;
};


/**
 * The timestamp of this response.
 *
 * @return {Date} The timestamp of this response.
 */
SignonResponse.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTSERVER", required: true, order: 10, owner: SignonResponse, /*type: Date,*/ fcn: "getTimestamp"});


/**
 * The timestamp of this response.
 *
 * @param {Date} timestamp The timestamp of this response.
 */
SignonResponse.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * The userkey that can be used instead of the username/password.
 *
 * @return {String} The userkey that can be used instead of the username/password.
 */
SignonResponse.prototype.getUserKey = function() {
  return this.userKey;
};
Element.add({name: "USERKEY", order: 20, owner: SignonResponse, /*type: String,*/ fcn: "getUserKey"});


/**
 * The userkey that can be used instead of the username/password.
 *
 * @param {String} userKey The userkey that can be used instead of the username/password.
 */
SignonResponse.prototype.setUserKey = function(userKey) {
  this.userKey = userKey;
};


/**
 * The date/time of the expiration of the user key.
 *
 * @return {Date} The date/time of the expiration of the user key.
 */
SignonResponse.prototype.getUserKeyExpiration = function() {
  return this.userKeyExpiration;
};
Element.add({name: "TSKEYEXPIRE", order: 30, owner: SignonResponse, /*type: Date,*/ fcn: "getUserKeyExpiration"});


/**
 * The date/time of the expiration of the user key.
 *
 * @param {Date} userKeyExpiration The date/time of the expiration of the user key.
 */
SignonResponse.prototype.setUserKeyExpiration = function(userKeyExpiration) {
  this.userKeyExpiration = userKeyExpiration;
};


/**
 * The three-letter langauge code.
 *
 * @return {String} The three-letter langauge code.
 * @see java.util.Locale#getISO3Language()
 */
SignonResponse.prototype.getLanguage = function() {
  return this.language;
};
Element.add({name: "LANGUAGE", required: true, order: 40, owner: SignonResponse, /*type: String,*/ fcn: "getLanguage"});


/**
 * The three-letter langauge code.
 *
 * @param {String} language The three-letter langauge code.
 */
SignonResponse.prototype.setLanguage = function(language) {
  this.language = language;
};


/**
 * The date/time that the FI profile was last updated.
 *
 * @return {Date} The date/time that the FI profile was last updated.
 */
SignonResponse.prototype.getProfileLastUpdated = function() {
  return this.profileLastUpdated;
};
Element.add({name: "DTPROFUP", order: 50, owner: SignonResponse, /*type: Date,*/ fcn: "getProfileLastUpdated"});


/**
 * The date/time that the FI profile was last updated.
 *
 * @param {Date} profileLastUpdated The date/time that the FI profile was last updated.
 */
SignonResponse.prototype.setProfileLastUpdated = function(profileLastUpdated) {
  this.profileLastUpdated = profileLastUpdated;
};


/**
 * The date/time that the user's account information was updated.
 *
 * @return {Date} The date/time that the user's account information was updated.
 */
SignonResponse.prototype.getAccountLastUpdated = function() {
  return this.accountLastUpdated;
};
Element.add({name: "DTACCTUP", order: 60, owner: SignonResponse, /*type: Date,*/ fcn: "getAccountLastUpdated"});


/**
 * The date/time that the user's account information was updated.
 *
 * @param {Date} accountLastUpdated The date/time that the user's account information was updated.
 */
SignonResponse.prototype.setAccountLastUpdated = function(accountLastUpdated) {
  this.accountLastUpdated = accountLastUpdated;
};


/**
 * The financial instutution identity information.
 *
 * @return {FinancialInstitution} The financial instutution identity information.
 */
SignonResponse.prototype.getFinancialInstitution = function() {
  return this.financialInstitution;
};
ChildAggregate.add({order: 70, owner: SignonResponse, /*type: FinancialInstitution,*/ fcn: "getFinancialInstitution"});


/**
 * The financial instutution identity information.
 *
 * @param {FinancialInstitution} financialInstitution The financial instutution identity information.
 */
SignonResponse.prototype.setFinancialInstitution = function(financialInstitution) {
  this.financialInstitution = financialInstitution;
};


/**
 * The session id for the client.
 *
 * @return {String} The session id for the client.
 */
SignonResponse.prototype.getSessionId = function() {
  return this.sessionId;
};
Element.add({name: "SESSCOOKIE", order: 80, owner: SignonResponse, /*type: String,*/ fcn: "getSessionId"});


/**
 * The session id for the client.
 *
 * @param {String} sessionId The session id for the client.
 */
SignonResponse.prototype.setSessionId = function(sessionId) {
  this.sessionId = sessionId;
};


/**
 * The access key that the client should return in the next sign-on requuest.
 *
 * @return {String} The access key that the client should return in the next sign-on requuest.
 */
SignonResponse.prototype.getAccessKey = function() {
  return this.accessKey;
};
Element.add({name: "ACCESSKEY", order: 90, owner: SignonResponse, /*type: String,*/ fcn: "getAccessKey"});


/**
 * The access key that the client should return in the next sign-on requuest.
 *
 * @param {String} accessKey The access key that the client should return in the next sign-on requuest.
 */
SignonResponse.prototype.setAccessKey = function(accessKey) {
  this.accessKey = accessKey;
};




module.exports = SignonResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js","../common/StatusHolder":"/Users/aolson/Developer/ofx4js/src/domain/data/common/StatusHolder.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");

/**
 * The sign-on response message set.
 *
 * @class
 * @augments ResponseMessageSet
 * @see "Section 2.5, OFX Spec."
 */
function SignonResponseMessageSet () {

  /**
   * @name SignonResponseMessageSet#signonResponse
   * @type SignonResponse
   * @access private
   */
  this.signonResponse = null;

  /**
   * @name SignonResponseMessageSet#passwordChangeResponse
   * @type PasswordChangeResponseTransaction
   * @access private
   */
  this.passwordChangeResponse = null;
}

inherit(SignonResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SIGNONMSGSRSV1", SignonResponseMessageSet);


SignonResponseMessageSet.prototype.getType = function() {
  return MessageSetType.signon;
};


/**
 * The message for this message set.
 *
 * @return {SignonResponse} The message for this message set.
 */
SignonResponseMessageSet.prototype.getSignonResponse = function() {
  return this.signonResponse;
};
ChildAggregate.add({order: 0, owner: SignonResponseMessageSet, /*type: SignonResponse,*/ fcn: "getSignonResponse"});


/**
 * The message for this message set.
 *
 * @param {SignonResponse} signonResponse The message for this message set.
 */
SignonResponseMessageSet.prototype.setSignonResponse = function(signonResponse) {
  this.signonResponse = signonResponse;
};


/**
 * The password change response.
 *
 * @return {PasswordChangeResponseTransaction} The password change response.
 */
SignonResponseMessageSet.prototype.getPasswordChangeResponse = function() {
  return this.passwordChangeResponse;
};
ChildAggregate.add({order: 10, owner: SignonResponseMessageSet, /*type: PasswordChangeResponseTransaction,*/ fcn: "getPasswordChangeResponse"});


/**
 * The password change response.
 *
 * @param {PasswordChangeResponseTransaction} passwordChangeResponse The password change response.
 */
SignonResponseMessageSet.prototype.setPasswordChangeResponse = function(passwordChangeResponse) {
  this.passwordChangeResponse = passwordChangeResponse;
};


//todo: challenge request/response
// Inherited.
SignonResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getSignonResponse() !== null) {
    messages.push(this.getSignonResponse());
  }

  return messages;
};




module.exports = SignonResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signon/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  FinancialInstitution: require("./FinancialInstitution"),
  PasswordChangeRequest: require("./PasswordChangeRequest"),
  PasswordChangeRequestTransaction: require("./PasswordChangeRequestTransaction"),
  PasswordChangeResponse: require("./PasswordChangeResponse"),
  PasswordChangeResponseTransaction: require("./PasswordChangeResponseTransaction"),
  SignonRequest: require("./SignonRequest"),
  SignonRequestMessageSet: require("./SignonRequestMessageSet"),
  SignonResponse: require("./SignonResponse"),
  SignonResponseMessageSet: require("./SignonResponseMessageSet"),
};

},{"./FinancialInstitution":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/FinancialInstitution.js","./PasswordChangeRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeRequest.js","./PasswordChangeRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeRequestTransaction.js","./PasswordChangeResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeResponse.js","./PasswordChangeResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/PasswordChangeResponseTransaction.js","./SignonRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonRequest.js","./SignonRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonRequestMessageSet.js","./SignonResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonResponse.js","./SignonResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/signon/SignonResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoRequest.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments RequestMessage
 */
function AccountInfoRequest () {

  /**
   * @name AccountInfoRequest#lastUpdated
   * @type Date
   * @access private
   */
  this.lastUpdated = new Date(0);
}

inherit(AccountInfoRequest, "extends", RequestMessage);


Aggregate.add("ACCTINFORQ", AccountInfoRequest);


/**
 * When the account info was last updated.
 *
 * @return {Date} When the account info was last updated.
 */
AccountInfoRequest.prototype.getLastUpdated = function() {
  return this.lastUpdated;
};
Element.add({name: "DTACCTUP", required: true, order: 0, owner: AccountInfoRequest, /*type: Date,*/ fcn: "getLastUpdated"});


/**
 * When the account info was last updated.
 *
 * @param {Date} lastUpdated When the account info was last updated.
 */
AccountInfoRequest.prototype.setLastUpdated = function(lastUpdated) {
  this.lastUpdated = lastUpdated;
};




module.exports = AccountInfoRequest;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../RequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoRequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var AccountInfoRequest = require("./AccountInfoRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function AccountInfoRequestTransaction () {

  /**
   * @name AccountInfoRequestTransaction#message
   * @type AccountInfoRequest
   * @access private
   */
  this.message = null;
}

inherit(AccountInfoRequestTransaction, "extends", new TransactionWrappedRequestMessage(AccountInfoRequest));


Aggregate.add("ACCTINFOTRNRQ", AccountInfoRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {AccountInfoRequest} The wrapped message.
 */
AccountInfoRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: AccountInfoRequestTransaction, /*type: AccountInfoRequest,*/ fcn: "getMessage"});


/**
 * The wrapped message.
 *
 * @param {AccountInfoRequest} message The wrapped message.
 */
AccountInfoRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
AccountInfoRequestTransaction.prototype.setWrappedMessage = function(/*AccountInfoRequest*/ message) {
  this.setMessage(message);
};




module.exports = AccountInfoRequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./AccountInfoRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoRequest.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoResponse.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessage
 */
function AccountInfoResponse () {

  /**
   * @name AccountInfoResponse#lastUpdated
   * @type Date
   * @access private
   */
  this.lastUpdated = new Date(0);

  /**
   * @name AccountInfoResponse#accounts
   * @type Collection<AccountProfile>
   * @access private
   */
  this.accounts = null;
}

inherit(AccountInfoResponse, "extends", ResponseMessage);


Aggregate.add("ACCTINFORS", AccountInfoResponse);


AccountInfoResponse.prototype.getResponseMessageName = function() {
  return "account info";
};


/**
 * When the account info was last updated.
 *
 * @return {Date} When the account info was last updated.
 */
AccountInfoResponse.prototype.getLastUpdated = function() {
  return this.lastUpdated;
};
Element.add({name: "DTACCTUP", required: true, order: 0, owner: AccountInfoResponse, /*type: Date,*/ fcn: "getLastUpdated"});


/**
 * When the account info was last updated.
 *
 * @param {Date} lastUpdated When the account info was last updated.
 */
AccountInfoResponse.prototype.setLastUpdated = function(lastUpdated) {
  this.lastUpdated = lastUpdated;
};


/**
 * The accounts.
 *
 * @return {Collection<AccountProfile>} The accounts.
 */
AccountInfoResponse.prototype.getAccounts = function() {
  return this.accounts;
};
ChildAggregate.add({order: 10, owner: AccountInfoResponse, /*type: Collection<AccountProfile>,*/ fcn: "getAccounts"});


/**
 * The accounts.
 *
 * @param {Collection<AccountProfile>} accounts The accounts.
 */
AccountInfoResponse.prototype.setAccounts = function(accounts) {
  this.accounts = accounts;
};




module.exports = AccountInfoResponse;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../ResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessage.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var AccountInfoResponse = require("./AccountInfoResponse");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function AccountInfoResponseTransaction () {

  /**
   * @name AccountInfoResponseTransaction#message
   * @type AccountInfoResponse
   * @access private
   */
  this.message = null;
}

inherit(AccountInfoResponseTransaction, "extends", new TransactionWrappedResponseMessage(AccountInfoResponse));


Aggregate.add("ACCTINFOTRNRS", AccountInfoResponseTransaction);


/**
 * The wrapped message.
 *
 * @return {AccountInfoResponse} The wrapped message.
 */
AccountInfoResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: AccountInfoResponseTransaction, /*type: AccountInfoResponse,*/ fcn: "getMessage"});


/**
 * The wrapped message.
 *
 * @param {AccountInfoResponse} message The wrapped message.
 */
AccountInfoResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
AccountInfoResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = AccountInfoResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./AccountInfoResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoResponse.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountProfile.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var InvestmentAccountInfo = require("../investment/accounts/InvestmentAccountInfo");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");
var BankAccountInfo = require("../banking/BankAccountInfo");
var CreditCardAccountInfo = require("../creditcard/CreditCardAccountInfo");

/**
 * @class
 */
function AccountProfile () {

  /**
   * @name AccountProfile#description
   * @type String
   * @access private
   */
  this.description = null;

  /**
   * @name AccountProfile#phone
   * @type String
   * @access private
   */
  this.phone = null;

  /**
   * @name AccountProfile#bankSpecifics
   * @type BankAccountInfo
   * @access private
   */
  this.bankSpecifics = null;

  /**
   * @name AccountProfile#creditCardSpecifics
   * @type CreditCardAccountInfo
   * @access private
   */
  this.creditCardSpecifics = null;

  /**
   * @name AccountProfile#investSpecifics
   * @type InvestmentAccountInfo
   * @access private
   */
  this.investSpecifics = null;
}



Aggregate.add("ACCTINFO", AccountProfile);


/**
 * Description of the account.
 *
 * @return {String} The description of the account.
 */
AccountProfile.prototype.getDescription = function() {
  return this.description;
};
Element.add({name: "DESC", order: 0, owner: AccountProfile, /*type: String,*/ fcn: "getDescription"});


/**
 * The description of the account.
 *
 * @param {String} description The description of the account.
 */
AccountProfile.prototype.setDescription = function(description) {
  this.description = description;
};


/**
 * Phone number for the account.
 *
 * @return {String} Phone number for the account.
 */
AccountProfile.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE", order: 10, owner: AccountProfile, /*type: String,*/ fcn: "getPhone"});


/**
 * Phone number for the account.
 *
 * @param {String} phone Phone number for the account.
 */
AccountProfile.prototype.setPhone = function(phone) {
  this.phone = phone;
};


/**
 * Account specifics.
 *
 * @return {net.sf.ofx4j.domain.data.common.AccountInfo} Account specifics.
 */
AccountProfile.prototype.getSpecifics = function() {
  if (this.getBankSpecifics() !== null && this.getCreditCardSpecifics() !== null) {
    throw new Error("Only one account specifics aggregate can be set at a time.");
  }
  else if (this.getBankSpecifics() !== null) {
    return this.getBankSpecifics();
  } else if (this.getInvestmentSpecifics() !== null) {
    return this.getInvestmentSpecifics();
  }
  else {
    return this.getCreditCardSpecifics();
  }
};


/**
 * Account specifics.
 *
 * @param {net.sf.ofx4j.domain.data.common.AccountInfo} specifics Account specifics.
 */
AccountProfile.prototype.setSpecifics = function(specifics) {
  if (specifics instanceof BankAccountInfo) {
    this.setBankSpecifics(specifics);
  }
  else if (specifics instanceof CreditCardAccountInfo) {
    this.setCreditCardSpecifics(specifics);
  } else if (specifics instanceof InvestmentAccountInfo) {
    this.setInvestmentSpecifics(specifics);
  }
  else {
    throw new Error("Unknown specifics type: " + specifics);
  }
};


/**
 * Bank-specific info.
 *
 * @return {BankAccountInfo} Bank-specific info.
 */
AccountProfile.prototype.getBankSpecifics = function() {
  return this.bankSpecifics;
};
ChildAggregate.add({order: 20, owner: AccountProfile, /*type: BankAccountInfo,*/ fcn: "getBankSpecifics"});


/**
 * Bank-specific info.
 *
 * @param {BankAccountInfo} bankSpecifics Bank-specific info.
 */
AccountProfile.prototype.setBankSpecifics = function(bankSpecifics) {
  this.creditCardSpecifics = null;
  this.investSpecifics = null;
  this.bankSpecifics = bankSpecifics;
};


/**
 * Credit-card account info.
 *
 * @return {CreditCardAccountInfo} Credit-card account info.
 */
AccountProfile.prototype.getCreditCardSpecifics = function() {
  return this.creditCardSpecifics;
};
ChildAggregate.add({order: 30, owner: AccountProfile, /*type: CreditCardAccountInfo,*/ fcn: "getCreditCardSpecifics"});


/**
 * Credit-card account info.
 *
 * @param {CreditCardAccountInfo} creditCardSpecifics Credit-card account info.
 */
AccountProfile.prototype.setCreditCardSpecifics = function(creditCardSpecifics) {
  this.bankSpecifics = null;
  this.investSpecifics = null;
  this.creditCardSpecifics = creditCardSpecifics;
};


/**
 * Investment account info.
 *
 * @return {InvestmentAccountInfo} Investment account info.
 */
AccountProfile.prototype.getInvestmentSpecifics = function() {
  return this.investSpecifics;
};
ChildAggregate.add({order: 40, owner: AccountProfile, /*type: InvestmentAccountInfo,*/ fcn: "getInvestmentSpecifics"});


/**
 * Investment account info.
 *
 * @param {InvestmentAccountInfo} investSpecifics Investment account info.
 */
AccountProfile.prototype.setInvestmentSpecifics = function(investSpecifics) {
  this.bankSpecifics = null;
  this.creditCardSpecifics = null;
  this.investSpecifics = investSpecifics;
};




module.exports = AccountProfile;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../banking/BankAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/banking/BankAccountInfo.js","../creditcard/CreditCardAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/creditcard/CreditCardAccountInfo.js","../investment/accounts/InvestmentAccountInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/investment/accounts/InvestmentAccountInfo.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/SignupRequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var RequestMessageSet = require("../RequestMessageSet");
var MessageSetType = require("../MessageSetType");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessageSet
 */
function SignupRequestMessageSet () {

  /**
   * @name SignupRequestMessageSet#accountInfoRequest
   * @type AccountInfoRequestTransaction
   * @access private
   */
  this.accountInfoRequest = null;
}

inherit(SignupRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SIGNUPMSGSRQV1", SignupRequestMessageSet);


SignupRequestMessageSet.prototype.getType = function() {
  return MessageSetType.signup;
};


/**
 * The account info request.
 *
 * @return {AccountInfoRequestTransaction} The account info request.
 */
SignupRequestMessageSet.prototype.getAccountInfoRequest = function() {
  return this.accountInfoRequest;
};
ChildAggregate.add({order: 0, owner: SignupRequestMessageSet, /*type: AccountInfoRequestTransaction,*/ fcn: "getAccountInfoRequest"});


/**
 * The account info request.
 *
 * @param {AccountInfoRequestTransaction} accountInfoRequest The account info request.
 */
SignupRequestMessageSet.prototype.setAccountInfoRequest = function(accountInfoRequest) {
  this.accountInfoRequest = accountInfoRequest;
};


/**
 * The request messages.
 *
 * @return {RequestMessage[]} The request messages.
 */
SignupRequestMessageSet.prototype.getRequestMessages = function() {
  var messages = [];

  if (this.getAccountInfoRequest() !== null) {
    messages.push(this.getAccountInfoRequest());
  }
  
  return messages;
};




module.exports = SignupRequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/SignupResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var ResponseMessageSet = require("../ResponseMessageSet");
var MessageSetType = require("../MessageSetType");

/**
 * @class
 * @augments ResponseMessageSet
 */
function SignupResponseMessageSet () {

  /**
   * @name SignupResponseMessageSet#accountInfoResponse
   * @type AccountInfoResponseTransaction
   * @access private
   */
  this.accountInfoResponse = null;
}

inherit(SignupResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SIGNUPMSGSRSV1", SignupResponseMessageSet);


SignupResponseMessageSet.prototype.getType = function() {
  return MessageSetType.signup;
};


/**
 * The account info response.
 *
 * @return {AccountInfoResponseTransaction} The account info response.
 */
SignupResponseMessageSet.prototype.getAccountInfoResponse = function() {
  return this.accountInfoResponse;
};
ChildAggregate.add({order: 0, owner: SignupResponseMessageSet, /*type: AccountInfoResponseTransaction,*/ fcn: "getAccountInfoResponse"});


/**
 * The account info response.
 *
 * @param {AccountInfoResponseTransaction} accountInfoResponse The account info response.
 */
SignupResponseMessageSet.prototype.setAccountInfoResponse = function(accountInfoResponse) {
  this.accountInfoResponse = accountInfoResponse;
};


/**
 * The response messages.
 *
 * @return {ResponseMessage[]} The response messages.
 */
SignupResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getAccountInfoResponse() !== null) {
    messages.push(this.getAccountInfoResponse());
  }

  return messages;
};




module.exports = SignupResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/signup/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  AccountInfoRequest: require("./AccountInfoRequest"),
  AccountInfoRequestTransaction: require("./AccountInfoRequestTransaction"),
  AccountInfoResponse: require("./AccountInfoResponse"),
  AccountInfoResponseTransaction: require("./AccountInfoResponseTransaction"),
  AccountProfile: require("./AccountProfile"),
  SignupRequestMessageSet: require("./SignupRequestMessageSet"),
  SignupResponseMessageSet: require("./SignupResponseMessageSet"),
};

},{"./AccountInfoRequest":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoRequest.js","./AccountInfoRequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoRequestTransaction.js","./AccountInfoResponse":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoResponse.js","./AccountInfoResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountInfoResponseTransaction.js","./AccountProfile":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/AccountProfile.js","./SignupRequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/SignupRequestMessageSet.js","./SignupResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/signup/SignupResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/ExtDBInfo.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");


/**
 * @class
 */
function ExtDBInfo () {

  /**
   * @name ExtDBInfo#procDet
   * @type List<ProcDet>
   * @access private
   */
  this.procDet = null;

  /**
   * @name ExtDBInfo#teInterest
   * @type String
   * @access private
   */
  this.teInterest = null;

  /**
   * @name ExtDBInfo#pabInterest
   * @type String
   * @access private
   */
  this.pabInterest = null;

  /**
   * @name ExtDBInfo#teIntDividend
   * @type String
   * @access private
   */
  this.teIntDividend = null;

  /**
   * @name ExtDBInfo#pabDividend
   * @type String
   * @access private
   */
  this.pabDividend = null;
}



Aggregate.add("EXTDBINFO_V100", ExtDBInfo);


/**
 * @return {ProcDet[]} the procDet
 */
ExtDBInfo.prototype.getProcDet = function() {
  return this.procDet;
};
ChildAggregate.add({required:false, order: 0, owner: ExtDBInfo, /*type: ProcDet[],*/ fcn: "getProcDet"});


/**
 * @param {ProcDet[]} procDet the procDet to set
 */
ExtDBInfo.prototype.setProcDet = function(procDet) {
  this.procDet = procDet;
};


/**
 * @return {String} the teInterest
 */
ExtDBInfo.prototype.getTeInterest = function() {
  return this.teInterest;
};
Element.add({name: "TEINTEREST",required: false , order: 1, owner: ExtDBInfo, /*type: String,*/ fcn: "getTeInterest"});


/**
 * @param {String} teInterest the teInterest to set
 */
ExtDBInfo.prototype.setTeInterest = function(teInterest) {
  this.teInterest = teInterest;
};


/**
 * @return {String} the pabInterest
 */
ExtDBInfo.prototype.getPabInterest = function() {
  return this.pabInterest;
};
Element.add({name: "PABINTEREST",required: false , order: 2, owner: ExtDBInfo, /*type: String,*/ fcn: "getPabInterest"});


/**
 * @param {String} pabInterest the pabInterest to set
 */
ExtDBInfo.prototype.setPabInterest = function(pabInterest) {
  this.pabInterest = pabInterest;
};


/**
 * @return {String} the teIntDividend
 */
ExtDBInfo.prototype.getTeIntDividend = function() {
  return this.teIntDividend;
};
Element.add({name: "TEINTDIVIDEND",required: false , order: 3, owner: ExtDBInfo, /*type: String,*/ fcn: "getTeIntDividend"});


/**
 * @param {String} teIntDividend the teIntDividend to set
 */
ExtDBInfo.prototype.setTeIntDividend = function(teIntDividend) {
  this.teIntDividend = teIntDividend;
};


/**
 * @return {String} the pabDividend
 */
ExtDBInfo.prototype.getPabDividend = function() {
  return this.pabDividend;
};
Element.add({name: "PABDIVIDEND",required: false , order: 4, owner: ExtDBInfo, /*type: String,*/ fcn: "getPabDividend"});


/**
 * @param {String} pabDividend the pabDividend to set
 */
ExtDBInfo.prototype.setPabDividend = function(pabDividend) {
  this.pabDividend = pabDividend;
};




module.exports = ExtDBInfo;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/PayerAddress.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function PayerAddress () {

  /**
   * @name PayerAddress#payerName1
   * @type String
   * @access private
   */
  this.payerName1 = null;

  /**
   * @name PayerAddress#payerName2
   * @type String
   * @access private
   */
  this.payerName2 = null;

  /**
   * @name PayerAddress#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name PayerAddress#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name PayerAddress#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name PayerAddress#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name PayerAddress#postalCode
   * @type String
   * @access private
   */
  this.postalCode = null;

  /**
   * @name PayerAddress#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("PAYERADDR", PayerAddress);


/**
 * @return {String} the payerName1
 */
PayerAddress.prototype.getPayerName1 = function() {
  return this.payerName1;
};
Element.add({name: "PAYERNAME1",required: true , order: 0, owner: PayerAddress, /*type: String,*/ fcn: "getPayerName1"});


/**
 * @param {String} payerName1 the payerName1 to set
 */
PayerAddress.prototype.setPayerName1 = function(payerName1) {
  this.payerName1 = payerName1;
};


/**
 * @return {String} the payerName2
 */
PayerAddress.prototype.getPayerName2 = function() {
  return this.payerName2;
};
Element.add({name: "PAYERNAME2",required: false , order: 1, owner: PayerAddress, /*type: String,*/ fcn: "getPayerName2"});


/**
 * @param {String} payerName2 the payerName2 to set
 */
PayerAddress.prototype.setPayerName2 = function(payerName2) {
  this.payerName2 = payerName2;
};


/**
 * @return {String} the address1
 */
PayerAddress.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1",required: true , order: 2, owner: PayerAddress, /*type: String,*/ fcn: "getAddress1"});


/**
 * @param {String} address1 the address1 to set
 */
PayerAddress.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * @return {String} the address2
 */
PayerAddress.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2",required: true , order: 3, owner: PayerAddress, /*type: String,*/ fcn: "getAddress2"});


/**
 * @param {String} address2 the address2 to set
 */
PayerAddress.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * @return {String} the city
 */
PayerAddress.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY",required: true , order: 4, owner: PayerAddress, /*type: String,*/ fcn: "getCity"});


/**
 * @param {String} city the city to set
 */
PayerAddress.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * @return {String} the state
 */
PayerAddress.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE",required: true , order: 5, owner: PayerAddress, /*type: String,*/ fcn: "getState"});


/**
 * @param {String} state the state to set
 */
PayerAddress.prototype.setState = function(state) {
  this.state = state;
};


/**
 * @return {String} the postalCode
 */
PayerAddress.prototype.getPostalCode = function() {
  return this.postalCode;
};
Element.add({name: "POSTALCODE",required: true , order: 6, owner: PayerAddress, /*type: String,*/ fcn: "getPostalCode"});


/**
 * @param {String} postalCode the postalCode to set
 */
PayerAddress.prototype.setPostalCode = function(postalCode) {
  this.postalCode = postalCode;
};


/**
 * @return {String} the phone
 */
PayerAddress.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE",required: false , order: 7, owner: PayerAddress, /*type: String,*/ fcn: "getPhone"});


/**
 * @param {String} phone the phone to set
 */
PayerAddress.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = PayerAddress;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/ProcDet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function ProcDet () {

  /**
   * @name ProcDet#dtAqd
   * @type String
   * @access private
   */
  this.dtAqd = null;

  /**
   * @name ProcDet#dtSale
   * @type String
   * @access private
   */
  this.dtSale = null;

  /**
   * @name ProcDet#secName
   * @type String
   * @access private
   */
  this.secName = null;

  /**
   * @name ProcDet#costBasis
   * @type String
   * @access private
   */
  this.costBasis = null;

  /**
   * @name ProcDet#saleSpr
   * @type String
   * @access private
   */
  this.saleSpr = null;

  /**
   * @name ProcDet#longShort
   * @type String
   * @access private
   */
  this.longShort = null;

  /**
   * @name ProcDet#wasDisAllowed
   * @type String
   * @access private
   */
  this.wasDisAllowed = null;

  /**
   * @name ProcDet#noncoveredSec
   * @type String
   * @access private
   */
  this.noncoveredSec = null;

  /**
   * @name ProcDet#basisNotshown
   * @type String
   * @access private
   */
  this.basisNotshown = null;
}



Aggregate.add("PROCDET_V100", ProcDet);


/**
 * @return {String} the dtAqd
 */
ProcDet.prototype.getDtAqd = function() {
  return this.dtAqd;
};
Element.add({name: "DTAQD", required: false, order: 0, owner: ProcDet, /*type: String,*/ fcn: "getDtAqd"});


/**
 * @param {String} dtAqd the dtAqd to set
 */
ProcDet.prototype.setDtAqd = function(dtAqd) {
  this.dtAqd = dtAqd;
};


/**
 * @return {String} the dtSale
 */
ProcDet.prototype.getDtSale = function() {
  return this.dtSale;
};
Element.add({name: "DTSALE", required: false, order: 2, owner: ProcDet, /*type: String,*/ fcn: "getDtSale"});


/**
 * @param {String} dtSale the dtSale to set
 */
ProcDet.prototype.setDtSale = function(dtSale) {
  this.dtSale = dtSale;
};


/**
 * @return {String} the secName
 */
ProcDet.prototype.getSecName = function() {
  return this.secName;
};
Element.add({name: "SECNAME", required: false, order: 3, owner: ProcDet, /*type: String,*/ fcn: "getSecName"});


/**
 * @param {String} secName the secName to set
 */
ProcDet.prototype.setSecName = function(secName) {
  this.secName = secName;
};


/**
 * @return {String} the costBasis
 */
ProcDet.prototype.getCostBasis = function() {
  return this.costBasis;
};
Element.add({name: "COSTBASIS", required: false, order: 4, owner: ProcDet, /*type: String,*/ fcn: "getCostBasis"});


/**
 * @param {String} costBasis the costBasis to set
 */
ProcDet.prototype.setCostBasis = function(costBasis) {
  this.costBasis = costBasis;
};


/**
 * @return {String} the saleSpr
 */
ProcDet.prototype.getSaleSpr = function() {
  return this.saleSpr;
};
Element.add({name: "SALESPR", required: false, order: 5, owner: ProcDet, /*type: String,*/ fcn: "getSaleSpr"});


/**
 * @param {String} saleSpr the saleSpr to set
 */
ProcDet.prototype.setSaleSpr = function(saleSpr) {
  this.saleSpr = saleSpr;
};


/**
 * @return {String} the longShort
 */
ProcDet.prototype.getLongShort = function() {
  return this.longShort;
};
Element.add({name: "LONGSHORT", required: false, order: 6, owner: ProcDet, /*type: String,*/ fcn: "getLongShort"});


/**
 * @param {String} longShort the longShort to set
 */
ProcDet.prototype.setLongShort = function(longShort) {
  this.longShort = longShort;
};


/**
 * @return {String} the wasDisAllowed
 */
ProcDet.prototype.getWasDisAllowed = function() {
  return this.wasDisAllowed;
};
Element.add({name: "WASHSALELOSSDISALLOWED", required: false, order: 7, owner: ProcDet, /*type: String,*/ fcn: "getWasDisAllowed"});


/**
 * @param {String} wasDisAllowed the wasDisAllowed to set
 */
ProcDet.prototype.setWasDisAllowed = function(wasDisAllowed) {
  this.wasDisAllowed = wasDisAllowed;
};


/**
 * @return {String} the noncoveredSec
 */
ProcDet.prototype.getNoncoveredSec = function() {
  return this.noncoveredSec;
};
Element.add({name: "NONCOVEREDSECURITY", required: false, order: 8, owner: ProcDet, /*type: String,*/ fcn: "getNoncoveredSec"});


/**
 * @param {String} noncoveredSec the noncoveredSec to set
 */
ProcDet.prototype.setNoncoveredSec = function(noncoveredSec) {
  this.noncoveredSec = noncoveredSec;
};


/**
 * @return {String} the basisNotshown
 */
ProcDet.prototype.getBasisNotshown = function() {
  return this.basisNotshown;
};
Element.add({name: "BASISNOTSHOWN", required: false, order: 9, owner: ProcDet, /*type: String,*/ fcn: "getBasisNotshown"});


/**
 * @param {String} basisNotshown the basisNotshown to set
 */
ProcDet.prototype.setBasisNotshown = function(basisNotshown) {
  this.basisNotshown = basisNotshown;
};




module.exports = ProcDet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/RecAddress.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function RecAddress () {

  /**
   * @name RecAddress#recName1
   * @type String
   * @access private
   */
  this.recName1 = null;

  /**
   * @name RecAddress#recName2
   * @type String
   * @access private
   */
  this.recName2 = null;

  /**
   * @name RecAddress#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name RecAddress#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name RecAddress#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name RecAddress#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name RecAddress#postalCode
   * @type String
   * @access private
   */
  this.postalCode = null;

  /**
   * @name RecAddress#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("RECADDR", RecAddress);


/**
 * @return {String} the recName1
 */
RecAddress.prototype.getRecName1 = function() {
  return this.recName1;
};
Element.add({name: "RECNAME1",required: true , order: 0, owner: RecAddress, /*type: String,*/ fcn: "getRecName1"});


/**
 * @param {String} recName1 the recName1 to set
 */
RecAddress.prototype.setRecName1 = function(recName1) {
  this.recName1 = recName1;
};


/**
 * @return {String} the recName2
 */
RecAddress.prototype.getRecName2 = function() {
  return this.recName2;
};
Element.add({name: "RECNAME2",required: false , order: 1, owner: RecAddress, /*type: String,*/ fcn: "getRecName2"});


/**
 * @param {String} recName2 the recName2 to set
 */
RecAddress.prototype.setRecName2 = function(recName2) {
  this.recName2 = recName2;
};


/**
 * @return {String} the address1
 */
RecAddress.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1",required: true , order: 2, owner: RecAddress, /*type: String,*/ fcn: "getAddress1"});


/**
 * @param {String} address1 the address1 to set
 */
RecAddress.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * @return {String} the address2
 */
RecAddress.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2",required: true , order: 3, owner: RecAddress, /*type: String,*/ fcn: "getAddress2"});


/**
 * @param {String} address2 the address2 to set
 */
RecAddress.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * @return {String} the city
 */
RecAddress.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY",required: true , order: 4, owner: RecAddress, /*type: String,*/ fcn: "getCity"});


/**
 * @param {String} city the city to set
 */
RecAddress.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * @return {String} the state
 */
RecAddress.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE",required: true , order: 5, owner: RecAddress, /*type: String,*/ fcn: "getState"});


/**
 * @param {String} state the state to set
 */
RecAddress.prototype.setState = function(state) {
  this.state = state;
};


/**
 * @return {String} the postalCode
 */
RecAddress.prototype.getPostalCode = function() {
  return this.postalCode;
};
Element.add({name: "POSTALCODE",required: true , order: 6, owner: RecAddress, /*type: String,*/ fcn: "getPostalCode"});


/**
 * @param {String} postalCode the postalCode to set
 */
RecAddress.prototype.setPostalCode = function(postalCode) {
  this.postalCode = postalCode;
};


/**
 * @return {String} the phone
 */
RecAddress.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE",required: false , order: 7, owner: RecAddress, /*type: String,*/ fcn: "getPhone"});


/**
 * @param {String} phone the phone to set
 */
RecAddress.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = RecAddress;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099B.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var PayerAddress = require("./PayerAddress");
var RecAddress = require("./RecAddress");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099B () {

  /**
   * @name Tax1099B#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099B#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099B#extDBInfo
   * @type ExtDBInfo
   * @access private
   */
  this.extDBInfo = null;

  /**
   * @name Tax1099B#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099B#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099B#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099B#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099B#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099B_V100", Tax1099B);


Tax1099B.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099B, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099B.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099B.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099B, /*type: String,*/ fcn: "getTaxYear"});


Tax1099B.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {ExtDBInfo} the extDBInfo
 */
Tax1099B.prototype.getExtDBInfo = function() {
  return this.extDBInfo;
};
ChildAggregate.add({required:true, order: 2, owner: Tax1099B, /*type: ExtDBInfo,*/ fcn: "getExtDBInfo"});


/**
 * @param {ExtDBInfo} extDBInfo the extDBInfo to set
 */
Tax1099B.prototype.setExtDBInfo = function(extDBInfo) {
  this.extDBInfo = extDBInfo;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099B.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 3, owner: Tax1099B, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099B.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099B.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 4, owner: Tax1099B, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099B.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099B.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 5, owner: Tax1099B, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099B.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099B.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 6, owner: Tax1099B, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099B.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099B.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 7, owner: Tax1099B, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099B.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099B;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","./PayerAddress":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/PayerAddress.js","./RecAddress":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/RecAddress.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099DIV.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099DIV () {

  /**
   * @name Tax1099DIV#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099DIV#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099DIV#ordDiv
   * @type String
   * @access private
   */
  this.ordDiv = null;

  /**
   * @name Tax1099DIV#qualifiedDiv
   * @type String
   * @access private
   */
  this.qualifiedDiv = null;

  /**
   * @name Tax1099DIV#totCapGain
   * @type String
   * @access private
   */
  this.totCapGain = null;

  /**
   * @name Tax1099DIV#p28Gain
   * @type String
   * @access private
   */
  this.p28Gain = null;

  /**
   * @name Tax1099DIV#unrecSec1250
   * @type String
   * @access private
   */
  this.unrecSec1250 = null;

  /**
   * @name Tax1099DIV#sec1202
   * @type String
   * @access private
   */
  this.sec1202 = null;

  /**
   * @name Tax1099DIV#nonTaxDist
   * @type String
   * @access private
   */
  this.nonTaxDist = null;

  /**
   * @name Tax1099DIV#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099DIV#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099DIV#forTaxPd
   * @type String
   * @access private
   */
  this.forTaxPd = null;

  /**
   * @name Tax1099DIV#cashLiq
   * @type String
   * @access private
   */
  this.cashLiq = null;

  /**
   * @name Tax1099DIV#nonCashLiq
   * @type String
   * @access private
   */
  this.nonCashLiq = null;

  /**
   * @name Tax1099DIV#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099DIV#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099DIV#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099DIV#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099DIV#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099DIV_V100", Tax1099DIV);


Tax1099DIV.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: false , order: 0, owner: Tax1099DIV, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099DIV.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099DIV.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: false, order: 1, owner: Tax1099DIV, /*type: String,*/ fcn: "getTaxYear"});


Tax1099DIV.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the ordDiv
 */
Tax1099DIV.prototype.getOrdDiv = function() {
  return this.ordDiv;
};
Element.add({name: "ORDDIV", required: false, order: 2, owner: Tax1099DIV, /*type: String,*/ fcn: "getOrdDiv"});


/**
 * @param {String} ordDiv the ordDiv to set
 */
Tax1099DIV.prototype.setOrdDiv = function(ordDiv) {
  this.ordDiv = ordDiv;
};


/**
 * @return {String} the qualifiedDiv
 */
Tax1099DIV.prototype.getQualifiedDiv = function() {
  return this.qualifiedDiv;
};
Element.add({name: "QUALIFIEDDIV", required: false, order: 3, owner: Tax1099DIV, /*type: String,*/ fcn: "getQualifiedDiv"});


/**
 * @param {String} qualifiedDiv the qualifiedDiv to set
 */
Tax1099DIV.prototype.setQualifiedDiv = function(qualifiedDiv) {
  this.qualifiedDiv = qualifiedDiv;
};


/**
 * @return {String} the totCapGain
 */
Tax1099DIV.prototype.getTotCapGain = function() {
  return this.totCapGain;
};
Element.add({name: "TOTCAPGAIN", required: false, order: 4, owner: Tax1099DIV, /*type: String,*/ fcn: "getTotCapGain"});


/**
 * @param {String} totCapGain the totCapGain to set
 */
Tax1099DIV.prototype.setTotCapGain = function(totCapGain) {
  this.totCapGain = totCapGain;
};


/**
 * @return {String} the p28Gain
 */
Tax1099DIV.prototype.getP28Gain = function() {
  return this.p28Gain;
};
Element.add({name: "P28GAIN", required: false, order: 5, owner: Tax1099DIV, /*type: String,*/ fcn: "getP28Gain"});


/**
 * @param {String} p28Gain the p28Gain to set
 */
Tax1099DIV.prototype.setP28Gain = function(p28Gain) {
  this.p28Gain = p28Gain;
};


/**
 * @return {String} the unrecSec1250
 */
Tax1099DIV.prototype.getUnrecSec1250 = function() {
  return this.unrecSec1250;
};
Element.add({name: "UNRECSEC1250", required: false, order: 6, owner: Tax1099DIV, /*type: String,*/ fcn: "getUnrecSec1250"});


/**
 * @param {String} unrecSec1250 the unrecSec1250 to set
 */
Tax1099DIV.prototype.setUnrecSec1250 = function(unrecSec1250) {
  this.unrecSec1250 = unrecSec1250;
};


/**
 * @return {String} the sec1202
 */
Tax1099DIV.prototype.getSec1202 = function() {
  return this.sec1202;
};
Element.add({name: "SEC1202", required: false, order: 7, owner: Tax1099DIV, /*type: String,*/ fcn: "getSec1202"});


/**
 * @param {String} sec1202 the sec1202 to set
 */
Tax1099DIV.prototype.setSec1202 = function(sec1202) {
  this.sec1202 = sec1202;
};


/**
 * @return {String} the nonTaxDist
 */
Tax1099DIV.prototype.getNonTaxDist = function() {
  return this.nonTaxDist;
};
Element.add({name: "NONTAXDIST", required: false, order: 8, owner: Tax1099DIV, /*type: String,*/ fcn: "getNonTaxDist"});


/**
 * @param {String} nonTaxDist the nonTaxDist to set
 */
Tax1099DIV.prototype.setNonTaxDist = function(nonTaxDist) {
  this.nonTaxDist = nonTaxDist;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099DIV.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH", required: false, order: 9, owner: Tax1099DIV, /*type: String,*/ fcn: "getFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099DIV.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the investExp
 */
Tax1099DIV.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add({name: "INVESTEXP", required: false, order: 10, owner: Tax1099DIV, /*type: String,*/ fcn: "getInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099DIV.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {String} the forTaxPd
 */
Tax1099DIV.prototype.getForTaxPd = function() {
  return this.forTaxPd;
};
Element.add({name: "FORTAXPD", required: false, order: 11, owner: Tax1099DIV, /*type: String,*/ fcn: "getForTaxPd"});


/**
 * @param {String} forTaxPd the forTaxPd to set
 */
Tax1099DIV.prototype.setForTaxPd = function(forTaxPd) {
  this.forTaxPd = forTaxPd;
};


/**
 * @return {String} the cashLiq
 */
Tax1099DIV.prototype.getCashLiq = function() {
  return this.cashLiq;
};
Element.add({name: "CASHLIQ", required: false, order: 12, owner: Tax1099DIV, /*type: String,*/ fcn: "getCashLiq"});


/**
 * @param {String} cashLiq the cashLiq to set
 */
Tax1099DIV.prototype.setCashLiq = function(cashLiq) {
  this.cashLiq = cashLiq;
};


/**
 * @return {String} the nonCashLiq
 */
Tax1099DIV.prototype.getNonCashLiq = function() {
  return this.nonCashLiq;
};
Element.add({name: "NONCASHLIQ", required: false, order: 13, owner: Tax1099DIV, /*type: String,*/ fcn: "getNonCashLiq"});


/**
 * @param {String} nonCashLiq the nonCashLiq to set
 */
Tax1099DIV.prototype.setNonCashLiq = function(nonCashLiq) {
  this.nonCashLiq = nonCashLiq;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099DIV.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 14, owner: Tax1099DIV, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099DIV.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099DIV.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 15, owner: Tax1099DIV, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099DIV.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099DIV.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 16, owner: Tax1099DIV, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099DIV.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099DIV.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 17, owner: Tax1099DIV, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099DIV.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099DIV.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 18, owner: Tax1099DIV, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099DIV.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099DIV;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099INT.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099INT () {

  /**
   * @name Tax1099INT#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099INT#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099INT#intIncome
   * @type String
   * @access private
   */
  this.intIncome = null;

  /**
   * @name Tax1099INT#erlWithPen
   * @type String
   * @access private
   */
  this.erlWithPen = null;

  /**
   * @name Tax1099INT#intUsbndtrs
   * @type String
   * @access private
   */
  this.intUsbndtrs = null;

  /**
   * @name Tax1099INT#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099INT#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099INT#forTaxPd
   * @type String
   * @access private
   */
  this.forTaxPd = null;

  /**
   * @name Tax1099INT#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099INT#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099INT#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099INT#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099INT#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;

  /**
   * @name Tax1099INT#taxExemptInt
   * @type String
   * @access private
   */
  this.taxExemptInt = null;

  /**
   * @name Tax1099INT#specifiedPabInt
   * @type String
   * @access private
   */
  this.specifiedPabInt = null;
}



Aggregate.add("TAX1099INT_V100", Tax1099INT);


Tax1099INT.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099INT, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099INT.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099INT.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099INT, /*type: String,*/ fcn: "getTaxYear"});


Tax1099INT.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the intIncome
 */
Tax1099INT.prototype.getIntIncome = function() {
  return this.intIncome;
};
Element.add({name: "INTINCOME",required: false , order: 2, owner: Tax1099INT, /*type: String,*/ fcn: "getIntIncome"});


/**
 * @param {String} intIncome the intIncome to set
 */
Tax1099INT.prototype.setIntIncome = function(intIncome) {
  this.intIncome = intIncome;
};


/**
 * @return {String} the erlWithPen
 */
Tax1099INT.prototype.getErlWithPen = function() {
  return this.erlWithPen;
};
Element.add({name: "ERLWITHPEN",required: false , order: 3, owner: Tax1099INT, /*type: String,*/ fcn: "getErlWithPen"});


/**
 * @param {String} erlWithPen the erlWithPen to set
 */
Tax1099INT.prototype.setErlWithPen = function(erlWithPen) {
  this.erlWithPen = erlWithPen;
};


/**
 * @return {String} the intUsbndtrs
 */
Tax1099INT.prototype.getIntUsbndtrs = function() {
  return this.intUsbndtrs;
};
Element.add({name: "INTUSBNDTRS",required: false , order: 4, owner: Tax1099INT, /*type: String,*/ fcn: "getIntUsbndtrs"});


/**
 * @param {String} intUsbndtrs the intUsbndtrs to set
 */
Tax1099INT.prototype.setIntUsbndtrs = function(intUsbndtrs) {
  this.intUsbndtrs = intUsbndtrs;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099INT.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH", required: false, order: 5, owner: Tax1099INT, /*type: String,*/ fcn: "getFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099INT.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the investExp
 */
Tax1099INT.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add({name: "INVESTEXP", required: false, order: 6, owner: Tax1099INT, /*type: String,*/ fcn: "getInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099INT.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {String} the forTaxPd
 */
Tax1099INT.prototype.getForTaxPd = function() {
  return this.forTaxPd;
};
Element.add({name: "FORTAXPD", required: false, order: 7, owner: Tax1099INT, /*type: String,*/ fcn: "getForTaxPd"});


/**
 * @param {String} forTaxPd the forTaxPd to set
 */
Tax1099INT.prototype.setForTaxPd = function(forTaxPd) {
  this.forTaxPd = forTaxPd;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099INT.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 8, owner: Tax1099INT, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099INT.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099INT.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 9, owner: Tax1099INT, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099INT.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099INT.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 10, owner: Tax1099INT, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099INT.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099INT.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 11, owner: Tax1099INT, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099INT.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099INT.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 12, owner: Tax1099INT, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099INT.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};


/**
 * @return {String} the taxExemptInt
 */
Tax1099INT.prototype.getTaxExemptInt = function() {
  return this.taxExemptInt;
};
Element.add({name: "TAXEXEMPTINT", required: false, order: 13, owner: Tax1099INT, /*type: String,*/ fcn: "getTaxExemptInt"});


/**
 * @param {String} taxExemptInt the taxExemptInt to set
 */
Tax1099INT.prototype.setTaxExemptInt = function(taxExemptInt) {
  this.taxExemptInt = taxExemptInt;
};


/**
 * @return {String} the specifiedPabInt
 */
Tax1099INT.prototype.getSpecifiedPabInt = function() {
  return this.specifiedPabInt;
};
Element.add({name: "SPECIFIEDPABINT", required: false, order: 14, owner: Tax1099INT, /*type: String,*/ fcn: "getSpecifiedPabInt"});


/**
 * @param {String} specifiedPabInt the specifiedPabInt to set
 */
Tax1099INT.prototype.setSpecifiedPabInt = function(specifiedPabInt) {
  this.specifiedPabInt = specifiedPabInt;
};




module.exports = Tax1099INT;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099MISC.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099MISC () {

  /**
   * @name Tax1099MISC#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099MISC#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099MISC#royalties
   * @type String
   * @access private
   */
  this.royalties = null;

  /**
   * @name Tax1099MISC#otherIncome
   * @type String
   * @access private
   */
  this.otherIncome = null;

  /**
   * @name Tax1099MISC#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099MISC#subPmts
   * @type String
   * @access private
   */
  this.subPmts = null;

  /**
   * @name Tax1099MISC#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099MISC#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099MISC#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099MISC#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099MISC#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099MISC_V100", Tax1099MISC);


Tax1099MISC.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099MISC, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099MISC.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099MISC.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099MISC, /*type: String,*/ fcn: "getTaxYear"});


Tax1099MISC.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the royalties
 */
Tax1099MISC.prototype.getRoyalties = function() {
  return this.royalties;
};
Element.add({name: "ROYALTIES",required: false , order: 2, owner: Tax1099MISC, /*type: String,*/ fcn: "getRoyalties"});


/**
 * @param {String} royalties the royalties to set
 */
Tax1099MISC.prototype.setRoyalties = function(royalties) {
  this.royalties = royalties;
};


/**
 * @return {String} the otherIncome
 */
Tax1099MISC.prototype.getOtherIncome = function() {
  return this.otherIncome;
};
Element.add({name: "OTHERINCOME",required: false , order: 3, owner: Tax1099MISC, /*type: String,*/ fcn: "getOtherIncome"});


/**
 * @param {String} otherIncome the otherIncome to set
 */
Tax1099MISC.prototype.setOtherIncome = function(otherIncome) {
  this.otherIncome = otherIncome;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099MISC.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH",required: false , order: 4, owner: Tax1099MISC, /*type: String,*/ fcn: "getFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099MISC.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the subPmts
 */
Tax1099MISC.prototype.getSubPmts = function() {
  return this.subPmts;
};
Element.add({name: "SUBPMTS",required: false , order: 5, owner: Tax1099MISC, /*type: String,*/ fcn: "getSubPmts"});


/**
 * @param {String} subPmts the subPmts to set
 */
Tax1099MISC.prototype.setSubPmts = function(subPmts) {
  this.subPmts = subPmts;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099MISC.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 6, owner: Tax1099MISC, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099MISC.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099MISC.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 7, owner: Tax1099MISC, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099MISC.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099MISC.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 8, owner: Tax1099MISC, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099MISC.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099MISC.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 9, owner: Tax1099MISC, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099MISC.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099MISC.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 10, owner: Tax1099MISC, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099MISC.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099MISC;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099OID.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099OID () {

  /**
   * @name Tax1099OID#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099OID#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099OID#originalDisc
   * @type String
   * @access private
   */
  this.originalDisc = null;

  /**
   * @name Tax1099OID#otherPerInt
   * @type String
   * @access private
   */
  this.otherPerInt = null;

  /**
   * @name Tax1099OID#erlWithPen
   * @type String
   * @access private
   */
  this.erlWithPen = null;

  /**
   * @name Tax1099OID#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099OID#desc
   * @type String
   * @access private
   */
  this.desc = null;

  /**
   * @name Tax1099OID#oidOnUstres
   * @type String
   * @access private
   */
  this.oidOnUstres = null;

  /**
   * @name Tax1099OID#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099OID#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099OID#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099OID#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099OID#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099OID#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099OID_V100", Tax1099OID);


Tax1099OID.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099OID, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099OID.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099OID.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099OID, /*type: String,*/ fcn: "getTaxYear"});


Tax1099OID.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the originalDisc
 */
Tax1099OID.prototype.getOriginalDisc = function() {
  return this.originalDisc;
};
Element.add({name: "ORIGISDISC", required: false, order: 2, owner: Tax1099OID, /*type: String,*/ fcn: "getOriginalDisc"});


/**
 * @param {String} originalDisc the originalDisc to set
 */
Tax1099OID.prototype.setOriginalDisc = function(originalDisc) {
  this.originalDisc = originalDisc;
};


/**
 * @return {String} the otherPerInt
 */
Tax1099OID.prototype.getOtherPerInt = function() {
  return this.otherPerInt;
};
Element.add({name: "OTHERPERINT", required: false, order: 3, owner: Tax1099OID, /*type: String,*/ fcn: "getOtherPerInt"});


/**
 * @param {String} otherPerInt the otherPerInt to set
 */
Tax1099OID.prototype.setOtherPerInt = function(otherPerInt) {
  this.otherPerInt = otherPerInt;
};


/**
 * @return {String} the erlWithPen
 */
Tax1099OID.prototype.getErlWithPen = function() {
  return this.erlWithPen;
};
Element.add({name: "ERLWITHPEN", required: false, order: 4, owner: Tax1099OID, /*type: String,*/ fcn: "getErlWithPen"});


/**
 * @param {String} erlWithPen the erlWithPen to set
 */
Tax1099OID.prototype.setErlWithPen = function(erlWithPen) {
  this.erlWithPen = erlWithPen;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099OID.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH", required: false, order: 5, owner: Tax1099OID, /*type: String,*/ fcn: "getFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099OID.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the desc
 */
Tax1099OID.prototype.getDesc = function() {
  return this.desc;
};
Element.add({name: "DESCRIPTION", required: true, order: 6, owner: Tax1099OID, /*type: String,*/ fcn: "getDesc"});


/**
 * @param {String} desc the desc to set
 */
Tax1099OID.prototype.setDesc = function(desc) {
  this.desc = desc;
};


/**
 * @return {String} the oidOnUstres
 */
Tax1099OID.prototype.getOidOnUstres = function() {
  return this.oidOnUstres;
};
Element.add({name: "OIDONUSTRES", required: false, order: 7, owner: Tax1099OID, /*type: String,*/ fcn: "getOidOnUstres"});


/**
 * @param {String} oidOnUstres the oidOnUstres to set
 */
Tax1099OID.prototype.setOidOnUstres = function(oidOnUstres) {
  this.oidOnUstres = oidOnUstres;
};


/**
 * @return {String} the investExp
 */
Tax1099OID.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add({name: "INVESTEXP", required: false, order: 8, owner: Tax1099OID, /*type: String,*/ fcn: "getInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099OID.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099OID.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 9, owner: Tax1099OID, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099OID.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099OID.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 10, owner: Tax1099OID, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099OID.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099OID.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 11, owner: Tax1099OID, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099OID.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099OID.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 12, owner: Tax1099OID, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099OID.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099OID.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 13, owner: Tax1099OID, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099OID.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099OID;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099R.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099R () {

  /**
   * @name Tax1099R#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099R#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099R#grossDist
   * @type String
   * @access private
   */
  this.grossDist = null;

  /**
   * @name Tax1099R#taxAmt
   * @type String
   * @access private
   */
  this.taxAmt = null;

  /**
   * @name Tax1099R#taxAmtNd
   * @type String
   * @access private
   */
  this.taxAmtNd = null;

  /**
   * @name Tax1099R#capGain
   * @type String
   * @access private
   */
  this.capGain = null;

  /**
   * @name Tax1099R#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099R#empContins
   * @type String
   * @access private
   */
  this.empContins = null;

  /**
   * @name Tax1099R#netUnapEmp
   * @type String
   * @access private
   */
  this.netUnapEmp = null;

  /**
   * @name Tax1099R#distCode
   * @type String
   * @access private
   */
  this.distCode = null;

  /**
   * @name Tax1099R#iraSepSimp
   * @type String
   * @access private
   */
  this.iraSepSimp = null;

  /**
   * @name Tax1099R#annCtrctDist
   * @type String
   * @access private
   */
  this.annCtrctDist = null;

  /**
   * @name Tax1099R#totEmpCount
   * @type String
   * @access private
   */
  this.totEmpCount = null;

  /**
   * @name Tax1099R#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099R#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099R#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099R#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099R#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099R_V100", Tax1099R);


Tax1099R.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099R, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099R.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099R.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099R, /*type: String,*/ fcn: "getTaxYear"});


Tax1099R.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the grossDist
 */
Tax1099R.prototype.getGrossDist = function() {
  return this.grossDist;
};
Element.add({name: "GROSSDIST", required: true, order: 2, owner: Tax1099R, /*type: String,*/ fcn: "getGrossDist"});


/**
 * @param {String} grossDist the grossDist to set
 */
Tax1099R.prototype.setGrossDist = function(grossDist) {
  this.grossDist = grossDist;
};


/**
 * @return {String} the taxAmt
 */
Tax1099R.prototype.getTaxAmt = function() {
  return this.taxAmt;
};
Element.add({name: "TAXAMT", required: false, order: 3, owner: Tax1099R, /*type: String,*/ fcn: "getTaxAmt"});


/**
 * @param {String} taxAmt the taxAmt to set
 */
Tax1099R.prototype.setTaxAmt = function(taxAmt) {
  this.taxAmt = taxAmt;
};


/**
 * @return {String} the taxAmtNd
 */
Tax1099R.prototype.getTaxAmtNd = function() {
  return this.taxAmtNd;
};
Element.add({name: "TAXAMTND", required: false, order: 4, owner: Tax1099R, /*type: String,*/ fcn: "getTaxAmtNd"});


/**
 * @param {String} taxAmtNd the taxAmtNd to set
 */
Tax1099R.prototype.setTaxAmtNd = function(taxAmtNd) {
  this.taxAmtNd = taxAmtNd;
};


/**
 * @return {String} the capGain
 */
Tax1099R.prototype.getCapGain = function() {
  return this.capGain;
};
Element.add({name: "CAPGAIN", required: false, order: 5, owner: Tax1099R, /*type: String,*/ fcn: "getCapGain"});


/**
 * @param {String} capGain the capGain to set
 */
Tax1099R.prototype.setCapGain = function(capGain) {
  this.capGain = capGain;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099R.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH", required: false, order: 6, owner: Tax1099R, /*type: String,*/ fcn: "getFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099R.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the empContins
 */
Tax1099R.prototype.getEmpContins = function() {
  return this.empContins;
};
Element.add({name: "EMPCONTINS", required: false, order: 7, owner: Tax1099R, /*type: String,*/ fcn: "getEmpContins"});


/**
 * @param {String} empContins the empContins to set
 */
Tax1099R.prototype.setEmpContins = function(empContins) {
  this.empContins = empContins;
};


/**
 * @return {String} the netUnapEmp
 */
Tax1099R.prototype.getNetUnapEmp = function() {
  return this.netUnapEmp;
};
Element.add({name: "NETUNAPEMP", required: false, order: 8, owner: Tax1099R, /*type: String,*/ fcn: "getNetUnapEmp"});


/**
 * @param {String} netUnapEmp the netUnapEmp to set
 */
Tax1099R.prototype.setNetUnapEmp = function(netUnapEmp) {
  this.netUnapEmp = netUnapEmp;
};


/**
 * @return {String} the distCode
 */
Tax1099R.prototype.getDistCode = function() {
  return this.distCode;
};
Element.add({name: "DISTCODE", required: true, order: 9, owner: Tax1099R, /*type: String,*/ fcn: "getDistCode"});


/**
 * @param {String} distCode the distCode to set
 */
Tax1099R.prototype.setDistCode = function(distCode) {
  this.distCode = distCode;
};


/**
 * @return {String} the iraSepSimp
 */
Tax1099R.prototype.getIraSepSimp = function() {
  return this.iraSepSimp;
};
Element.add({name: "IRASEPSIMP", required: true, order: 10, owner: Tax1099R, /*type: String,*/ fcn: "getIraSepSimp"});


/**
 * @param {String} iraSepSimp the iraSepSimp to set
 */
Tax1099R.prototype.setIraSepSimp = function(iraSepSimp) {
  this.iraSepSimp = iraSepSimp;
};


/**
 * @return {String} the annCtrctDist
 */
Tax1099R.prototype.getAnnCtrctDist = function() {
  return this.annCtrctDist;
};
Element.add({name: "ANNCTRCTDIST", required: false, order: 11, owner: Tax1099R, /*type: String,*/ fcn: "getAnnCtrctDist"});


/**
 * @param {String} annCtrctDist the annCtrctDist to set
 */
Tax1099R.prototype.setAnnCtrctDist = function(annCtrctDist) {
  this.annCtrctDist = annCtrctDist;
};


/**
 * @return {String} the totEmpCount
 */
Tax1099R.prototype.getTotEmpCount = function() {
  return this.totEmpCount;
};
Element.add({name: "TOTEMPCONT", required: false, order: 12, owner: Tax1099R, /*type: String,*/ fcn: "getTotEmpCount"});


/**
 * @param {String} totEmpCount the totEmpCount to set
 */
Tax1099R.prototype.setTotEmpCount = function(totEmpCount) {
  this.totEmpCount = totEmpCount;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099R.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 13, owner: Tax1099R, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099R.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099R.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 14, owner: Tax1099R, /*type: String,*/ fcn: "getPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099R.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099R.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 15, owner: Tax1099R, /*type: RecAddress,*/ fcn: "getRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099R.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099R.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 16, owner: Tax1099R, /*type: String,*/ fcn: "getRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099R.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099R.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 17, owner: Tax1099R, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099R.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099R;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Request.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var T1099Request = require("../common/T1099Request");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments T1099Request
 */
function Tax1099Request () {

  /**
   * @name Tax1099Request#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;
}

inherit(Tax1099Request, "extends", T1099Request);


Aggregate.add("TAX1099RQ", Tax1099Request);


Tax1099Request.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 0, owner: Tax1099Request, /*type: String,*/ fcn: "getTaxYear"});


Tax1099Request.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};




module.exports = Tax1099Request;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/Element":"/Users/aolson/Developer/ofx4js/src/meta/Element.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/T1099Request":"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Request.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099RequestMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessageSet
 */
function Tax1099RequestMessageSet () {

  /**
   * @name Tax1099RequestMessageSet#taxRequestTransaction
   * @type Tax1099RequestTransaction
   * @access private
   */
  this.taxRequestTransaction = null;
}

inherit(Tax1099RequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("TAX1099MSGSRQV1", Tax1099RequestMessageSet);


Tax1099RequestMessageSet.prototype.getType = function() {
  return MessageSetType.tax1099;
};


/**
 * The statement request.
 *
 * @return {Tax1099RequestTransaction} The statement request.
 */
Tax1099RequestMessageSet.prototype.getTaxRequestTransaction = function() {
  return this.taxRequestTransaction;
};
ChildAggregate.add({order: 0, owner: Tax1099RequestMessageSet, /*type: Tax1099RequestTransaction,*/ fcn: "getTaxRequestTransaction"});


/**
 * The statement request.
 *
 * @param {Tax1099RequestTransaction} taxRequestTransaction The statement request.
 */
Tax1099RequestMessageSet.prototype.setTaxRequestTransaction = function(taxRequestTransaction) {
  this.taxRequestTransaction = taxRequestTransaction;
};


// Inherited.
Tax1099RequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getTaxRequestTransaction() !== null) {
    requestMessages.push(this.getTaxRequestTransaction());
  }
  return requestMessages;
};




module.exports = Tax1099RequestMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/RequestMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099RequestTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Tax1099Request = require("./Tax1099Request");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function Tax1099RequestTransaction () {

  /**
   * @name Tax1099RequestTransaction#tax1099Request
   * @type Tax1099Request
   * @access private
   */
  this.tax1099Request = null;
}

inherit(Tax1099RequestTransaction, "extends", new TransactionWrappedRequestMessage(Tax1099Request));


Aggregate.add("TAX1099TRNRQ", Tax1099RequestTransaction);


/**
 * The tax1099Request.
 *
 * @return {Tax1099Request} The tax1099Request.
 */
Tax1099RequestTransaction.prototype.getTax1099Request = function() {
  return this.tax1099Request;
};
ChildAggregate.add({required: true, order: 30, owner: Tax1099RequestTransaction, /*type: Tax1099Request,*/ fcn: "getTax1099Request"});


/**
 * The tax1099Request.
 *
 * @param {Tax1099Request} tax1099Request The message.
 *
 */
Tax1099RequestTransaction.prototype.setTax1099Request = function(tax1099Request) {
  this.tax1099Request = tax1099Request;
};


// Inherited.
Tax1099RequestTransaction.prototype.setWrappedMessage = function(/*Tax1099Request*/ tax1099Request) {
  this.setTax1099Request(tax1099Request);
};




module.exports = Tax1099RequestTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedRequestMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedRequestMessage.js","./Tax1099Request":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Request.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Response.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var T1099Response = require("../common/T1099Response");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments T1099Response
 */
function Tax1099Response () {

  /**
   * @name Tax1099Response#tax1099div
   * @type Tax1099DIV
   * @access private
   */
  this.tax1099div = null;

  /**
   * @name Tax1099Response#lstTax1099DIV
   * @type List<Tax1099DIV>
   * @access private
   */
  this.lstTax1099DIV = null;

  /**
   * @name Tax1099Response#lstTax1099INT
   * @type List<Tax1099INT>
   * @access private
   */
  this.lstTax1099INT = null;

  /**
   * @name Tax1099Response#lstTax1099R
   * @type List<Tax1099R>
   * @access private
   */
  this.lstTax1099R = null;

  /**
   * @name Tax1099Response#lstTax1099B
   * @type List<Tax1099B>
   * @access private
   */
  this.lstTax1099B = null;

  /**
   * @name Tax1099Response#lstTax1099MISC
   * @type List<Tax1099MISC>
   * @access private
   */
  this.lstTax1099MISC = null;

  /**
   * @name Tax1099Response#lstTax1099OID
   * @type List<Tax1099OID>
   * @access private
   */
  this.lstTax1099OID = null;
}

inherit(Tax1099Response, "extends", T1099Response);


Aggregate.add("TAX1099RS", Tax1099Response);


/**
 * @return {Tax1099DIV[]} the lstTax1099DIV
 */
Tax1099Response.prototype.getLstTax1099DIV = function() {
  return this.lstTax1099DIV;
};
ChildAggregate.add({required: false, order: 0, owner: Tax1099Response, /*type: Tax1099DIV[],*/ fcn: "getLstTax1099DIV"});


/**
 * @param {Tax1099DIV[]} lstTax1099DIV
 *            the lstTax1099DIV to set
 */
Tax1099Response.prototype.setLstTax1099DIV = function(lstTax1099DIV) {
  this.lstTax1099DIV = lstTax1099DIV;
};


Tax1099Response.prototype.getResponseMessageName = function() {
  return "1099 Tax details";
};


/**
 * @return {Tax1099INT[]} the lstTax1099INT
 */
Tax1099Response.prototype.getLstTax1099INT = function() {
  return this.lstTax1099INT;
};
ChildAggregate.add({required: false, order: 1, owner: Tax1099Response, /*type: Tax1099INT[],*/ fcn: "getLstTax1099INT"});


/**
 * @param {Tax1099INT[]} lstTax1099INT the lstTax1099INT to set
 */
Tax1099Response.prototype.setLstTax1099INT = function(lstTax1099INT) {
  this.lstTax1099INT = lstTax1099INT;
};


/**
 * @return {Tax1099R[]} the lstTax1099R
 */
Tax1099Response.prototype.getLstTax1099R = function() {
  return this.lstTax1099R;
};
ChildAggregate.add({required: false, order: 2, owner: Tax1099Response, /*type: Tax1099R[],*/ fcn: "getLstTax1099R"});


/**
 * @param {Tax1099R[]} lstTax1099R the lstTax1099R to set
 */
Tax1099Response.prototype.setLstTax1099R = function(lstTax1099R) {
  this.lstTax1099R = lstTax1099R;
};


/**
 * @return {Tax1099B[]} the lstTax1099B
 */
Tax1099Response.prototype.getLstTax1099B = function() {
  return this.lstTax1099B;
};
ChildAggregate.add({required: false, order: 3, owner: Tax1099Response, /*type: Tax1099B[],*/ fcn: "getLstTax1099B"});


/**
 * @param {Tax1099B[]} lstTax1099B the lstTax1099B to set
 */
Tax1099Response.prototype.setLstTax1099B = function(lstTax1099B) {
  this.lstTax1099B = lstTax1099B;
};


/**
 * @return {Tax1099MISC[]} the lstTax1099MISC
 */
Tax1099Response.prototype.getLstTax1099MISC = function() {
  return this.lstTax1099MISC;
};
ChildAggregate.add({required: false, order: 4, owner: Tax1099Response, /*type: Tax1099MISC[],*/ fcn: "getLstTax1099MISC"});


/**
 * @param {Tax1099MISC[]} lstTax1099MISC the lstTax1099MISC to set
 */
Tax1099Response.prototype.setLstTax1099MISC = function(lstTax1099MISC) {
  this.lstTax1099MISC = lstTax1099MISC;
};


/**
 * @return {Tax1099OID[]} the lstTax1099OID
 */
Tax1099Response.prototype.getLstTax1099OID = function() {
  return this.lstTax1099OID;
};
ChildAggregate.add({required: false, order:5, owner: Tax1099Response, /*type: Tax1099OID[],*/ fcn: "getLstTax1099OID"});


/**
 * @param {Tax1099OID[]} lstTax1099OID the lstTax1099OID to set
 */
Tax1099Response.prototype.setLstTax1099OID = function(lstTax1099OID) {
  this.lstTax1099OID = lstTax1099OID;
};




module.exports = Tax1099Response;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../common/T1099Response":"/Users/aolson/Developer/ofx4js/src/domain/data/common/T1099Response.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099ResponseMessageSet.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessageSet
 */
function Tax1099ResponseMessageSet () {

  /**
   * @name Tax1099ResponseMessageSet#taxResponseTransaction
   * @type List<Tax1099ResponseTransaction>
   * @access private
   */
  this.taxResponseTransaction = null;
}

inherit(Tax1099ResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("TAX1099MSGSRSV1", Tax1099ResponseMessageSet);


Tax1099ResponseMessageSet.prototype.getType = function() {
  return MessageSetType.tax1099;
};


/**
 * The taxResponseTransaction list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {Tax1099ResponseTransaction[]} The taxResponseTransaction list.
 */
Tax1099ResponseMessageSet.prototype.getTaxResponseTransaction = function() {
  return this.taxResponseTransaction;
};
ChildAggregate.add({order: 0, owner: Tax1099ResponseMessageSet, /*type: Tax1099ResponseTransaction[],*/ fcn: "getTaxResponseTransaction"});


/**
 * The taxResponseTransaction.
 *
 * @param {Tax1099ResponseTransaction[]} taxResponseTransaction The statement responses.
 */
Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction = function(taxResponseTransaction) {
  this.taxResponseTransaction = taxResponseTransaction;
};


// Inherited.
Tax1099ResponseMessageSet.prototype.getResponseMessages = function() {
  return this.taxResponseTransaction;
};


/**
 * The first statement response.
 *
 * @return {Tax1099ResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
Tax1099ResponseMessageSet.prototype.getStatementResponse = function() {
  return this.taxResponseTransaction === null || this.taxResponseTransaction.isEmpty() ? null : this.taxResponseTransaction.get(0);
};


Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction = function(/*Tax1099ResponseTransaction*/ taxResponseTransaction) {
  this.taxResponseTransaction = taxResponseTransaction;
};




module.exports = Tax1099ResponseMessageSet;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../MessageSetType":"/Users/aolson/Developer/ofx4js/src/domain/data/MessageSetType.js","../ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/ResponseMessageSet.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099ResponseTransaction.js":[function(require,module,exports){
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Tax1099Response = require("./Tax1099Response");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function Tax1099ResponseTransaction () {

  /**
   * @name Tax1099ResponseTransaction#tax1099Response
   * @type Tax1099Response
   * @access private
   */
  this.tax1099Response = null;
}

inherit(Tax1099ResponseTransaction, "extends", new TransactionWrappedResponseMessage(Tax1099Response));


Aggregate.add("TAX1099TRNRS", Tax1099ResponseTransaction);


/**
 * The tax1099Response.
 *
 * @return {Tax1099Response} The tax1099Response.
 */
Tax1099ResponseTransaction.prototype.getTax1099Response = function() {
  return this.tax1099Response;
};
ChildAggregate.add({required:false, order: 2, owner: Tax1099ResponseTransaction, /*type: Tax1099Response,*/ fcn: "getTax1099Response"});


/**
 * The tax1099Response.
 *
 * @param {Tax1099Response} tax1099Response The message.
 */
Tax1099ResponseTransaction.prototype.setTax1099Response = function(tax1099Response) {
  this.tax1099Response = tax1099Response;
};


// Inherited.
Tax1099ResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getTax1099Response();
};




module.exports = Tax1099ResponseTransaction;

},{"../../../meta/Aggregate":"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js","../../../meta/ChildAggregate":"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js","../../../util/inherit":"/Users/aolson/Developer/ofx4js/src/util/inherit.js","../TransactionWrappedResponseMessage":"/Users/aolson/Developer/ofx4js/src/domain/data/TransactionWrappedResponseMessage.js","./Tax1099Response":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Response.js"}],"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/index.js":[function(require,module,exports){
"use strict";

module.exports = {
  ExtDBInfo: require("./ExtDBInfo"),
  PayerAddress: require("./PayerAddress"),
  ProcDet: require("./ProcDet"),
  RecAddress: require("./RecAddress"),
  Tax1099B: require("./Tax1099B"),
  Tax1099DIV: require("./Tax1099DIV"),
  Tax1099INT: require("./Tax1099INT"),
  Tax1099MISC: require("./Tax1099MISC"),
  Tax1099OID: require("./Tax1099OID"),
  Tax1099R: require("./Tax1099R"),
  Tax1099Request: require("./Tax1099Request"),
  Tax1099RequestMessageSet: require("./Tax1099RequestMessageSet"),
  Tax1099RequestTransaction: require("./Tax1099RequestTransaction"),
  Tax1099Response: require("./Tax1099Response"),
  Tax1099ResponseMessageSet: require("./Tax1099ResponseMessageSet"),
  Tax1099ResponseTransaction: require("./Tax1099ResponseTransaction"),
};

},{"./ExtDBInfo":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/ExtDBInfo.js","./PayerAddress":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/PayerAddress.js","./ProcDet":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/ProcDet.js","./RecAddress":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/RecAddress.js","./Tax1099B":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099B.js","./Tax1099DIV":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099DIV.js","./Tax1099INT":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099INT.js","./Tax1099MISC":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099MISC.js","./Tax1099OID":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099OID.js","./Tax1099R":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099R.js","./Tax1099Request":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Request.js","./Tax1099RequestMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099RequestMessageSet.js","./Tax1099RequestTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099RequestTransaction.js","./Tax1099Response":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099Response.js","./Tax1099ResponseMessageSet":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099ResponseMessageSet.js","./Tax1099ResponseTransaction":"/Users/aolson/Developer/ofx4js/src/domain/data/tax1099/Tax1099ResponseTransaction.js"}],"/Users/aolson/Developer/ofx4js/src/meta/Aggregate.js":[function(require,module,exports){
/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function() {};

//package net.sf.ofx4j.meta;
//
//import java.lang.annotation.*;
//
///**
// * Annotation for a method that returns an OFX aggregate.
// *
// * @author Ryan Heaton
// */
//@Target ( ElementType.TYPE )
//@Retention ( RetentionPolicy.RUNTIME )
//public @interface Aggregate {
//
//  /**
//   * The name of the aggregate.
//   *
//   * @return The name of the aggregate.
//   */
//  String value() default "#NOT_SET#";
//}

},{}],"/Users/aolson/Developer/ofx4js/src/meta/ChildAggregate.js":[function(require,module,exports){
/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function() {};

//package net.sf.ofx4j.meta;
//
//import java.lang.annotation.Retention;
//import java.lang.annotation.RetentionPolicy;
//import java.lang.annotation.Target;
//import java.lang.annotation.ElementType;
//
///**
// * Marks a method as providing a child aggregate (or set of them to a top-level aggregate).
// *
// * @author Ryan Heaton
// */
//@Target ( ElementType.METHOD )
//@Retention ( RetentionPolicy.RUNTIME)
//public @interface ChildAggregate {
//
//  /**
//   * Used to specify the name of the aggregate in its context as a child aggregate.
//   *
//   * @return Used to specify the name of the aggregate in its context as a child aggregate.
//   */
//  String name() default "##not_specified##";
//
//  /**
//   * Whether this aggregate is required.
//   *
//   * @return Whether this aggregate is required.
//   */
//  boolean required() default false;
//
//  /**
//   * The order this child aggregate comes in its parent aggregate.
//   *
//   * @return The order this child aggregate comes in its parent aggregate.
//   */
//  int order();
//
//}
},{}],"/Users/aolson/Developer/ofx4js/src/meta/Element.js":[function(require,module,exports){
/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function() {};

//'use strict';
//
//
///**
// * An OFX element, applied to a javabean property.
// *
// * @typedef {Object} ElementParams
// * @property {string} name - The name of the element.
// * @property {bool} [required=false] - Whether this element is required.
// * @property {int} order - The order this element comes in its parent aggregate.
// */
//function Element() {
//  
//}
//public @interface Element {
//
//  /**
//   * The name of the element.
//   *
//   * @return The name of the element.
//   */
//  String name();
//
//  /**
//   * Whether this element is required.
//   *
//   * @return Whether this element is required.
//   */
//  boolean required() default false;
//
//  /**
//   * The order this element comes in its parent aggregate.
//   *
//   * @return The order this element comes in its parent aggregate.
//   */
//  int order();
//}

},{}],"/Users/aolson/Developer/ofx4js/src/meta/Header.js":[function(require,module,exports){
/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function() {};

//package net.sf.ofx4j.meta;
//
//import java.lang.annotation.*;
//
///**
// * An OFX element, applied to a javabean property.
// *
// * @author Ryan Heaton
// */
//@Target ( ElementType.METHOD )
//@Retention ( RetentionPolicy.RUNTIME)
//public @interface Header {
//
//  /**
//   * The name of the element.
//   *
//   * @return The name of the element.
//   */
//  String name();
//
//}
},{}],"/Users/aolson/Developer/ofx4js/src/util/inherit.js":[function(require,module,exports){
"use strict";

function inherit(child, type, parent) {
  switch(type) {
    case 'extends':
      child.prototype = Object.create(parent);
      child.prototype.constructor = child;
      break;
      
    case 'implements':
      break;
      
    default:
      throw new Error("unknown inheritance type");
  }
}

module.exports = inherit;

},{}]},{},["./src/domain/data/index.js"])


//# sourceMappingURL=ofx4js.js.map