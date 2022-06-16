import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ParkingModule } from './parking/parking.module';
import { TicketModule } from './ticket/ticket.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, ParkingModule, TicketModule, PrismaModule],
})
export class AppModule {}
