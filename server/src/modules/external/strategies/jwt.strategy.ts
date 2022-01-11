import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey:"My-Secret-Key",
    });
  }
  async validate(payload: any){
    return { 
      receiverAccountNumber:payload.receiverAccountNumber,
      amount:payload.amount,
      description:payload.description
    };
  }
}