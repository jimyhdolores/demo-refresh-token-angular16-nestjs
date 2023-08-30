import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { URL_AUTH_REFRESH, URL_AUTH_SIGNIN } from '../services/api/urls-api';
import { RefreshTokenManageService } from '../services/refresh-token-manager.service';

export const ApiInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	if (request.url === URL_AUTH_SIGNIN) {
		return next(request);
	}

	const refreshTokenManageService = inject(RefreshTokenManageService);

	if (request.url === URL_AUTH_REFRESH) {
		const requestClone = refreshTokenManageService.addTokenHeader(request);
		return next(requestClone);
	}

	if (refreshTokenManageService.isRefreshing) {
		console.log('****REFRESH TOKEN EN PROCESO, SE CANCELA LA PETICION****');
		return EMPTY;
	}

	const dataUser = refreshTokenManageService.getDataUser();

	if (!dataUser || !dataUser.accessToken) {
		inject(Router).navigateByUrl('/');
		return EMPTY;
	}

	const requestClone = refreshTokenManageService.addTokenHeader(request);

	return next(requestClone);
};
