import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ExternalService } from "./external.services";
import { AuthGuard } from '@nestjs/passport';
import { exteranlDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { RequestDto } from "./dto/Request.dto";

@Controller("external")
export class ExternalController {
  constructor(private externalService: ExternalService,private accountService: AccountService) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Post("/transfer")
    CreateTransfer(@Body()dto:exteranlDto):any {
     try{
            return this.externalService.createTransfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @Post("outerT")
      CreateExternal(@Body()request:RequestDto):any {
        try{
            return this.externalService.CreateExternal(request);
        } catch{
            (err) => console.log(err.message);
        }
    }
}