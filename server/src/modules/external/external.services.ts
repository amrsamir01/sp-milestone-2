import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";

@Injectable()
export class externalService {
  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  CreateToken(dto: exteranlDto): any {
    const access_token = this.jwtService.sign(
      {
        accountid: dto.accountid,
        amount: dto.amount,
        description: dto.description,
      },
      { secret: "My-Secret-Key", expiresIn: "60s" }
    );
    console.log(access_token);
    return access_token;
  }

  async CreateExternalTrans(post: bodyDto) {
    const balance = await this.accountService.calculateBalance(
      post.sender_id
    );
    //  console.log(balance);
    //  console.log((Number(balance));
    //  console.log((Number(balance) >= Number(request.amount )+ 5));

    if ((Number(balance) >= Number(post.amount )+ 5)) {
      let req: exteranlDto = {
        accountid: post.sender_id,
        amount: post.amount,
        description: post.description,
      };
      const token = await this.CreateToken(req);
      console.log(token);
      return await axios
        .post(`${post.url}/external/outer`, req, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Bypass-Tunnel-Reminder": "any",
          },
        })
        .then(async (response) => {
          console.log("ok");
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
          const externalTransaction =await this.transactionService.createTransaction(tdto);
          // console.log(externalTransaction);
            const fees: TransactionDto = {
            from_To: post.receiver_id,
            accountid: post.sender_id,
            amount: 5,
            credit: 0,
            debit: 1,
            Display_date: today.toDateString(),
            description: post.description,
          };
          return await this.transactionService.createTransaction(fees);
        })
        .catch((err) => console.log(err));
    }
    throw new HttpException("Transaction failed", HttpStatus.BAD_REQUEST);
  }

  async transfer(dto: exteranlDto) {
    var user_account = this.accountService.findAccount(dto.accountid.toString());
    return user_account.then(async (account) => {
        if (account && dto.amount <= 50 ) {
          let date = new Date();
          const tdto: TransactionDto = {
              from_To: "Bank ...",
              accountid: dto.accountid.toString(),
              amount: dto.amount.valueOf(),
              credit: 1,
              debit: 0,
              Display_date: date.toDateString(),
              description: dto.description.toString(),
            };
          return await this.transactionService.createTransaction(tdto);
        }
        throw new HttpException("invalid transaction",HttpStatus.BAD_REQUEST);
      });
  }
}