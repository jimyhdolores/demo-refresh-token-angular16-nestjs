import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../common/constants/constants';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async signIn(data: AuthDto) {
		// Check if user exists
		const user = this.usersService.findOne(data.username);
		if (!user) throw new BadRequestException('User does not exist');
		const passwordMatches = user.password === data.password;
		if (!passwordMatches) throw new BadRequestException('Password is incorrect');
		const tokens = await this.getTokens(user.userId, user.username);
		return { ...tokens, userId: user.userId };
	}

	async refreshTokens(userId: number) {
		const user = this.usersService.findById(userId);
		if (!user) throw new ForbiddenException('Access Denied');

		const tokens = await this.getTokens(user.userId, user.username);
		return tokens;
	}

	hashData(data: string) {
		return argon2.hash(data);
	}

	async getTokens(userId: number, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					username
				},
				{
					secret: jwtConstants.secret,
					expiresIn: '5s'
				}
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					username
				},
				{
					secret: jwtConstants.refreshSecret,
					expiresIn: '2m'
				}
			)
		]);

		return {
			accessToken,
			refreshToken
		};
	}
}
