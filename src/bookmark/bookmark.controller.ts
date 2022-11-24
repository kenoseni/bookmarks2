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
} from '@nestjs/common';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { HandleDatabaseError } from 'src/interceptors/prisma.interceptor';
import { GetUser } from 'src/users/decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, ModifyBookmarkDto } from './dto';

@Controller('bookmarks')
@HandleDatabaseError()
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Post()
  createBookMark(
    @GetUser() user: AuthResponseDto,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookMark(user.id, createBookmarkDto);
  }

  @Get()
  getBookmarks(@GetUser() user: AuthResponseDto) {
    return this.bookmarkService.getBookmarks(user.id);
  }

  @Get(':id')
  getBookmarksId(
    @GetUser() user: AuthResponseDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksId(user.id, bookmarkId);
  }

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
  @Delete(':id')
  deleteBookmarksById(
    @GetUser() user: AuthResponseDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarksById(user.id, bookmarkId);
  }
}
