import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        SidebarComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    Destroy$ = new Subject();

    UserData$ = this._loginService.getUserData();

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _utilityService: UtilityService
    ) { }

    ngOnInit(): void {
        // ** Listen to show sidebar state
        this._utilityService.ShowSidebar$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                const sidebarEl = document.getElementById('sidebar') as HTMLElement;

                if (result) {
                    sidebarEl.classList.replace('w-[5rem]', 'w-[20rem]');
                } else {
                    sidebarEl.classList.replace('w-[20rem]', 'w-[5rem]');
                }
            });

        // ** Detect navigation end
        this._router.events
            .pipe(takeUntil(this.Destroy$))
            .subscribe(event => {
                if (event instanceof NavigationStart) {
                    this._utilityService.ShowSidebar$.next(false);
                }
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
