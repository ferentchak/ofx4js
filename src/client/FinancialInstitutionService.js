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
function FinancialInstitutionService() {
}

/**
 * Get the financial institution by the specified id.
 *
 * @param {String} fid The financial institution id.
 * @return {FinancialInstitution} The financial institution, or null if not found.
 */
FinancialInstitutionService.prototype.getFinancialInstitution = function(/*fid*/) { throw new Error("not implemented"); };

/**
 * Get the financial institution by the specified data.
 *
 * @param {FinancialInstitutionData} data The financial institution data.
 * @return {FinancialInstitution} The financial institution, or null if not found.
 */
FinancialInstitutionService.prototype.getFinancialInstitution = function(/*data*/) { throw new Error("not implemented"); };


module.exports = FinancialInstitutionService;