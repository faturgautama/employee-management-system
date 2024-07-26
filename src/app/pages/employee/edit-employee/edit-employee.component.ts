import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { ValidatorMessageComponent } from 'src/app/components/validator-message/validator-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeModel } from 'src/app/model/pages/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
    selector: 'app-edit-employee',
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
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    FormEditEmployee: FormGroup;

    Grup$ = this._employeeService.getGrup()
        .pipe(takeUntil(this.Destroy$));

    Status$ = this._employeeService.getStatus()
        .pipe(takeUntil(this.Destroy$));

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _employeeService: EmployeeService,
    ) {
        this.FormEditEmployee = this._formBuilder.group({
            id: ['', [Validators.required]],
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

    ngAfterViewInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        this.getById(id);
    }

    private getById(id: string) {
        this._employeeService
            .getById(id)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    result.data.id = id;
                    result.data.birthDate = new Date(result.data.birthDate);

                    this.FormEditEmployee.setValue(result.data);
                }
            })
    }

    handleBackToList() {
        this._router.navigateByUrl("/employee/list");
    }

    handleUpdateEmployee(data: EmployeeModel.EditEmployee) {
        this._employeeService
            .update(data)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.status) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diperbarui' });
                    this._router.navigateByUrl("/employee/list");
                }
            })
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    get username(): AbstractControl { return this.FormEditEmployee.get('username') as AbstractControl };
    get firstName(): AbstractControl { return this.FormEditEmployee.get('firstName') as AbstractControl };
    get lastName(): AbstractControl { return this.FormEditEmployee.get('lastName') as AbstractControl };
    get email(): AbstractControl { return this.FormEditEmployee.get('email') as AbstractControl };
    get birthDate(): AbstractControl { return this.FormEditEmployee.get('birthDate') as AbstractControl };
    get basicSalary(): AbstractControl { return this.FormEditEmployee.get('basicSalary') as AbstractControl };
    get status(): AbstractControl { return this.FormEditEmployee.get('status') as AbstractControl };
    get group(): AbstractControl { return this.FormEditEmployee.get('group') as AbstractControl };
    get description(): AbstractControl { return this.FormEditEmployee.get('description') as AbstractControl };

}
