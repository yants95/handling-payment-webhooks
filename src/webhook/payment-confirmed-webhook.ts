

import { PaymentConfirmedWebhookPayload } from "@/webhook/payment-confirmed-webhook-payload";
import { Webhook } from "@/webhook/webhook";
import { WEBHOOK_EVENTS } from "@/webhook/webhook-events";
import { WebhookHandler } from "@/webhook/webhook-handler";
import { WebhookOrigin } from "@/webhook/webhook-origin";
import { injectable } from "inversify";

@injectable()
@Webhook(WebhookOrigin.matchSpecific(WEBHOOK_EVENTS.PAYMENT_CONFIRMED))
export class PaymentConfirmedWebhook implements WebhookHandler {
  public constructor() {}

  async execute(payload: PaymentConfirmedWebhookPayload): Promise<void> {
    console.log("PAYMENT CONFIRMED WEBHOOK", payload.payment);
  }
}
