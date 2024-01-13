export class ResponseDto {
    ok: boolean;
    data?: any;
    message?: string;
    error?: any;
    nTotal?: number;

    constructor(response: ResponseDto) {
        this.ok = response.ok;
        this.data = response.data;
        this.message = response.message;
        this.error = response.error;
        this.nTotal = response.nTotal;
    }
}