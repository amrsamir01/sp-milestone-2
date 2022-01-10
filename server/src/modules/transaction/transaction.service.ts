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
  
  createRecieverTransaction(sender_dto: TransactionDto):Promise<Transaction>{
    const reciever_dto:TransactionDto = {
      from_To:(sender_dto).accountid,
      accountid:(sender_dto).from_To,
      amount:sender_dto.amount,
      credit:1,
      debit:0,
      Display_date:sender_dto.Display_date
    }
    const reciever_transaction = this.createTransaction(reciever_dto);
    return reciever_transaction;
  }
}