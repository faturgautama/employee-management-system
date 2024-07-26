export class HttpBaseResponse {
    status: boolean;
    message: string;
    data: any;

    constructor(
        _status: boolean,
        _message: string,
        _data: any
    ) {
        this.status = _status;
        this.message = _message;
        this.data = _data;
    }
}