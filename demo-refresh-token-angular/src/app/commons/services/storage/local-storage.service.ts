import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService extends StorageService {
	constructor() {
		super(window.localStorage);
	}
}
