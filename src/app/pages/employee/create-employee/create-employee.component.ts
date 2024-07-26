import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ValidatorMessageComponent } from 'src/app/components/validator-message/validator-message.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmployeeModel } from 'src/app/model/pages/employee.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardComponent,
        ButtonModule,
        ValidatorMessageComponent,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        InputNumberModule
    ],
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    FormCreateEmployee: FormGroup;

    Grup$ = this._employeeService.getGrup()
        .pipe(takeUntil(this.Destroy$));

    Status$ = this._employeeService.getStatus()
        .pipe(takeUntil(this.Destroy$));

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _messageService: MessageService,
        private _employeeService: EmployeeService,
    ) {
        this.FormCreateEmployee = this._formBuilder.group({
            username: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            birthDate: ['', [Validators.required]],
            basicSalary: ['', [Validators.required, Validators.min(1)]],
            status: ['Active', [Validators.required]],
            group: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {

    }

    handleBackToList() {
        this._router.navigateByUrl("/employee/list");
    }

    handleSaveEmployee(data: EmployeeModel.IEmployee) {
        this._employeeService
            .create(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this._router.navigateByUrl("/employee/list");
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    get username(): AbstractControl { return this.FormCreateEmployee.get('username') as AbstractControl };
    get firstName(): AbstractControl { return this.FormCreateEmployee.get('firstName') as AbstractControl };
    get lastName(): AbstractControl { return this.FormCreateEmployee.get('lastName') as AbstractControl };
    get email(): AbstractControl { return this.FormCreateEmployee.get('email') as AbstractControl };
    get birthDate(): AbstractControl { return this.FormCreateEmployee.get('birthDate') as AbstractControl };
    get basicSalary(): AbstractControl { return this.FormCreateEmployee.get('basicSalary') as AbstractControl };
    get status(): AbstractControl { return this.FormCreateEmployee.get('status') as AbstractControl };
    get group(): AbstractControl { return this.FormCreateEmployee.get('group') as AbstractControl };
    get description(): AbstractControl { return this.FormCreateEmployee.get('description') as AbstractControl };
}
