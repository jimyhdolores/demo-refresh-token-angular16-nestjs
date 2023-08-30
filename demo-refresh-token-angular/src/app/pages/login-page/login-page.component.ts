import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KEY_STORAGE } from '../../commons/models/storage.enum';
import { AppService } from '../../commons/services/api/app.service';
import { LocalStorageService } from '../../commons/services/storage/local-storage.service';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _appService = inject(AppService);
	private readonly _router = inject(Router);
	private readonly _localStorageService = inject(LocalStorageService);

	form = this._formBuilder.nonNullable.group({
		user: ['john', Validators.required],
		password: ['changeme', Validators.required]
	});

	login(): void {
		if (this.form.valid) {
			const { user, password } = this.form.getRawValue();
			this._appService.login(user, password).subscribe((response) => {
				this._localStorageService.setItem(KEY_STORAGE.DATA_USER, response);
				this._router.navigateByUrl('/dashboard');
			});
		}
	}
}
