import { Controller, Get, Res } from '@nestjs/common';
import { AblyService } from './ably.service';
import { Response } from 'express';

@Controller('ably')
export class AblyController {
  constructor(private ablyService: AblyService) {}

  @Get('auth')
  async createTokenRequest(@Res() res: Response) {
    const tokenParams = {
      clientId: 'stickyqr-client-id',
    };
    const rest = await this.ablyService.getRest();
    try {
      const tokenRequest = await rest.auth.createTokenRequest(tokenParams);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(tokenRequest));
    } catch (err) {
      res.status(500).send('Error requesting token: ' + JSON.stringify(err));
    }
  }
}
