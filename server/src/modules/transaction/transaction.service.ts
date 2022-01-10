import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction,TransactionDocument } from '@sp/schemas';
import { Model, ObjectId } from 'mongoose';
import internal from 'stream';
import { TransactionDto } from './dto/transaction.dto';


@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic

  //getTrancation(takes the accountId)
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  /**
   * Returns all users from mongo database
   */

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
  
  createRecieverTransaction(senderDto: TransactionDto):Promise<Transaction>{
    const recieverDto:TransactionDto = {
      from_To:(senderDto).from_To,
      accountid:(senderDto).accountid,
      amount:(senderDto).amount,
      credit:1,
      debit:0,
      Display_date:senderDto.Display_date
    }
    const reciever_transaction = this.createTransaction(recieverDto);
    return reciever_transaction;
  }
}