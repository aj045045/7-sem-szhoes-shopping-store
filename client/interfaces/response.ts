export interface ResponseInterface<T = unknown> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
}