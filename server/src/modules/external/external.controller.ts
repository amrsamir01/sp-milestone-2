import { Body, Controller, Get, Post, Request, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import { exteranlDto } from './dto/exteranlDto.dto'
import {ObjectId} from 'mongoose';
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class externalController {
  // TODO: Define your Transaction Endpoints
  constructor(private transactionService: TransactionService) {}


@Get()
getAll():any{
  return this.transactionService.getAll();
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
    const sender = this.externalService.externalTransaction(senderDto);
    const reciever = this.externalService.externalTransaction(senderDto);
    return [sender,reciever];
  }
}
