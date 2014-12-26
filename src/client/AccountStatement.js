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
function AccountStatement() {
}

/**
 * The currency code.
 *
 * @return {String} The currency code.
 * @see java.util.Currency#getCurrencyCode()
 */
AccountStatement.prototype.getCurrencyCode = function() { throw new Error("not implemented"); };

/**
 * The transaction list.
 *
 * @return {TransactionList} The transaction list.
 */
AccountStatement.prototype.getTransactionList = function() { throw new Error("not implemented"); };

/**
 * The ledger balance.
 *
 * @return {BalanceInfo} The ledger balance.
 */
AccountStatement.prototype.getLedgerBalance = function() { throw new Error("not implemented"); };

/**
 * The available balance.
 *
 * @return {BalanceInfo} The available balance.
 */
AccountStatement.prototype.getAvailableBalance = function() { throw new Error("not implemented"); };


module.exports = AccountStatement;