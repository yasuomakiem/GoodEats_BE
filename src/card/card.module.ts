import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entity/card.entity";
import { ProductModule } from "src/product/product.module";
import { UserModule } from "src/user/user.module";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { RestaurantModule } from "src/restaurant/restaurant.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Card]),
        forwardRef(()=>ProductModule),
        forwardRef(()=>UserModule),
        forwardRef(()=>RestaurantModule)
    ],
    controllers:[CardController],
    providers: [CardService],
    exports:[TypeOrmModule],
})

export class CardModule{}