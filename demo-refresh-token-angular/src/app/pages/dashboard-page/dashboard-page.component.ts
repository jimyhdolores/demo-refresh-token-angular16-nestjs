import { Component, inject } from '@angular/core';
import { KEY_STORAGE } from '../../commons/models/storage.enum';
import { IDataUser } from '../../commons/models/user.interface';
import { AppService } from '../../commons/services/api/app.service';
import { LocalStorageService } from '../../commons/services/storage/local-storage.service';

@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
	private readonly _appService = inject(AppService);
	private readonly _localStorageService = inject(LocalStorageService);

	userName = '';
	clickUser(): void {
		const user = this._localStorageService.getItem<IDataUser>(KEY_STORAGE.DATA_USER)!;
		this._appService.user(user.userId).subscribe((response) => {
			this.userName = response.username;
		});
	}
}
