import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './common/pipes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UsePipes(ValidationPipe)
  @Get('metrics')
  async getMetrics(@Query('url') url: string): Promise<any> {
    if (!url) {
      throw new BadRequestException('URL parameter is required');
    }
    return await this.appService.getMetrics(url);
  }
}
