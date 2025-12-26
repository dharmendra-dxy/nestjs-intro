import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


/* 
* Protects the route that requires authentications
*/

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){

}