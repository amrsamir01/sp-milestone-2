<<<<<<< Updated upstream
import { Controller, Post, Get, Param, Body, UseGuards} from "@nestjs/common";
=======
import { HttpStatus, Controller, Get, Req, Post, Body, Res, UseGuards, HttpException} from "@nestjs/common";
>>>>>>> Stashed changes
import { externalService } from "./external.services";
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from "../account/account.service";
<<<<<<< Updated upstream
import { TransactionService } from "../transaction/transaction.service";

import { bodyDto } from "./dto/body.dto";
import { exteranlDto } from "./dto/external.dto";
=======
import { ConstraintMetadata } from "class-validator/types/metadata/ConstraintMetadata";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { response } from "express";
import { bodyDto } from "./dto/body.dto";
>>>>>>> Stashed changes

@Controller("external")
export class externalController {
  constructor(
      private externalService: externalService,
<<<<<<< Updated upstream
      private transactionService: TransactionService,
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      CreateExternal(@Body()bdto:bodyDto):any {
        try{
        return this.externalService.CreateExternal(bdto);
=======
      CreateExternal(@Body()dto:bodyDto):any {
        try{
            return this.externalService.CreateExternal(dto);
>>>>>>> Stashed changes
        } catch{
        (err) => console.log(err.message);
        }
    }
}