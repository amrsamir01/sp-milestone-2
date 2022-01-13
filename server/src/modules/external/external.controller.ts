import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { externalService } from "./external.services";
import { AuthGuard } from '@nestjs/passport';
import { exteranlDto } from "./dto/external.dto";
import { bodyDto } from "./dto/body.dto";

@Controller("external")
export class externalController {
  constructor(private externalService: externalService,) {}
 
  
//   @Post('')
//   CreateTransaction(@Body() edto:exteranlDto){
//       const transaction = this.externalService.CreateExternalTrans(edto);
//       return transaction;
//   }

  @UseGuards(AuthGuard('jwt'))
  @Post("/outer")
    CreateTransfer(@Body()dto:exteranlDto):any {
     try{
            return this.externalService.transfer(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }

    @Post("outerT")
      CreateExternal(@Body()dto:bodyDto):any {
        try{
            return this.externalService.CreateExternalTrans(dto);
        } catch{
            (err) => console.log(err.message);
        }
    }
}