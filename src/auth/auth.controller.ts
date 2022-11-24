import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthResponseDto } from '../auth/dto/auth.response.dto';
import { HandleDatabaseError } from 'src/interceptors/prisma.interceptor';

@Controller('auth')
@Serialize(AuthResponseDto)
@HandleDatabaseError()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}
