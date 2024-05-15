import { Injectable } from '@nestjs/common';
import * as Ably from 'ably';

@Injectable()
export class AblyService {
  private ablyInstance: Ably.Realtime;
  private rest: Ably.Rest;

  constructor() {
    this.ablyInstance = new Ably.Realtime(process.env.ABLY_API_KEY);
    this.rest = new Ably.Rest(process.env.ABLY_API_KEY);
  }

  async connect(): Promise<void> {
    this.ablyInstance.connection.once('connected');
  }

  async disconnect(): Promise<void> {
    this.ablyInstance.close();
  }

  private async getChannel(channelName: string): Promise<Ably.RealtimeChannel> {
    return this.ablyInstance.channels.get(channelName);
  }

  async getRest(): Promise<Ably.Rest> {
    return this.rest;
  }

  async subscribeToChannel(
    channelName: string,
    eventName: string,
    callback: (message) => void,
  ): Promise<void> {
    const channel = await this.getChannel(channelName);
    channel.subscribe(eventName, callback);
  }

  async sendMessage(
    channelName: string,
    eventName: string,
    message: any,
  ): Promise<void> {
    const channel = await this.getChannel(channelName);
    channel.publish(eventName, message);
  }
}
