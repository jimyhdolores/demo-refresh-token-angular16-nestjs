import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import APP_ROUTES from './app.routes';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
export const appConfig: ApplicationConfig = {
	providers: [provideRouter(APP_ROUTES), provideHttpClient(withInterceptors([ApiInterceptor, ErrorApiInterceptor]))]
};
