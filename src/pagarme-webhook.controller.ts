import { Controller, Inject, Post, Req } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { PagarmeWebhookPayload } from 'src/pagarme-webhook-payload';
import { PagarmeWebhookDomainEvent } from 'src/pagarme-webhook.domain-event';
import { PagarmeWebhookEvents } from 'src/webhook';

@Controller('/webhooks/pagarme')
export class PagarmeWebhookController {
  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {}

  @Post()
  public async webhook(@Req() req: Request): Promise<void> {
    const pagarmeBody = new PagarmeWebhookPayload(req.body.type, req.body);
    return this.eventBus.publish(
      new PagarmeWebhookDomainEvent({
        pagarmeWebhookPayload: {
          origin: pagarmeBody.type as PagarmeWebhookEvents,
          data: pagarmeBody,
        },
      }),
    );
  }
}
