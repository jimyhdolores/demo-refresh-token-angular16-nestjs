import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';
import { AppService } from '../services/api/app.service';
import { RefreshTokenManageService } from '../services/refresh-token-manager.service';

export const ErrorApiInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	const appService = inject(AppService);
	const refreshTokenManageService = inject(RefreshTokenManageService);
	const router = inject(Router);

	return next(request).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status == HttpStatusCode.Unauthorized) {
				console.log('****INICIANDO REFRESH TOKEN****');
				refreshTokenManageService.isRefreshing = true;

				return appService.refreshToken().pipe(
					finalize(() => (refreshTokenManageService.isRefreshing = false)),
					concatMap((response) => {
						refreshTokenManageService.updateTokens(response.accessToken, response.refreshToken);

						console.log('****TOKEN ACTUALIZADO****');

						const requestClone = refreshTokenManageService.addTokenHeader(request);
						return next(requestClone);
					}),
					catchError(() => {
						console.log('*******ERROR EN EL REFRESH TOKEN********');
						router.navigateByUrl('/');
						return EMPTY;
					})
				);
			}
			return throwError(() => error);
		})
	);
};
