import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HealthModule } from 'src/health/health.module';

@Module({
  imports: [HealthModule], //import other required module
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
