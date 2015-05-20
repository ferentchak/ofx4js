/*
 * Copyright 2010 Web Cohesion
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
import {SecurityRequest} from "SecurityRequest";
import {RequestMessage} from "../RequestMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * Request aggregate for the security list.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityListRequest extends RequestMessage {

  private securityRequests: Array<SecurityRequest>;

  public getSecurityRequests(): Array<SecurityRequest> {
    return this.securityRequests;
  }

  public setSecurityRequests(securityRequests: Array<SecurityRequest>): void {
    this.securityRequests = securityRequests;
  }
}

Aggregate_add(SecurityListRequest, "SECLISTRQ");
ChildAggregate_add(SecurityListRequest, { required: true, order: 10, type: Array, collectionEntryType: SecurityRequest, read: SecurityListRequest.prototype.getSecurityRequests, write: SecurityListRequest.prototype.setSecurityRequests });


