import { Injectable } from '@nestjs/common';
import { PagarmeOrderPaidPayload } from 'src/pagarme-order-paid-webhook-payload';
import { PagarmeWebhookPayload } from 'src/pagarme-webhook-payload';
import { PagarmeWebhookHandler } from 'src/webhook';

@Injectable()
export class PagarmeOrderPaidWebhookHandler implements PagarmeWebhookHandler {
  public constructor() {}

  public async process(payload: PagarmeWebhookPayload): Promise<void> {
    console.log('pagarme order paid payload', payload);
    const orderPaidPayload = await payload.getPayload(PagarmeOrderPaidPayload);
    console.log('ORDER PAID PAYLOAD', orderPaidPayload);

    // do whatever you need
  }
}
