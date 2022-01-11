import { HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";

import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { UserService } from "../user/user.service";

import { TransactionDto } from "../transaction/dto/transaction.dto";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";
import { Transaction, TransactionDocument } from "@sp/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class externalService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,

    private transactionService: TransactionService,
    private accountService: AccountService,
    private userService: UserService,

    private jwtService: JwtService
  ) {}

  async getTrans(accountid:string): Promise<Transaction[]> {
    return await this.transactionModel.find({accountid:accountid}).exec();
  }

  async getAll():Promise<any>{
    return await this.transactionModel.find().exec(); 
  }

  CreateToken(dto: exteranlDto): any {
    //shared token wtih receiver info
    const shared_token = this.jwtService.sign(
      {
        //receiver account id
        accountid: dto.accountid,
        amount: dto.amount,
        description: dto.description,
      },
      { secret: "My-Secret-Key", expiresIn: "60s" }
    );
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
            "Bypass-Tunnel-Reminder": "any",
          },
        })
        .then(async (response) => {
          const date = new Date();
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
            amount: 5,
            credit: 0,
            debit: 1,
            Display_date: date.toDateString(),
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
      });
  }
}