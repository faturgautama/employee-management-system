import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
    selector: 'app-beranda',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent
    ],
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss']
})
export class BerandaComponent {

    UserData = this._loginService.getUserData();

    constructor(
        private _loginService: LoginService,
    ) { }
}
