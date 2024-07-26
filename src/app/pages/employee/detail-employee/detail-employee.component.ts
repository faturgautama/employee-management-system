import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, formatCurrency, formatDate } from '@angular/common';
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
    selector: 'app-detail-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardComponent,
        ButtonModule,
        ValidatorMessageComponent,
        InputTextModule,
    ],
    templateUrl: './detail-employee.component.html',
    styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements AfterViewInit, OnDestroy {

    Destroy$ = new Subject();

    FormDetailEmployee: FormGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _employeeService: EmployeeService,
    ) {
        this.FormDetailEmployee = this._formBuilder.group({
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
                    result.data.birthDate = formatDate(new Date(result.data.birthDate), 'dd MMMM yyyy', 'EN');
                    result.data.basicSalary = formatCurrency(result.data.basicSalary, 'EN', 'Rp. ');

                    this.FormDetailEmployee.setValue(result.data);
                }
            })
    }

    handleBackToList() {
        this._router.navigateByUrl("/employee/list");
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    get username(): AbstractControl { return this.FormDetailEmployee.get('username') as AbstractControl };
    get firstName(): AbstractControl { return this.FormDetailEmployee.get('firstName') as AbstractControl };
    get lastName(): AbstractControl { return this.FormDetailEmployee.get('lastName') as AbstractControl };
    get email(): AbstractControl { return this.FormDetailEmployee.get('email') as AbstractControl };
    get birthDate(): AbstractControl { return this.FormDetailEmployee.get('birthDate') as AbstractControl };
    get basicSalary(): AbstractControl { return this.FormDetailEmployee.get('basicSalary') as AbstractControl };
    get status(): AbstractControl { return this.FormDetailEmployee.get('status') as AbstractControl };
    get group(): AbstractControl { return this.FormDetailEmployee.get('group') as AbstractControl };
    get description(): AbstractControl { return this.FormDetailEmployee.get('description') as AbstractControl };
}
