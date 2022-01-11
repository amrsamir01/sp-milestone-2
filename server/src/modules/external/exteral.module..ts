import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@sp/schemas';
// import { AccountController } from '../account/account.controller';
import { AccountsModule } from '../account/account.module';
// import { AccountService } from '../account/account.service';
import {TransactionModule} from '../transaction/transaction.module';
import { externalController } from './external.controller';
import { externalService } from './external.services';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
      TransactionModule,
      PassportModule,
      JwtModule.register({
        secret:"My-Secret-Key",
        signOptions: { expiresIn: '60s' },
      }),AccountsModule],
 
  controllers: [externalController],
  providers: [externalService , JwtStrategy],
})
export class ExternalModule {}