import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { environment } from 'src/environments/environment.prod';
import { map, of } from 'rxjs';
import { EmployeeModel } from 'src/app/model/pages/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private _httpRequestService: HttpRequestService
    ) { }

    getGrup() {
        return of([
            {
                value: "Engineering",
                label: "Engineering"
            },
            {
                value: "Finance",
                label: "Finance"
            },
            {
                value: "HR",
                label: "HR"
            },
            {
                value: "Marketing",
                label: "Marketing"
            },
            {
                value: "Operations",
                label: "Operations"
            },
            {
                value: "Sales",
                label: "Sales"
            },
        ])
    }

    getStatus() {
        return of([
            {
                value: "Active",
                label: "Aktif"
            },
            {
                value: "Inactive",
                label: "Non Aktif"
            },
            {
                value: "On Leave",
                label: "Sedang Cuti"
            },
        ])
    }

    getAll(query?: any) {
        return this._httpRequestService
            .getRequest(`${environment.webApiUrl}/employee-management/employee.json`)
            .pipe(
                map((result) => {
                    if (query && Object.keys(query).length) {
                        // ** Check Filter Group and Filter Status
                        if (query.group && query.status) {
                            return result.data.filter((item: EmployeeModel.IEmployee) => {
                                return item.group == query.group && item.status == query.status
                            })
                        }

                        // ** Check Filter Only Group
                        if (query.group && !query.status) {
                            return result.data.filter((item: EmployeeModel.IEmployee) => {
                                return item.group == query.group
                            })
                        }

                        // ** Check Filter Only Status
                        if (!query.group && query.status) {
                            return result.data.filter((item: EmployeeModel.IEmployee) => {
                                return item.status == query.status
                            })
                        }
                    } else {
                        return result.data;
                    }
                })
            )
    }

    getById(id: string) {
        return this._httpRequestService.getRequestWithoutMap(`${environment.webApiUrl}/employee-management/employee/${id}.json`);
    }

    create(payload: EmployeeModel.SaveEmployee) {
        return this._httpRequestService
            .postRequest(`${environment.webApiUrl}/employee-management/employee.json`, payload);
    }

    update(payload: EmployeeModel.EditEmployee) {
        return this._httpRequestService
            .patchRequest(`${environment.webApiUrl}/employee-management/employee/${payload.id}.json`, payload);
    }

    delete(id: string) {
        return this._httpRequestService
            .deleteRequest(`${environment.webApiUrl}/employee-management/employee/${id}.json`);
    }
}
