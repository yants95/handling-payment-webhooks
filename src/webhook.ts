import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Newable } from 'src/generic-types';

export abstract class WebhookPayload {
  constructor(
    public type: string,
    public payload: unknown,
  ) {}

  public async getPayload<T extends object>(dataType: Newable<T>): Promise<T> {
    const data = plainToClass(dataType, this.payload);
    await validateOrReject(data);
    return data;
  }
}

export enum PagarmeWebhookEvents {
  orderPaid = 'order.paid',
}

export abstract class PagarmeWebhookHandler {
  public abstract process(event: unknown): Promise<void>;
}
