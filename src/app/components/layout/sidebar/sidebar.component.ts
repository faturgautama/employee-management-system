import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    UserData$ = this._loginService.getUserData();

    ShowSidebar = false;

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
                this.ShowSidebar = result;
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickMenu(url: string) {
        if (!this.ShowSidebar) {
            this._utilityService.ShowSidebar$.next(true);
        } else {
            this._router.navigateByUrl(url);
        }
    }
}
