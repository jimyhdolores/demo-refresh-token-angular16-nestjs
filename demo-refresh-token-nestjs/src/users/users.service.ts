import { Injectable } from '@nestjs/common';
export interface IUser {
	userId: number;
	username: string;
	password: string;
}
@Injectable()
export class UsersService {
	private readonly users: IUser[] = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme'
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess'
		}
	];

	findOne(username: string): IUser {
		return this.users.find((user) => user.username === username);
	}
	findById(userId: number): IUser {
		return this.users.find((user) => user.userId === userId);
	}
}
