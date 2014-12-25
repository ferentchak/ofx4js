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