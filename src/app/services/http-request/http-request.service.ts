import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { HttpBaseResponse } from 'src/app/model/http/http-response.model';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(
        private _httpClient: HttpClient,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) { }

    getRequest(url: string): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .get<HttpBaseResponse>(url)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        let data = [];

                        for (const key in result) {
                            if (result.hasOwnProperty(key)) {
                                data.push({ ...result[key], id: key });
                            }
                        };

                        return {
                            status: true,
                            message: 'success',
                            data: data
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    getRequestWithoutMap(url: string): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .get<HttpBaseResponse>(url)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        return {
                            status: true,
                            message: 'success',
                            data: result
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    postRequest(url: string, payload: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .post<HttpBaseResponse>(url, payload)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        return {
                            status: true,
                            message: 'success',
                            data: result
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    putRequest(url: string, payload: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .put<HttpBaseResponse>(url, payload)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        return {
                            status: true,
                            message: 'success',
                            data: result
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    patchRequest(url: string, payload: any): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .patch<HttpBaseResponse>(url, payload)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        return {
                            status: true,
                            message: 'success',
                            data: result
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    deleteRequest(url: string): Observable<HttpBaseResponse> {
        this._utilityService.ShowLoading$.next(true);

        return this._httpClient
            .delete<HttpBaseResponse>(url)
            .pipe(
                map((result: any) => {
                    this._utilityService.ShowLoading$.next(false);

                    if (result) {
                        return {
                            status: true,
                            message: 'success',
                            data: result
                        }
                    } else {
                        return {
                            status: false,
                            message: 'failed',
                            data: null
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    private handlingError(error: HttpErrorResponse) {
        this._utilityService.ShowLoading$.next(false);
        this._messageService.clear();
        this._messageService.add({ severity: 'error', summary: 'Oops', detail: error.statusText });
    }
}
