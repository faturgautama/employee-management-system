import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TooltipModule
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService
    ) { }

    handleToggleSidebar() {
        const value = this._utilityService.ShowSidebar$.value;
        this._utilityService.ShowSidebar$.next(!value);
    }

    handleNavigateToBeranda() {
        this._router.navigateByUrl("/beranda");
    }

    handleSignOut() {
        this._utilityService.ShowLoading$.next(true);

        setTimeout(() => {
            this._utilityService.ShowLoading$.next(false);
            this._messageService.clear();
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Sign Out Berhasil' })
            localStorage.clear();
            this._router.navigateByUrl("");
        }, 2000);
    }
}
