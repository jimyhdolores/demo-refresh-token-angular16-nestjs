import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponseRefreshToken, IResponseSingIn, IResponseUser } from '../app.model.interface';
import { URL_AUTH_REFRESH, URL_AUTH_SIGNIN, URL_USERS } from './urls-api';
@Injectable({ providedIn: 'root' })
export class AppService {
	private _httpClient = inject(HttpClient);

	login(username: string, password: string) {
		return this._httpClient.post<IResponseSingIn>(URL_AUTH_SIGNIN, { username, password });
	}

	refreshToken() {
		// return this._httpClient.get<IResponseRefreshToken>(URL_AUTH_REFRESH).pipe(delay(5000));
		return this._httpClient.get<IResponseRefreshToken>(URL_AUTH_REFRESH);
	}

	user(userId: string) {
		return this._httpClient.get<IResponseUser>(`${URL_USERS}/${userId}`);
	}
}
