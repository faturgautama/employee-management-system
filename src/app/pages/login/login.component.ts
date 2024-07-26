import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button'
import { MessagesModule } from 'primeng/messages';
import { ValidatorMessageComponent } from 'src/app/components/validator-message/validator-message.component';
import { AuthenticationModel } from 'src/app/model/pages/authentication.model';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessagesModule,
        ValidatorMessageComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    /**
     * @description Destroy Subject
    */
    Destroy$ = new Subject();

    /**
     * @description Form Group for Sign In
     * @type FormGroup 
    */
    FormSignIn: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
    ) {
        // ** Init FormSignIn value and props
        this.FormSignIn = this._formBuilder.group({
            username: ['', [Validators.required, Validators.min(1)]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleLogin(data: AuthenticationModel.ILogin) {
        this._loginService
            .login(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._router.navigateByUrl("/beranda");
                }
            })
    }

    get username(): AbstractControl { return this.FormSignIn.get('username') as AbstractControl }
    get password(): AbstractControl { return this.FormSignIn.get('password') as AbstractControl }
}
