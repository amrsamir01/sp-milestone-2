import { IsNotEmpty } from 'class-validator';

export class bodyDto{

  @IsNotEmpty()
  sender_id: string;

  @IsNotEmpty()
  receiver_id:string;

  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;
}