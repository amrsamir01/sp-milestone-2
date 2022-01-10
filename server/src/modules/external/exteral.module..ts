import { forwardRef, Module } from '@nestjs/common';
import { externalController } from './external.controller';
import { externalService } from './external.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@sp/schemas';
import { AccountsModule } from '../account/account.module';


@Module({
  imports:[MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),forwardRef(() => AccountsModule)],
  exports: [externalService],
  controllers: [externalController],
  providers: [externalService],
})
export class TransactionModule {}