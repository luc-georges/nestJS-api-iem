import { ForbiddenException, Get, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParkingDto, EditParkingDto } from './dto';

@Injectable()
export class ParkingService {
    constructor(private prisma: PrismaService){}
    @Get()
    getParkings(){

        return this.prisma.parking.findMany()
    }
   
    
    async createParking(dto: CreateParkingDto){
        const parking = await this.prisma.parking.create({
            data: {
                ...dto
            }
        })
        return parking
    }
    
    getParkingById( parkingId: number){

        return  this.prisma.parking.findFirst({
            where:{
                id:parkingId
            }
        })

    }

    async editParkingById(parkingId: number,dto: EditParkingDto){
        const parking = await this.prisma.parking.findUnique({
            where:{
                id:parkingId
            }
        })
        if(!parking) {
            throw new ForbiddenException('parking not found')
        }
        return this.prisma.parking.update({
            where:{
                id:parkingId
            },
            data:{
                ...dto
            }
        })
    }

   
   
    async deleteParkingById(parkingId: number){
        const parking = await this.prisma.parking.findUnique({
            where:{
                id:parkingId
            }
        })
        if(!parking) {
            throw new ForbiddenException('parking not found')
        }

        await this.prisma.parking.delete({
            where:{
                id:parkingId
            }
        })

    }

}
