import { Controller, Post, Get, Param, Body, UseGuards} from "@nestjs/common";
import { externalService } from "./external.services";
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from "../account/account.service";
import { TransactionService } from "../transaction/transaction.service";

import { bodyDto } from "./dto/body.dto";
import { exteranlDto } from "./dto/external.dto";

@Controller("external")
export class externalController {
  constructor(
      private externalService: externalService,
      private transactionService: TransactionService,
      private accountService: AccountService

    ) {}
 
  @UseGuards(AuthGuard('jwt'))

  @Get()
  getAll():any{
    return this.externalService.getAll();
  }

  @Get(':accountId')
  transaction(@Param('accountId') accountId: string): any {
    return this.externalService.getTrans(accountId);
  }

  @Post('')
  CreateTransaction(@Body() dto:exteranlDto):any{
      const transaction = this.externalService.createTrans(dto);
      return transaction;
  }

  @Post("/transfer")
    CreateTransfer(@Body()edto:exteranlDto):any {
     try{
         return this.externalService.createTrans(edto);
        } catch{
          (err) => console.log(err.message);
        }
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post("/createTransfer")
      CreateExternal(@Body()bdto:bodyDto):any {
        try{
        return this.externalService.CreateExternal(bdto);
        } catch{
        (err) => console.log(err.message);
        }
    }
}