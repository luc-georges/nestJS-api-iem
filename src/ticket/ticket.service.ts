import { ForbiddenException, Get, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicket } from './dto';

@Injectable()
export class TicketService {
    constructor(private prisma: PrismaService){}
    @Get()
    getTickets(){

        return this.prisma.ticket.findMany()
    }
   
    
    async createTicket(userID: number, dto: CreateTicket){
        const ticket = await this.prisma.ticket.create({
            data: {
                userID:userID,
                parkingID:dto.parkingID
            
            }
        })
        return ticket
    }
    
    getTicketById( ticketId: number){

        return  this.prisma.ticket.findFirst({
            where:{
                id:ticketId
            }
        })

    }
    async checkTicketPriceById( ticketId: number){

        const ticket = await this.prisma.ticket.findFirst({
            where:{
                id:ticketId
            }
        })
        if(!ticket) {
            throw new ForbiddenException('ticket not found')
        }

        const parking = await this.prisma.parking.findUnique({
            where: {
                id: ticket.parkingID
            }
        })
        if(!parking) {
            throw new ForbiddenException('parking not found')
        }

        // calculate price due to pay //
        let ticketStart = ticket.arival
        // get time between the ticket delivery and now
        let diff = new Date().getTime() - new Date(ticketStart).getTime();
        // transform it in minute
        let minutes = Math.floor((diff/1000)/60);
        // remove the free length from the stay
        let payingHours = minutes - parking.freeLengthInMin +1 ;
        // transform it in hours
        payingHours = Math.ceil(payingHours / 60) 
        payingHours *= parking.pricePerHour


        return  {totalDue:payingHours}

    }

    async payTicket(userID: number, ticketId: number){
        const ticket = await this.prisma.ticket.update({
            where: {
                id:ticketId
            },
            data: {
                paid:true
            }
        })
        return ticket
    }
   
   
    async deleteTicketById(ticketId: number){
        const ticket = await this.prisma.ticket.findUnique({
            where:{
                id:ticketId
            }
        })
        if(!ticket) {
            throw new ForbiddenException('ticket not found')
        }

        await this.prisma.ticket.delete({
            where:{
                id:ticketId
            }
        })

    }

}
