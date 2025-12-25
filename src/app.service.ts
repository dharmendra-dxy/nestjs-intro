import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const APP_NAME = this.configService.get<string>('APP_NAME');
    const NODE_ENV = this.configService.get<string>('NODE_ENV');
    
    console.log("APP_NAME: ", APP_NAME);
    console.log("NODE_ENV: ", NODE_ENV);

    return 'Hello World!';
  }
}
