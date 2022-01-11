import { HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";

import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
<<<<<<< Updated upstream
import { UserService } from "../user/user.service";

import { TransactionDto } from "../transaction/dto/transaction.dto";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";
import { Transaction, TransactionDocument } from "@sp/schemas";
=======

import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { TransactionDto } from "../transaction/dto/transaction.dto";
import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";
import { Account, Transaction, TransactionDocument } from "@sp/schemas";
>>>>>>> Stashed changes
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class externalService {
  constructor(
<<<<<<< Updated upstream
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
=======

    // @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    //  @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    // private accountransactionService: AccountService,
    // private transactionService: TransactionService,
>>>>>>> Stashed changes

    private transactionService: TransactionService,
    private accountService: AccountService,
    private userService: UserService,

    private jwtService: JwtService
  ) {}

<<<<<<< Updated upstream
  async getTrans(accountid:string): Promise<Transaction[]> {
    return await this.transactionModel.find({accountid:accountid}).exec();
  }

  async getAll():Promise<any>{
    return await this.transactionModel.find().exec(); 
  }

  CreateToken(dto: exteranlDto): any {
    //shared token wtih receiver info
    const shared_token = this.jwtService.sign(
=======
  // async getTrancation(accountid:string): Promise<Transaction[]> {
  //   return await this.transactionModel.find({accountid:accountid}).exec();
  //  }


  // async getAll():Promise<any>{
  //   return await this.transactionModel.find().exec(); 
  //  }


  CreateToken(dto: exteranlDto): any {
    const token = this.jwtService.sign(
>>>>>>> Stashed changes
      {
        //receiver account id
        accountid: dto.accountid,
        amount: dto.amount,
        description: dto.description,
      },
      { secret: "My-Secret-Key", expiresIn: "60s" }
    );
<<<<<<< Updated upstream
    return shared_token;
  }

  async CreateExternal(postDto: bodyDto) {
    const balance = await this.accountService.calculateBalance(
      postDto.sender_id
    );
    // console.log(balance);
    // console.log((Number(balance));

    //check that the balance is greate than amount to be transfered
    if ((Number(balance) >= Number(postDto.amount )+ 5)) {
      let req: exteranlDto = {
        accountid: postDto.sender_id,
        amount: postDto.amount,
        description: postDto.description,
      };
      const send_token = await this.CreateToken(req);
      console.log(send_token);
      return await axios
        .post(`${postDto.url}/external/transfer`, req, {
          headers: {
            Authorization: `Bearer ${send_token}`,
=======
    console.log(token);
    return token;
  }

  async CreateExternal(post: bodyDto) {
    const balance = await this.accountService.calculateBalance(
      post.sender_id
    );
    //console.log(balance);  
    //console.log(Number(balance));  

    if ((Number(balance) >= Number(post.amount )+ 5)) {
      console.log(balance);
      let req: exteranlDto = {
        accountid: post.sender_id,
        amount: post.amount,
        description: post.description,
      };
      const shared_token = await this.CreateToken(req);
      console.log(shared_token);
      return await axios
        .post(`${post.url}/external/transfer`, req, {
          headers: {
            Authorization: `Bearer ${shared_token}`,
>>>>>>> Stashed changes
            "Bypass-Tunnel-Reminder": "any",
          },
        })
        .then(async (response) => {
          const date = new Date();
<<<<<<< Updated upstream
          const t0_dto: TransactionDto = {
            from_To: postDto.receiver_id,
            accountid: postDto.sender_id,
            amount: postDto.amount,
            credit: 0,
            debit: 1,
            Display_date: date.toDateString(),
            description: postDto.description,
          };
          //fees transaction
          const fees: TransactionDto = {
            from_To: postDto.receiver_id,
            accountid: postDto.sender_id,
=======
          const to_dto: TransactionDto = {
            from_To: post.receiver_id,
            accountid: post.sender_id,
            amount: post.amount,
            credit: 0,
            debit: 1,
            Display_date: date.toDateString(),
            description: post.description,
          };
          const external_Trans = await this.transactionService.createTransaction(to_dto);
          //fees transaction
          const f_dto: TransactionDto = {
            from_To: post.receiver_id,
            accountid: post.sender_id,
>>>>>>> Stashed changes
            amount: 5,
            credit: 0,
            debit: 1,
            Display_date: date.toDateString(),
<<<<<<< Updated upstream
            description: postDto.description,
          };
          return await this.transactionService.createTransaction(fees);
        })
        .catch((err) => console.log(err));
    }
      throw new HttpException(
      "transaction failled",
      HttpStatus.BAD_REQUEST
    );
  }

  async createTrans(dto: exteranlDto) {
    return this.accountService.findAccountbyAccountId(dto.accountid.toString())
      .then(async (account) => {
        if (account) {
          if (dto.amount <= 50) {
=======
            description: post.description,
          };
          return await this.transactionService.createTransaction(f_dto);
        })
        .catch((err) => console.log(err));
    }
      throw new HttpException("transaction failled", HttpStatus.BAD_REQUEST );
  }

  //chack if the account is valid
  //check ammount to be transfered 
  async createTransfer(dto: exteranlDto) {
    //var payload: Account = await this.accountService.findAccountbyAccountId(dto.accountid.toString());
    var account = this.accountService.findAccountbyAccountId(dto.accountid.toString());
    return account.then(async (account) => {
        if (account && dto.amount <= 50) {
>>>>>>> Stashed changes
            let today = new Date();
            const to_dto: TransactionDto = {
              from_To: "External Bank",
              accountid: dto.accountid.toString(),
              amount: dto.amount.valueOf(),
              credit: 1,
              debit: 0,
              Display_date: today.toDateString(),
              description: dto.description.toString(),
            };
<<<<<<< Updated upstream
            return await this.transactionService.createTransaction(to_dto);
          } else
              throw new HttpException(
                "can not transfer amount greater than 50",
                HttpStatus.BAD_REQUEST
              );
        }
        throw new HttpException(
          "account does not exist",
          HttpStatus.BAD_REQUEST
        );
=======
            return await this.transactionService.createTransaction(tdto);
        }
        throw new HttpException( "user does not exist or amount is greter then 50", HttpStatus.BAD_REQUEST );
>>>>>>> Stashed changes
      });
  }
}