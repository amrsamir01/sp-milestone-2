import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction,TransactionDocument } from '@sp/schemas';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';


@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

   async getTrancation(accountid:string): Promise<Transaction[]> {
    return await this.transactionModel.find({accountid:accountid}).exec();
   }


  async getAll():Promise<any>{
    return await this.transactionModel.find().exec(); 
   }

  
  createTransaction(dto: TransactionDto):any{     
    const newTransaction = new this.transactionModel(dto);
    return newTransaction.save();  
  }
  
  createRTransaction(sDto: TransactionDto):Promise<Transaction>{
    const rDto:TransactionDto = {
      from_To: sDto.accountid,
      Display_date: sDto.Display_date,
      debit: 0,
      credit: 1,
      amount: sDto.amount,
      accountid: sDto.from_To.toString(),
      description:sDto.description
    }
    const reciever = this.createTransaction(rDto);
    return reciever;
  }
}