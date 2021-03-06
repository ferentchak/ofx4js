import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * @see "Section 13.7.1.1, OFX Spec"
 */
export class InvestmentV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private supportsStatementsDownload: boolean;
  private supportsOpenOrdersDownload: boolean;
  private supportsPositionsDownload: boolean;
  private supportsBalanceDownload: boolean;
  private supportsEmail: boolean;
  private supports401kInformation: boolean;
  private supportsClosingStatements: boolean;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.investment;
  }

  public getSupportsStatementsDownload(): boolean {
    return this.supportsStatementsDownload;
  }

  public setSupportsStatementsDownload(supportsStatementsDownload: boolean): void {
    this.supportsStatementsDownload = supportsStatementsDownload;
  }

  public getSupportsOpenOrdersDownload(): boolean {
    return this.supportsOpenOrdersDownload;
  }

  public setSupportsOpenOrdersDownload(supportsOpenOrdersDownload: boolean): void {
    this.supportsOpenOrdersDownload = supportsOpenOrdersDownload;
  }

  public getSupportsPositionsDownload(): boolean {
    return this.supportsPositionsDownload;
  }

  public setSupportsPositionsDownload(supportsPositionsDownload: boolean): void {
    this.supportsPositionsDownload = supportsPositionsDownload;
  }

  public getSupportsBalanceDownload(): boolean {
    return this.supportsBalanceDownload;
  }

  public setSupportsBalanceDownload(supportsBalanceDownload: boolean): void {
    this.supportsBalanceDownload = supportsBalanceDownload;
  }

  public getSupportsEmail(): boolean {
    return this.supportsEmail;
  }

  public setSupportsEmail(supportsEmail: boolean): void {
    this.supportsEmail = supportsEmail;
  }

  public getSupports401kInformation(): boolean {
    return this.supports401kInformation;
  }

  public setSupports401kInformation(supports401kInformation: boolean): void {
    this.supports401kInformation = supports401kInformation;
  }

  public getSupportsClosingStatements(): boolean {
    return this.supportsClosingStatements;
  }

  public setSupportsClosingStatements(supportsClosingStatements: boolean): void {
    this.supportsClosingStatements = supportsClosingStatements;
  }
}

Aggregate_add( InvestmentV1MessageSetInfo, "INVSTMTMSGSETV1" );
Element_add(InvestmentV1MessageSetInfo, { name: "TRANDNLD", required:true, order: 10, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsStatementsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsStatementsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "OODNLD", required:true, order: 20, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsOpenOrdersDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsOpenOrdersDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "POSDNLD", required:true, order: 30, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsPositionsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsPositionsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "BALDNLD", required:true, order: 40, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsBalanceDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsBalanceDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "CANEMAIL", required:true, order: 50, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsEmail, write: InvestmentV1MessageSetInfo.prototype.setSupportsEmail });
Element_add(InvestmentV1MessageSetInfo, { name: "INV401KDNLD", order: 60, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupports401kInformation, write: InvestmentV1MessageSetInfo.prototype.setSupports401kInformation });
Element_add(InvestmentV1MessageSetInfo, { name: "CLOSINGAVAIL", order: 70, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsClosingStatements, write: InvestmentV1MessageSetInfo.prototype.setSupportsClosingStatements });
