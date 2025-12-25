import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

  getHealth(){
    return {
      success: true,
      message: "APIs are working fine"
    }
  }


  getHeahlthWithId(id: number){
    return {
      success: true,
      message: `PARAMS: APIs is working fine - ${id}`
    }
  }

  getHealthWithQuery(name: string){
    return {
      success: true,
      message: `QUERY: Api's are working fine - ${name}`
    }
  }

  getHealthWithName(name:string){
    return {
      success: true,
      message: `NAME: Api's are working fine for - ${name}`
    }
  }


}
