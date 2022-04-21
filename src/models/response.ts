export interface ResponseModel {
    message?: string;
    error?: string;
    // Value to return any type of data
    [key: string]: any;
}