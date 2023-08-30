export interface IResponseSingIn {
	userId: string;
	accessToken: string;
	refreshToken: string;
}

export interface IResponseRefreshToken {
	accessToken: string;
	refreshToken: string;
}

export interface IResponseUser {
	userId: number;
	username: string;
	password: string;
}
