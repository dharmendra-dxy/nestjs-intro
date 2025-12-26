import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  validate(...args: any[]): unknown {
    throw new Error("Method not implemented.");
  }
  constructor(private authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authService.JWT_SECRET
    })
  }

  async validateJWT(payload:any){
    try{
      const user = await this.authService.getUserById(payload.sub)
      return {
        ...user,
        role: payload.role
      }
    } catch(err){
      throw new UnauthorizedException("Invalid Token")
    }
  }
}