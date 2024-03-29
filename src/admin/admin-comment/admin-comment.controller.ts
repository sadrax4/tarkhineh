import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminGuard } from 'src/auth/guards';
import { CommentService } from 'src/comment/comment.service';
import { IsShowCommentDto, ReplyCommentDto } from 'src/comment/dto';
import { MIMETYPE, OkResponseMessage } from '@app/common';
import { GetCurrentUser } from '@app/common';

@Controller('admin')
export class AdminCommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @UseGuards(AdminGuard)
    @ApiTags('admin-comment')
    @ApiOperation({ summary: "get all comments" })
    @ApiResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Get("comments")
    async getComments(
        @Res() response: Response
    ): Promise<Response> {
        return this.commentService.getComments(
            response
        );
    }

    @UseGuards(AdminGuard)
    @ApiTags('admin-comment')
    @ApiOperation({ summary: "delete comment by comment-id" })
    @ApiResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Delete("comments/:id")
    async deleteComment(
        @Res() response: Response,
        @Param("id") commentId: string
    ): Promise<Response> {
        return this.commentService.deleteComment(
            commentId,
            response
        )
    }

    @UseGuards(AdminGuard)
    @ApiTags('admin-comment')
    @ApiOperation({ summary: "show comment by comment-id" })
    @ApiBody({
        type: IsShowCommentDto
    })
    @ApiConsumes(MIMETYPE.JSON)
    @ApiFoundResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Patch('show/:id')
    async isShowComment(
        @Body() isShowCommentDto: IsShowCommentDto,
        @Param("id") commentId: string,
        @Res() response: Response
    ): Promise<Response> {
        return this.commentService.IsShowComment(
            commentId,
            isShowCommentDto.show,
            response
        )
    };

    @UseGuards(AdminGuard)
    @ApiTags('admin-comment')
    @ApiOperation({ summary: "reply to comment by comment-id" })
    @ApiBody({
        type: ReplyCommentDto
    })
    @ApiConsumes(MIMETYPE.JSON)
    @ApiFoundResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Post('comment/reply/:id')
    async replyComment(
        @GetCurrentUser("phone") phone: string,
        @Body() replyCommentDto: ReplyCommentDto,
        @Query("id") id: string,
        @Res() response: Response
    ): Promise<Response> {
        return this.commentService.replyComment(
            phone,
            id,
            replyCommentDto,
            response
        )
    }

    @UseGuards(AdminGuard)
    @ApiTags('admin-comment')
    @ApiOperation({ summary: "find comment by comment-id" })
    @ApiResponse({
        type: OkResponseMessage,
        status: HttpStatus.OK
    })
    @Get("comments/:id")
    async findCommentById(
        @Res() response: Response,
        @Param("id") commentId: string
    ): Promise<Response> {
        return this.commentService.getCommentById(
            commentId,
            response
        )
    }
}
