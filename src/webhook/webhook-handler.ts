export abstract class WebhookHandler {
  public abstract execute(payload: unknown): Promise<void>;
}
