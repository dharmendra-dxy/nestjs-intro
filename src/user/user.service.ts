import { Injectable } from '@nestjs/common';
import { HealthService } from 'src/health/health.service';

@Injectable()
export class UserService {

  constructor(private readonly healthService: HealthService){}

  getAllUsers(){
    return [
      {id:1, name: "John Doe"},
      {id:2, name: "Mery Doe"},
      {id:3, name: "Ganesh Doe"},
      {id:4, name: "Sharma Doe"},
      {id:5, name: "Aniket Doe"},
    ]
  }

  getUserWithId(id:number){
    const user= this.getAllUsers().find(user => user.id===id)
    return user;
  }


  greetUserHealth(name: string){
    return this.healthService.getHealthWithName(name);
  }
}
