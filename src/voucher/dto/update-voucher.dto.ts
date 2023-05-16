import { PartialType } from '@nestjs/swagger';
import { CreateVoucherDto } from './create-voucher.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {
    @IsNotEmpty()
    @IsString()
    // @Expose()
    name: string;
  
    @IsNotEmpty()
    // @Expose()
    discout: number;
  
}
