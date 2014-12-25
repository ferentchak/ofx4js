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