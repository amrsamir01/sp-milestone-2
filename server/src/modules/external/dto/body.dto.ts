import { IsNotEmpty } from 'class-validator';

export class bodyDto{

  @IsNotEmpty()
  sender_id: string;

  @IsNotEmpty()
<<<<<<< Updated upstream:server/src/modules/external/dto/body.dto.ts
  receiver_id:string;
=======
  receiver_id: string;
>>>>>>> Stashed changes:server/src/modules/external/dto/Request.dto.ts

  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;
}