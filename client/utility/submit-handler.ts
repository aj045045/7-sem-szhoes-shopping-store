import { ResponseInterface } from '@/interfaces/response';
import { ToastUtil } from './toast';

export class SubmitHandlerUtil {
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
                }
                window.location.reload();
            })
    }
}
