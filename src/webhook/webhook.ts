import { WebhookHandler } from "@/webhook/webhook-handler";
import { WebhookOrigin } from "@/webhook/webhook-origin";

type WebhookHandlerConstructor = new (...args: any[]) => WebhookHandler;

export const webhookHandlers: Map<WebhookOrigin, WebhookHandlerConstructor> = new Map();

export function addHandler(origin: WebhookOrigin, handlerConstructor: WebhookHandlerConstructor,): void {
  webhookHandlers.set(origin, handlerConstructor);
}

export function Webhook(origin: WebhookOrigin) {
  return function classDecorator<T extends WebhookHandlerConstructor>(handlerConstructor: T): T {
    addHandler(origin, handlerConstructor);
    return handlerConstructor;
  };
}
