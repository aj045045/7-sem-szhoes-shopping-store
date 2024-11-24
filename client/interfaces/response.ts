export interface ResponseInterface {
    status: 'success' | 'error',
    message?: string,
    data?: []
}