import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Newable } from 'src/generic-types';

export class WebhookPayload {
  public constructor(
    public event: string,
    public data: unknown,
  ) {}

  public async getData<T extends object>(dataType: Newable<T>): Promise<T> {
    const data = plainToClass(dataType, this.data);
    await validateOrReject(data);
    return data;
  }
}
