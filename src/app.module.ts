import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ParkingModule } from './parking/parking.module';
import { TicketModule } from './ticket/ticket.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}), 
    AuthModule, 
    UserModule, 
    ParkingModule, 
    TicketModule, 
    PrismaModule],
})
export class AppModule {}
