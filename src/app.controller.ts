import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('metrics')
  async getMetrics(@Query('url') url: string): Promise<any> {
    if (!url) {
      throw new BadRequestException('URL parameter is required');
    }
    return await this.appService.getMetrics(url);
  }
}
