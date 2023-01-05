import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { JwtGuard } from 'src/auth/guard';
import { HandleDatabaseError } from 'src/interceptors/prisma.interceptor';
import { GetUser } from 'src/users/decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, ModifyBookmarkDto } from './dto';

@Controller('bookmarks')
@HandleDatabaseError()
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @UseGuards(JwtGuard)
  @Post()
  createBookMark(
    @GetUser() user: AuthResponseDto,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookMark(user.id, createBookmarkDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getBookmarks(@GetUser() user: AuthResponseDto) {
    return this.bookmarkService.getBookmarks(user.id, user.isLive);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getBookmarksId(
    @GetUser() user: AuthResponseDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksId(
      user.id,
      user.isLive,
      bookmarkId,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  modifyBookmarksById(
    @GetUser() user: AuthResponseDto,
    @Body() editBookmarkDto: ModifyBookmarkDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.modifyBookmarksById(
      user.id,
      bookmarkId,
      editBookmarkDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteBookmarksById(
    @GetUser() user: AuthResponseDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarksById(user.id, bookmarkId);
  }
}
