import { Body, Controller, Get, Post, Request, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import {TransactionDto} from './dto/transaction.dto'
import {ObjectId} from 'mongoose';
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class TransactionController {
  // TODO: Define your Transaction Endpoints
  constructor(private transactionService: TransactionService) {}

  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    

  //@UseGuards(AuthGuard('jwt'))



@Get()
getAll():any{
  return this.transactionService.getAll();
}


  @Get(':accountId')
  transaction(@Param('accountId') accountId: string): any {
    return this.transactionService.getTrancation(accountId);
  }

  @Post('')
  CreateTransaction(@Body() dto:TransactionDto):any{
      const transaction = this.transactionService.createTransaction(dto);
      return transaction;
  }

  @Post('InnerT')
  CreateInnerTransaction(@Body() senderDto:TransactionDto):any{
    const sender = this.transactionService.createTransaction(senderDto);
    const reciever = this.transactionService.createRecieverTransaction(senderDto);
    return [sender,reciever];
  }
}
