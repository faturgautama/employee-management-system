import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './middleware/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadComponent: async () => (await import('./pages/login/login.component')).LoginComponent,
        data: {
            title: 'Login',
        }
    },
    {
        path: 'beranda',
        canActivate: [AuthGuard],
        loadComponent: async () => (await import('./pages/beranda/beranda.component')).BerandaComponent,
        data: {
            title: 'Beranda',
        }
    },
    {
        path: 'employee',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'list',
                loadComponent: async () => (await import('./pages/employee/list-employee/list-employee.component')).ListEmployeeComponent,
                data: {
                    title: 'Data Employee'
                }
            },
            {
                path: 'create',
                loadComponent: async () => (await import('./pages/employee/create-employee/create-employee.component')).CreateEmployeeComponent,
                data: {
                    title: 'Tambah Employee'
                }
            },
            {
                path: 'edit/:id',
                loadComponent: async () => (await import('./pages/employee/edit-employee/edit-employee.component')).EditEmployeeComponent,
                data: {
                    title: 'Edit Employee'
                }
            },
            {
                path: 'detail/:id',
                loadComponent: async () => (await import('./pages/employee/detail-employee/detail-employee.component')).DetailEmployeeComponent,
                data: {
                    title: 'Detail Employee'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
