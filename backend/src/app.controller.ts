import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AppService } from './app.service';

class QueryDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  add?: string;

  @IsOptional()
  @ApiPropertyOptional()
  clear?: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOkResponse({ type: [String] })
  @Get('data')
  getData(@Query() { add, clear }: QueryDto) {
    if (add) {
      return this.appService.addData(add);
    }

    if (clear) {
      return this.appService.clearData();
    }

    return this.appService.getData();
  }
}
