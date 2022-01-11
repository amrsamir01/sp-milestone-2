import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";
import { exteranlDto } from "./dto/external.dto";
import { RequestDto } from "./dto/Request.dto";

@Injectable()
export class ExternalService {
  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  CreateEtoken(dto: exteranlDto): any {
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

  async CreateExternal(request: RequestDto) {
    const balance = await this.accountService.calculateBalance(
      request.accountid
    );
        console.log((Number(balance) >= Number(request.amount )+ 5));

    if ((Number(balance) >= Number(request.amount )+ 5)) {
      console.log(balance);

      let req: exteranlDto = {
        accountid: request.accountid,
        amount: request.amount,
        description: request.description,
      };
      const token = await this.CreateEtoken(req);
      console.log(token);

      return await axios
        .post(`${request.url}/external/outer`, req, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Bypass-Tunnel-Reminder": "any",
          },
        })
        .then(async (response) => {
          console.log("ok");
          const today = new Date();
          const tdto: TransactionDto = {
            from_To: request.receiverAccountNumber,
            accountid: request.accountid,
            amount: request.amount,
            credit: 0,
            debit: 1,
            Display_date: today.toDateString(),
            description: request.description,
          };
          const newTransaction =
            await this.transactionService.createTransaction(tdto);
          const tdto2: TransactionDto = {
            from_To: request.receiverAccountNumber,
            accountid: request.accountid,
            amount: 5,
            credit: 0,
            debit: 1,
            Display_date: today.toDateString(),
            description: request.description,
          };
          return await this.transactionService.createTransaction(tdto2);
        })
        .catch((err) => console.log(err));
    }
      throw new HttpException("not avilable", HttpStatus.BAD_REQUEST);
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
          } else
            throw new HttpException("amount is bigger 50",HttpStatus.BAD_REQUEST);
        }
        throw new HttpException("invalid account number",HttpStatus.BAD_REQUEST);
      });
  }
}