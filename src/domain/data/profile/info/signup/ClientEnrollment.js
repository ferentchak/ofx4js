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