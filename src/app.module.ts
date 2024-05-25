import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { CashsModule } from './cashes/cashs.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReceivesModule } from './receives/receives.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    UsersModule,
    IncomesModule,
    ExpensesModule,
    CashsModule,
    AuthModule,
    ReceivesModule,
    DebtsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
