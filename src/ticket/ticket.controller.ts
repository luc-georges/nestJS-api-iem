import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';

import { CreateTicket } from './dto';
import { TicketService } from './ticket.service';


@UseGuards(AuthGuard('jwt'))
@Controller('tickets')
export class TicketController {
    
    constructor(private ticketService: TicketService ){}

    @Get('all')
    getTickets(){

        return this.ticketService.getTickets()
    }

    @Get(':id')
    getTicketById(
        @Param('id', ParseIntPipe) ticketId: number
    ){

        return this.ticketService.getTicketById(ticketId)

    }

    @Get('price/:id')
    checkTicketPriceById(
        @Param('id', ParseIntPipe) ticketId: number
    ){

        return this.ticketService.checkTicketPriceById(ticketId)

    }


    @Post()
    createTicket(
        @GetUser('id') userID: number,
        @Body() dto: CreateTicket
    ){

        return this.ticketService.createTicket(userID,dto)

    }
    @Patch(':id')
    payTicket(
        @GetUser('id') userID: number,
        @Param('id', ParseIntPipe) ticketId: number
    ){

        return this.ticketService.payTicket(userID,ticketId)

    }


    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTicketById(
        @Param('id', ParseIntPipe) ticketId: number
    ){

        return this.ticketService.deleteTicketById(ticketId)

    }
}
