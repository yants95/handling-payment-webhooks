import { PagarmeWebhookPayload } from 'src/pagarme-webhook-payload';
import { PagarmeWebhookEvents } from 'src/webhook';

export interface PagarmeWebhookPayloadPrimitive {
  origin: PagarmeWebhookEvents;
  data: unknown;
}

interface PrimitivesProps {
  pagarmeWebhookPayload: PagarmeWebhookPayloadPrimitive;
}

export class PagarmeWebhookDomainEvent {
  public readonly pagarmeWebhookPayload: PagarmeWebhookPayload;

  public constructor(props: PrimitivesProps) {
    this.pagarmeWebhookPayload = new PagarmeWebhookPayload(
      props.pagarmeWebhookPayload.origin,
      props.pagarmeWebhookPayload.data,
    );
  }
}
