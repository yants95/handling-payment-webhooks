export class WebhookOrigin {
  private constructor(private readonly originName: string) {}

  public static matchSpecific(origin: string): WebhookOrigin {
    return new WebhookOrigin(origin);
  }

  public matches(origin: string): boolean {
    return this.originName === origin;
  }
}
