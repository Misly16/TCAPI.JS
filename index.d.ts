import { TypedEmitter } from 'tiny-typed-emitter';

interface TCAPIWebhookOptions {
  port?: number;
  path?: string;
}

interface VoteInfo {
  userID: string;
  date: Date;
}

interface TCAPIWebhookEvents {
  vote: (data: VoteInfo) => void;
  listening: (data: TCAPIWebhookOptions) => void;
}

declare class TCAPIWebhook extends TypedEmitter<TCAPIWebhookEvents> {
  public port?: number;
  public path?: string;

  public constructor(port?: number, path?: string);
  private listening(): void;
}
  
interface TCAPIEvents {
  success: () => void;
  error: (error: Error) => void;
}

export default class TCAPI extends TypedEmitter<TCAPIEvents> {
  public token: string;
  public options: TCAPIWebhookOptions;
  public webhook: TCAPIWebhook;

  public constructor(token: string, options?: TCAPIWebhookOptions, client?: any);
  private post(): Promise<void>;
}
