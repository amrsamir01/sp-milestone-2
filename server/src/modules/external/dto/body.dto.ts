import { IsNotEmpty } from 'class-validator';

export class bodyDto{

  @IsNotEmpty()
  sender_id: string;

  @IsNotEmpty()
  receiver_id:string;

  @IsNotEmpty()
  amount: number;
  
  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  description: string;
}