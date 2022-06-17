import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateParkingDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsNumber()
    @IsNotEmpty()
    availableSlots: number

    @IsNumber()
    @IsNotEmpty()
    totalSlots: number

    @IsNumber()
    @IsNotEmpty()
    freeLengthInMin: number

    @IsNumber()
    @IsNotEmpty()
    pricePerHour: number
  
}