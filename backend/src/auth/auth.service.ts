import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const credentials = this.configService.get('credentials');
    if (
      loginDto.username !== credentials.username ||
      loginDto.password !== credentials.password
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: await this.accessToken(loginDto.username, loginDto.password),
      refreshToken: await this.refreshToken(
        loginDto.username,
        loginDto.password,
      ),
    };
  }

  async refreshToken(username: string, password: string) {
    return this.jwtService.sign(
      {
        username,
        password,
      },
      {
        secret: this.configService.get('refreshSecret'),
      },
    );
  }

  async accessToken(username: string, password: string) {
    return this.jwtService.sign(
      {
        username,
        password,
      },
      {
        secret: this.configService.get('accessSecret'),
      },
    );
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
