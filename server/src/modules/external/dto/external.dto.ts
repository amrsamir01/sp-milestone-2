import { IsNotEmpty } from 'class-validator';

export class exteranlDto{

  @IsNotEmpty()
  accountid: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description:string;

}