import { HttpStatus, Controller, Get, Req, Post, Body, Res, UseGuards, HttpException} from "@nestjs/common";
import { ExternalService } from "./external.services";
import { AuthGuard } from '@nestjs/passport';
// import { Request , Response } from 'express';
import { exteranlDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { ConstraintMetadata } from "class-validator/types/metadata/ConstraintMetadata";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { response } from "express";
import { RequestDto } from "./dto/Request.dto";

@Controller("external")
export class ExternalController {
  constructor(
      private externalService: ExternalService,
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

    // @UseGuards(AuthGuard('jwt'))
    @Post("/createTransfer")
      CreateExternal(@Body()request:RequestDto):any {
        try{
            return this.externalService.CreateExternal(request);
        } catch{
            (err) => console.log(err.message);
        }
    }
}