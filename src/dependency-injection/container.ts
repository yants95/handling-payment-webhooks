import { diContainer } from "@/dependency-injection/di-container";
import { PaymentConfirmedWebhook } from "@/webhook/payment-confirmed-webhook";
import { WebhookController } from "@/webhook/webhook-controller";

diContainer.bind(WebhookController).toSelf();
diContainer.bind(PaymentConfirmedWebhook).toSelf();