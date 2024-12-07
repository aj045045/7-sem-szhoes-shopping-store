import { ResponseInterface } from '@/interfaces/response';
import { ToastUtil } from './toast';

export class SubmitHandlerUtil {
    static async onSubmitGet<T>(url: string): Promise<T | undefined> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result: ResponseInterface<T> = await response.json();
            if (result.status === "error" && result.message) {
                ToastUtil.error(result.message);
                return undefined; 
            }
            return result.data;
    
        } catch (error) {
            ToastUtil.error("An error occurred while fetching data.");
            return undefined;  // or you can rethrow the error if needed
        }
    }
    

    static async onSubmitPost<T>(url: string, data: T) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result: ResponseInterface) => {
                if (result.status == "error" && result.message) {
                    ToastUtil.error(result.message);
                }
                if (result.status == "success" && result.message) {
                    ToastUtil.success(result.message);
                    const timer = setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            })
    }

    static async onSubmitPut<T>(url: string, data: T) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result: ResponseInterface) => {
                if (result.status == "error" && result.message) {
                    ToastUtil.error(result.message);
                }
                if (result.status == "success" && result.message) {
                    ToastUtil.success(result.message);
                    const timer = setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            });
    }

    static async onSubmitDelete(url: string) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result: ResponseInterface) => {
                if (result.status === "error" && result.message) {
                    ToastUtil.error(result.message);
                }
                if (result.status === "success" && result.message) {
                    ToastUtil.success(result.message);
                    const timer = setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            });
    }
}
