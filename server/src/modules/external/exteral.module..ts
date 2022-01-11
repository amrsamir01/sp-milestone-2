import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountsModule } from '../account/account.module';
<<<<<<< Updated upstream
// import { AccountService } from '../account/account.service';
import {TransactionModule} from '../transaction/transaction.module';
=======
import { TransactionModule } from '../transaction/transaction.module';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      }),AccountsModule],
 
  controllers: [externalController],
=======
      }),
    AccountsModule],
  controllers: [ externalController ],
>>>>>>> Stashed changes
  providers: [externalService , JwtStrategy],
})
export class ExternalModule {}