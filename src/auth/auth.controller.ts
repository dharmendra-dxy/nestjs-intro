import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    const user = await this.authService.registerUser(registerDto);
    return {
      success: true,
      user,
      message: "User created succesfully"
    };
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto){
    const {user, tokens } = await this.authService.loginUser(loginDto);

    return {
      success: true,
      message: "User Loggedin",
      user,
      tokens
    }
  }

  @Post('refresh')
  async refreshToken(@Body("refreshToken") refreshToken: string){
    const accessToken = await this.refreshToken(refreshToken);
    return {
      accessToken
    }
  }
}
