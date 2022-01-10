import { Body, Controller, Get, Post, Request, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { externalService } from './external.services';
import {ObjectId} from 'mongoose';
import { AccountService } from '../account/account.service';
import { exteranlDto } from './dto/external.dto';

@Controller('transactions')
export class externalController {
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
  externalTransaction(@Body() senderDto:exteranlDto):any{
    // const sender = this.externalService.CreateTransaction(senderDto);
    // const reciever = this.externalService.CreateTransaction(senderDto);
    // return [sender,reciever];
  }
}
