import { HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { KEY_STORAGE } from '../models/storage.enum';
import { IDataUser } from '../models/user.interface';
import { URL_AUTH_REFRESH } from './api/urls-api';
import { LocalStorageService } from './storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenManageService {
	private _isRefreshing = false;
	private localStorageService = inject(LocalStorageService);

	get isRefreshing() {
		return this._isRefreshing;
	}
	set isRefreshing(value) {
		this._isRefreshing = value;
	}

	addTokenHeader(request: HttpRequest<unknown>) {
		const user = this.getDataUser();
		const token = request.url === URL_AUTH_REFRESH ? user.refreshToken : user.accessToken;

		return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
	}

	updateTokens(token: string, refreshToken: string) {
		const user = this.getDataUser();
		user.accessToken = token;
		user.refreshToken = refreshToken;
		this.localStorageService.setItem(KEY_STORAGE.DATA_USER, user);
	}

	getDataUser() {
		return this.localStorageService.getItem<IDataUser>(KEY_STORAGE.DATA_USER)!;
	}
}
