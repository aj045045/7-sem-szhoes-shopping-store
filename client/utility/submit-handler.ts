import { ResponseInterface } from '@/interfaces/response';
import { toast } from 'sonner';

export class SubmitHandlerUtil {
    static async onSubmitPost<T>(url: string, data: T) {
        console.log('FORM SUBMIT', JSON.stringify(data));
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result: ResponseInterface) => {
                if (result.status == "error") {
                    toast.error(result.message);
                }
                window.location.reload();
            })
    }
}
