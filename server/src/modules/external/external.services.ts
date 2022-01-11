import { HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";

import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";

@Injectable()
export class externalService {
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  CreateEtoken(dto: exteranlDto): any {
    const shared_token = this.jwtService.sign(
      {
        accountid: dto.accountid,
        amount: dto.amount,
        description: dto.description,
      },
      { secret: "My-Secret-Key", expiresIn: "60s" }
    );
    console.log(shared_token);
    return shared_token;
  }

  async CreateExternal(post: bodyDto) {
    const balance = await this.accountService.calculateBalance(
      post.sender_id
    );

    if ((Number(balance) >= Number(post.amount )+ 5)) {
      console.log(balance);
      //send request
      let body: exteranlDto = {
        accountid: post.sender_id,
        amount: post.amount,
        description: post.description,
      };
      const token = await this.CreateEtoken(body);
      console.log(token);

      return await axios
        .post(`${post.url}/external/transfer`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Bypass-Tunnel-Reminder": "any",
          },
        })
        .then(async (response) => {
          const today = new Date();
          const tdto: TransactionDto = {
            from_To: post.receiver_id,
            accountid: post.sender_id,
            amount: post.amount,
            credit: 0,
            debit: 1,
            Display_date: today.toDateString(),
            description: post.description,
          };
          const newTransa = await this.transactionService.createTransaction(tdto);
          const tdto2: TransactionDto = {
            from_To: post.sender_id,
            accountid: post.receiver_id,
            amount: 5,
            credit: 0,
            debit: 1,
            Display_date: today.toDateString(),
            description: post.description,
          };
          return await this.transactionService.createTransaction(tdto2);
        })
        .catch((err) => console.log(err));
    }
  }

  async createTransfer(dto: exteranlDto) {
    return this.accountService
      .findAccountbyAccountId(dto.accountid.toString())
      .then(async (account) => {
        if (account) {
          if (dto.amount <= 50) {
            let today = new Date();
            const tdto: TransactionDto = {
              from_To: "External Bank",
              accountid: dto.accountid.toString(),
              amount: dto.amount.valueOf(),
              credit: 1,
              debit: 0,
              Display_date: today.toDateString(),
              description: dto.description.toString(),
            };
            return await this.transactionService.createTransaction(tdto);
          } 
        }
      }
    );
  }
}