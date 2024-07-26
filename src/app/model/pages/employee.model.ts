import { HttpBaseResponse } from "../http/http-response.model"

export namespace EmployeeModel {
    export interface IEmployee {
        username: string
        firstName: string
        lastName: string
        email: string
        birthDate: Date
        basicSalary: number
        status: string
        group: string
        description: string
    }

    export class GetEmployee implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: IEmployee[]
    }

    export class GetByIdEmployee implements HttpBaseResponse {
        status!: boolean
        message!: string
        data!: IEmployee
    }

    export interface SaveEmployee {
        username: string
        firstName: string
        lastName: string
        email: string
        birthDate: Date
        basicSalary: number
        status: string
        group: string
        description: string
    }

    export interface EditEmployee {
        id: string
        username: string
        firstName: string
        lastName: string
        email: string
        birthDate: Date
        basicSalary: number
        status: string
        group: string
        description: string
    }
}