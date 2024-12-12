import { Module, Provider } from '@nestjs/common';
import { PagarmeWebhookEvents, PagarmeWebhookHandler } from 'src/webhook';
import { CqrsModule } from '@nestjs/cqrs';
import { PagarmeOrderPaidWebhookHandler } from 'src/pagarme-order-paid.webhook-handler';
import { PagarmeWebhookEventHandler } from 'src/pagarme-webhook.event-handler';
import { PagarmeWebhookController } from 'src/pagarme-webhook.controller';

export const PagarmeWebhookEventHandlersProvider: Provider = {
  provide: 'PagarmeWebhookHandlersProvider',
  useFactory: (pagarmeOrderPaid: PagarmeOrderPaidWebhookHandler) =>
    new Map<PagarmeWebhookEvents, PagarmeWebhookHandler>([
      [PagarmeWebhookEvents.orderPaid, pagarmeOrderPaid],
    ]),
  inject: [PagarmeOrderPaidWebhookHandler],
};

@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [PagarmeWebhookController],
  providers: [
    PagarmeWebhookEventHandlersProvider,
    PagarmeWebhookEventHandler,
    PagarmeOrderPaidWebhookHandler,
  ],
  exports: [
    PagarmeWebhookEventHandlersProvider,
    PagarmeWebhookEventHandler,
    PagarmeOrderPaidWebhookHandler,
  ],
})
export class AppModule {}
