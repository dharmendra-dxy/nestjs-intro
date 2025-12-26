import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private SALT = 10;
  private JWT_SECRET="3ndsflsnd3v4"
  private JWT_REFRESH_SECRET="3asdlsnd3v4"
  
  private async hashThePassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT);
  }

  private async verifyPassword(hashedPassword:string, password:string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  private generateAccessToken(user: User): string{
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role
    }
    const token = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET,
      expiresIn:"15m",
    })
    return token;
  }

  private generateRefreshToken(user: User): string{
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role
    }
    const token = this.jwtService.sign(payload, {
      secret: this.JWT_REFRESH_SECRET,
      expiresIn:"7d",
    })
    return token;
  }

  private generateToken(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    }
  }

  async refreshToken(refreshToken: string) {
    try{

      // verify the token first:
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.JWT_REFRESH_SECRET
      });

      const user = await this.getUserByEmail(payload.email)

      const accessToken = this.generateAccessToken(user);
      return accessToken;
    }
    catch(err){
      throw new UnauthorizedException("Invalid Token")
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {email}
    })
    if(!user){
      throw new UnauthorizedException("No user exsist with the email!")
    }
    return user;
  }
  
  async registerUser(registerDto: RegisterDto): Promise<User> {
    const {name, email, password} = registerDto;

    const exsistingUser = await this.userRepository.findOne({
      where: {email}
    })

    if(exsistingUser){
      throw new ConflictException("User already exsists with the email!")
    }

    const hashedPassword = await this.hashThePassword(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER
    })

    const newUser= this.userRepository.save(user);
    return newUser;
  }

  async loginUser(loginDto: LoginDto) {
    const {email, password} = loginDto;

    const user = await this.getUserByEmail(email);
    const isPasswordMatched = await this.verifyPassword(user.password, password);
    console.log("isPasswordMatched - ", isPasswordMatched);

    if(!isPasswordMatched){
      throw new UnauthorizedException("Invalid credentials")
    }

    // Generate the tokens:
    const tokens = this.generateToken(user);

    return {
      user,
      tokens
    }

  }

}
