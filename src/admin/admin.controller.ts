import { Body, Controller, Get, HttpStatus, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards';
import { MIMETYPE, OkResponseMessage } from 'src/common/constant';
import { StringToArray } from 'src/common/decorators';
import { UploadMultiFilesAws } from 'src/common/interceptors';
import { MulterFile } from 'src/common/types';
import { AdminService } from './admin.service';
import { Response } from 'express';
import { FindUserDto } from './dto';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ) { }

    @UseGuards(JwtGuard)
    @ApiTags('admin')
    @ApiResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Get("users")
    async getUsers(
        @Res() response: Response
    ): Promise<Response> {
        return this.adminService.getUsers(
            response
        );
    }

    @UseGuards(JwtGuard)
    @ApiTags('admin')
    @ApiBody({ type: FindUserDto })
    @ApiResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Post("find-user")
    async findUser(
        @Body() findUserDto: FindUserDto,
        @Res() response: Response
    ): Promise<Response> {
        return this.adminService.findUser(
            findUserDto,
            response
        );
    }
}
