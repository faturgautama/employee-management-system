import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    ShowLoading$ = new BehaviorSubject<boolean>(false);

    ShowSidebar$ = new BehaviorSubject<boolean>(false);

    constructor() { }
}
