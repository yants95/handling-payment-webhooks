import { IsObject } from 'class-validator';

export class PagarmeOrderPaidPayload {
  @IsObject()
  public data: {
    amount: number;
  };
}
