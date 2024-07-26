import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EmployeeModel } from 'src/app/model/pages/employee.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-employee',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        TableComponent,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule
    ],
    templateUrl: './list-employee.component.html',
    styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    Grup$ = this._employeeService.getGrup()
        .pipe(takeUntil(this.Destroy$));

    SelectedGrup!: string;

    Status$ = this._employeeService.getStatus()
        .pipe(takeUntil(this.Destroy$));

    SelectedStatus!: string;

    Filter$ = new BehaviorSubject<any>({});

    TableDatasource: EmployeeModel.IEmployee[] = [];
    TableColumns: any = [
        {
            field: 'firstName',
            header: 'Nama Depan',
            type: 'string',
            width: '10%'
        },
        {
            field: 'lastName',
            header: 'Nama Belakang',
            type: 'string',
            width: '10%'
        },
        {
            field: 'email',
            header: 'Email',
            type: 'string',
            width: '15%'
        },
        {
            field: 'birthDate',
            header: 'Tanggal Lahir',
            type: 'date',
            width: '10%'
        },
        {
            field: 'group',
            header: 'Grup',
            type: 'string',
            width: '10%'
        },
        {
            field: 'basicSalary',
            header: 'Gaji Pokok',
            type: 'currency',
            width: '12%'
        },
        {
            field: 'status',
            header: 'Status',
            type: 'status',
            align: 'center',
            width: '12%'
        },
    ];

    constructor(
        private _router: Router,
        private _employeeService: EmployeeService
    ) {
        this.Filter$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                this.getAll(result);
            })
    }

    ngOnInit(): void {
        const savedFilter = localStorage.getItem("_EMMSFILTER_");

        if (savedFilter) {
            const filter = JSON.parse(savedFilter);

            if (Object.keys(filter).length) {
                this.getAll(filter);

                if (filter.group) {
                    this.SelectedGrup = filter.group;
                }

                if (filter.status) {
                    this.SelectedStatus = filter.status;
                }
            };
        };
    }

    handleNavigateToTambah() {
        this._router.navigateByUrl("/employee/create");
    }

    private getAll(filter?: any) {
        this._employeeService.getAll(filter)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                console.log("employee =>", result);
                this.TableDatasource = result;
            })
    }

    handleFilterGrupChange(args: any) {
        if (args) {
            this.Filter$.next({
                ...this.Filter$.value,
                group: args
            });
            localStorage.setItem("_EMMSFILTER_", JSON.stringify(this.Filter$.value));

        } else {
            let value = this.Filter$.value;
            delete value.group;
            this.Filter$.next(value);
            localStorage.setItem("_EMMSFILTER_", JSON.stringify(this.Filter$.value));
        }
    }

    handleFilterStatusChange(args: any) {
        if (args) {
            this.Filter$.next({
                ...this.Filter$.value,
                status: args
            });
            localStorage.setItem("_EMMSFILTER_", JSON.stringify(this.Filter$.value));
        } else {
            let value = this.Filter$.value;
            delete value.status;
            this.Filter$.next(value);
            localStorage.setItem("_EMMSFILTER_", JSON.stringify(this.Filter$.value));
        }
    }

    handleClickActionTable(args: any) {
        if (args.action == 'edit') {
            this._router.navigateByUrl(`/employee/edit/${args.data.id}`);
        }

        if (args.action == 'detail') {
            this._router.navigateByUrl(`/employee/detail/${args.data.id}`);
        }
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
