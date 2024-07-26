import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { AuthenticationModel } from 'src/app/model/pages/authentication.model';
import { Observable, map } from 'rxjs';
import { EmployeeModel } from 'src/app/model/pages/employee.model';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private _messageService: MessageService,
        private _httpRequestService: HttpRequestService
    ) { }

    login(payload: AuthenticationModel.ILogin): Observable<EmployeeModel.GetEmployee> {
        return this._httpRequestService
            .getRequestWithoutMap(`${environment.webApiUrl}/employee-management/user.json`)
            .pipe(
                map((result) => {
                    if (result.status) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Login Berhasil', detail: `Selamat Datang ${result.data.firstName}` })
                        this.handleLogin(result.data);
                    }

                    return result;
                })
            )
    }

    getUserData(): EmployeeModel.IEmployee {
        return JSON.parse(localStorage.getItem("_EMMSUD_") as any);
    }

    private handleLogin(data: EmployeeModel.IEmployee) {
        localStorage.setItem("_EMMSUD_", JSON.stringify(data));
    }
}
