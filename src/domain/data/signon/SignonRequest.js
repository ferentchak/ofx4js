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