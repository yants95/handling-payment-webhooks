import { plainToClass } from "class-transformer";
import { IsString, validateOrReject } from "class-validator";

export type Newable<T> = new (...args: any[]) => T;

const emptyObject = {};

export type ObjectLiteral = typeof emptyObject;

export class WebhookPayload {
  @IsString()
  public event!: string;

  public payload!: unknown;

  public async getPayload<T extends object>(dataType: Newable<T>): Promise<T> {
    const data = plainToClass(dataType, this.payload);
    await validateOrReject(data);
    return data;
  }
}
