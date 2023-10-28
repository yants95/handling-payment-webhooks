import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";

export class PayloadWebhookData {
  @IsDefined()
  public customer!: string;
}

export class PaymentConfirmedWebhookPayload {
  @ValidateNested()
  @Type(() => PayloadWebhookData)
  @IsDefined()
  public payment!: PayloadWebhookData;
}
