import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction,TransactionDocument } from '@sp/schemas';
import { Model, ObjectId } from 'mongoose';
import internal from 'stream';
import { exteranlDto } from './dto/external.dto';


@Injectable()
export class externalService {
  // TODO: Define your Transaction Service Logic

  //getTrancation(takes the accountId)
  constructor(@InjectModel(Transaction.name) private transactionModel:Model<TransactionDocument>) {}

   /*async getTrancation(accountid:number): Promise<Transaction[]> {
    return await this.transactionModel.find({accountid:accountid}).exec();
   }*/

  async getAll():Promise<any>{
    return await this.transactionModel.find().exec(); 
   }

  
  createTransaction(dto: exteranlDto):any{     
    const newTransaction = new this.transactionModel(dto);
    return newTransaction.save();  
  }
  
  externalRecieverTransaction(sender_dto: exteranlDto):any{
    const reciever_dto:exteranlDto = {
      //reciver id
      accountid:(sender_dto).accountid,
      amount:sender_dto.amount,
      description: sender_dto.description,
    }
    
    const reciever_transaction = this.createTransaction(reciever_dto);
    return reciever_transaction;
  }
}