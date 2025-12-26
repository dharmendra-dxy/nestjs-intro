import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule,

    // configure JWT
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService], // TODO: JWT strategy, roles guard
  exports:[AuthService] // TODO: roles gaurd
})
export class AuthModule {}
