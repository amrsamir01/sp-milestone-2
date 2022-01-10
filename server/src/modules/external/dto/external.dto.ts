import { IsNotEmpty } from 'class-validator';

export class exteranlDto{

  @IsNotEmpty()
  accountid: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description:string;

}