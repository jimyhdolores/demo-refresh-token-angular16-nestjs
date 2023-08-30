import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signin')
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data);
	}

	@UseGuards(RefreshTokenGuard)
	@Get('refresh')
	refreshTokens(@Req() req: Request) {
		const userId = req.user['sub'];
		return this.authService.refreshTokens(userId);
	}
}
