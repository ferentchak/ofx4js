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