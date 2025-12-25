import { Controller, Get, Param, Query } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('/api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    return this.healthService.getHealth();
  }

  // url: /api/health/id/1
  @Get("id/:id")
  getHealthWithId(@Param('id') id: number) {
    return this.healthService.getHeahlthWithId(id);
  }

  // api/health/user/:name
  @Get('user/:name')
  getHealthForUser(@Param("name") name:string){
    return this.healthService.getHealthWithName(name ?? "John Doe")
  }

  // url: /api/health/query?name=max
  @Get("query")
  getHealthWithQuery(@Query('name') name:string){
    return this.healthService.getHealthWithQuery(name ?? "default")
  }
}
