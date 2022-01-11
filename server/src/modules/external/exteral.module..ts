import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from '../account/account.module';
import {TransactionModule} from '../transaction/transaction.module';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.services';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [TransactionModule, PassportModule,JwtModule.register({secret:"My-Secret-Key",signOptions: { expiresIn: '60s' },}),AccountsModule],
  controllers: [ExternalController],
  providers: [ExternalService , JwtStrategy],
})
export class ExternalModule {}