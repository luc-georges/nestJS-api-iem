import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('parkings')
export class ParkingController {
    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    getAll(){
        
        return 'test'
    }
}
