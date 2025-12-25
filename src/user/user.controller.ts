import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  getAllUsers(){
    return this.userService.getAllUsers()
  }

  @Get("health/:name")
  getUserHealth(@Param("name") name:string){
    return this.userService.greetUserHealth(name)
  }
}
