import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { UnAuthorizeResponseMessage } from '@app/common';
import { JwtGuard, PublicGuard } from 'src/auth/guards';
import { ApiBody, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateCartDto, DecrementFood, IncrementFood, RemoveCartDto } from './dto';
import { GetCurrentUser } from '@app/common';
import { Response } from 'express';
import { RedeemDiscountCodeDto } from 'src/payment/dto';

@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ) { }


    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "decrement food quantity" })
    @ApiBody({ type: RedeemDiscountCodeDto, required: false })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Post()
    async getCarts(
        @Body() redeemDiscountCodeDto: RedeemDiscountCodeDto,
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string
    ): Promise<Response> {
        return this.cartService.getCarts(
            phone,
            redeemDiscountCodeDto.discountCode,
            response
        )
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "delete  carts" })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Delete()
    async deleteCarts(
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string
    ): Promise<Response> {
        return this.cartService.deleteCarts(
            phone,
            response
        )
    }

    @UseGuards(PublicGuard)
    @ApiOperation({ summary: "add food to carts" })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Post("add")
    async addToCart(
        @Body() createCartDto: CreateCartDto,
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string = null
    ): Promise<Response> {
        return this.cartService.addToCart(
            createCartDto,
            phone,
            response
        )
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "remove food from carts" })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Delete("remove")
    async removeFromCart(
        @Body() removeCartDto: RemoveCartDto,
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string
    ): Promise<Response> {
        return this.cartService.removeFromCart(
            removeCartDto,
            phone,
            response
        )
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "increment food quantity" })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Put("inc-food")
    async incrementFood(
        @Body() incrementFood: IncrementFood,
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string
    ): Promise<Response> {
        return this.cartService.incrementFood(
            incrementFood,
            phone,
            response
        )
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "decrement food quantity" })
    @ApiTags('cart')
    @ApiUnauthorizedResponse({
        type: UnAuthorizeResponseMessage,
        status: HttpStatus.UNAUTHORIZED
    })
    @Put("dec-food")
    async decrementFood(
        @Body() decrementFood: DecrementFood,
        @Res() response: Response,
        @GetCurrentUser("phone") phone: string
    ): Promise<Response> {
        return this.cartService.decrementFood(
            decrementFood,
            phone,
            response
        )
    }
}
