import { IsBoolean, IsDate,  isNotEmpty, IsNotEmpty, IsNumber, isString } from "class-validator"

export class CreateTicket {

    @IsNumber()
    @IsNotEmpty()
    parkingID: number

}

