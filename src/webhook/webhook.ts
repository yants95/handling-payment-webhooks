import { WebhookHandler } from "@/webhook/webhook-handler";
import { WebhookOrigin } from "@/webhook/webhook-origin";

type WebhookHandlerConstructor = new (...args: any[]) => WebhookHandler;

export const webhookHandlers: Array<[WebhookOrigin, WebhookHandlerConstructor]> = [];

export function addHandler(origin: WebhookOrigin, handlerConstructor: WebhookHandlerConstructor,): void {
  webhookHandlers.push([origin, handlerConstructor]);
}

export function Webhook(origin: WebhookOrigin) {
  return function classDecorator<T extends WebhookHandlerConstructor>(handlerConstructor: T): T {
    addHandler(origin, handlerConstructor);
    return handlerConstructor;
  };
}
