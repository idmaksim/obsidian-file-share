import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
