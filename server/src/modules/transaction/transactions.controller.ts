import { Body, Controller, Get, Post, Request, UseGuards,Param, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import {TransactionDto} from './dto/transaction.dto'
import {ObjectId} from 'mongoose';
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class TransactionController {
  // TODO: Define your Transaction Endpoints
  constructor(private transactionService: TransactionService, private accountService:AccountService) {}

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
  async InnerT(@Body() sDto:TransactionDto):Promise<any>{
    console.log(sDto);
    const value = await this.accountService.calculateBalance(sDto.accountid);
    if(sDto.amount-value>0){
      throw new HttpException('it is not avilable', HttpStatus.BAD_REQUEST);
    }
    const sender = this.transactionService.createTransaction(sDto);
    const reciever = this.transactionService.createRTransaction(sDto);
    return [sender,reciever];
  }
}
