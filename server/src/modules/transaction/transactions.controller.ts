import { Body, Controller, Get, Post, Request, UseGuards,Param, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {TransactionDto} from './dto/transaction.dto'
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService, private accountService:AccountService) {}

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
    const exists = await this.accountService.findAccount(sDto.from_To);
    if(sDto.amount-value>0 || !exists){
      throw new HttpException('it is not avilable', HttpStatus.BAD_REQUEST);
    }
    const sender = this.transactionService.createTransaction(sDto);
    const reciever = this.transactionService.createRTransaction(sDto);
    return [sender,reciever];
  }
}
