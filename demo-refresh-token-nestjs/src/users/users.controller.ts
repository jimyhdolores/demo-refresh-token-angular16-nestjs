import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { IUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@UseGuards(AccessTokenGuard)
	@Get(':userId')
	findById(@Param('userId', ParseIntPipe) userId: number): IUser {
		return this.usersService.findById(userId);
	}
}
