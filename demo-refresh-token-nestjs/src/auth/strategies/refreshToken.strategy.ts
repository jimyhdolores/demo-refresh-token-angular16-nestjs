import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../common/constants/constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.refreshSecret,
			passReqToCallback: true
		});
	}

	validate(req: Request, payload: any) {
		const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
		return { ...payload, refreshToken };
	}
}
