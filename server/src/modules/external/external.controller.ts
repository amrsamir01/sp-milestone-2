import { Body, Controller, Get, Post, Request, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { externalService } from './external.services';
import {ObjectId} from 'mongoose';
import { AccountService } from '../account/account.service';
import { exteranlDto } from './dto/external.dto';
import { Transaction } from '@sp/schemas';
import { JwtService } from '@nestjs/jwt/dist';

@Controller('transactions')
export class externalController {
  
  private jwtService: JwtService;

  // TODO: Define your Transaction Endpoints
  constructor(private externalService: externalService) {}


@Get()
getAll():any{
  return this.externalService.getAll();
}


  @Get(':accountId')
  transaction(@Param('accountId') accountId: number): any {
    return this.externalService.getTrancation(accountId);
  }

  @Post('')
  CreateTransaction(@Body() dto:exteranlDto):any{
      const transaction = this.externalService.createTransaction(dto);
      return transaction;
  }

  @Post('outerT')
  async externalTransaction(@Body() dto:exteranlDto){

    // const sender = this.externalService.createTransaction(senderDto);
    // const reciever = this.externalService.createTransaction(senderDto);

    if(dto.amount > 50){
      console.log("cannot transfer more than 50$")
    }
    else{
      var payload: Transaction = await this.externalService.createTransaction(dto);
      console.log(payload);
      if (payload != null) {
        const myToken = { accointit: payload.accountid, amount: payload.amount };
        console.log(myToken);
        const access_token = this.jwtService.sign(myToken, {
          secret: process.env.My_secret_Token,
          expiresIn: "1h",
        });
      }
    }
  }
}
