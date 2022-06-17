import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class EditParkingDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsNumber()
    @IsOptional()
    availableSlots?: number

    @IsNumber()
    @IsOptional()
    totalSlots?: number

    @IsNumber()
    @IsOptional()
    freeLengthInMin?: number

    @IsNumber()
    @IsOptional()
    pricePerHour?: number
  
}