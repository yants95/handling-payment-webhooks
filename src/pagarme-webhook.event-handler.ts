import { Inject, Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PagarmeWebhookDomainEvent } from 'src/pagarme-webhook.domain-event';
import { PagarmeWebhookEvents, PagarmeWebhookHandler } from 'src/webhook';

@EventsHandler(PagarmeWebhookDomainEvent)
@Injectable()
export class PagarmeWebhookEventHandler
  implements IEventHandler<PagarmeWebhookDomainEvent>
{
  public constructor(
    @Inject('PagarmeWebhookHandlersProvider')
    private readonly handlers: Map<PagarmeWebhookEvents, PagarmeWebhookHandler>,
  ) {}

  public async handle(event: PagarmeWebhookDomainEvent): Promise<void> {
    console.log('pagarme event', event);
    const handler = this.handlers.get(
      event.pagarmeWebhookPayload.type as PagarmeWebhookEvents,
    );
    if (!handler) return;
    return handler.process(event.pagarmeWebhookPayload.payload);
  }
}
