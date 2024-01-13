export class ResponseDto {
    code: number;
    data?: any;
    message?: string;
    error?: any;
    total?: number;

    constructor(response: ResponseDto) {
        this.code = response.code;
        this.data = response.data;
        this.message = response.message;
        this.error = response.error;
        this.total = response.total;
    }
}