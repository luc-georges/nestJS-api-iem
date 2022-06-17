import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateParkingDto, EditParkingDto } from './dto';
import { ParkingService } from './parking.service';


@UseGuards(AuthGuard('jwt'))
@Controller('parkings')
export class ParkingController {
    
    constructor(private parkingService: ParkingService ){}

    @Get('all')
    getParkings(){

        return this.parkingService.getParkings()
    }

    @Get(':id')
    getParkingById(
        @Param('id', ParseIntPipe) parkingId: number
    ){

        return this.parkingService.getParkingById(parkingId)

    }


    @Post()
    createParking(
        @Body() dto: CreateParkingDto
    ){

        return this.parkingService.createParking(dto)

    }

    @Patch(':id')
    editParkingById(
        @Body() dto: EditParkingDto,
        @Param('id', ParseIntPipe) parkingId: number
    ){

        return this.parkingService.editParkingById(parkingId,dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteParkingById(
        @Param('id', ParseIntPipe) parkingId: number
    ){

        return this.parkingService.deleteParkingById(parkingId)

    }
}
