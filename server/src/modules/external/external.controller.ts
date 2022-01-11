import { HttpStatus, Controller, Get, Req, Post, Body, Res, UseGuards, HttpException} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { exteranlDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { ConstraintMetadata } from "class-validator/types/metadata/ConstraintMetadata";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { response } from "express";

import { bodyDto } from "./dto/body.dto";
import { externalService } from "./external.services";

@Controller("external")
export class externalController {
  constructor(
      private externalService: externalService,
      private accountService: AccountService

    ) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Post("/transfer")
    CreateTransfer(@Body()dto:exteranlDto):any {
     try{
            return this.externalService.createTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @Post("/createTransfer")
      CreateExternal(@Body()request:bodyDto):any {
        try{
            return this.externalService.CreateExternal(request);
        } catch{
            (err) => console.log(err.message);
        }
    }
}