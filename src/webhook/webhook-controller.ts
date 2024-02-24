/* eslint-disable @typescript-eslint/no-unused-vars */
import { webhookHandlers } from "@/webhook/webhook";
import { WebhookHandler } from "@/webhook/webhook-handler";
import { WebhookPayload } from "@/webhook/webhook-payload";
import { Response } from "express";
import { injectable } from "inversify";
import {
  Body,
  JsonController,
  Post,
  Res,
  getFromContainer,
} from "routing-controllers";

@injectable()
@JsonController()
export class WebhookController {
  @Post("/webhooks")
  public async webhook(
    @Body() body: WebhookPayload,
    @Res() res: Response,
  ) {
    await this.triggerHandlers(body);

    return res.sendStatus(200);
  }

  private async triggerHandlers(body: WebhookPayload): Promise<void> {
    await Promise.all(
      this.getHandlersFromOrigin(body.event).map(async (handlerConstructor) =>
        this.runWebhookHandler(getFromContainer(handlerConstructor), body),
      ),
    );
  }

  private getHandlersFromOrigin(
    origin: string,
  ): Array<new () => WebhookHandler> {
    return Array.from(webhookHandlers.entries())
        .filter(([originMatcher, _]) => originMatcher.matches(origin))
        .map(([_, handlerConstructor]) => handlerConstructor);
  }

  private async runWebhookHandler(
    handler: WebhookHandler,
    payload: unknown,
  ): Promise<void> {
    await handler.execute(payload);
  }
}
