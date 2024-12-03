import * as Yup from 'yup';

export interface FaqInterface {
    question: string;
    answer: string;
}

export const FaqYupSchema = Yup.object({
    question: Yup.string()
        .required('Question is required')
        .min(5, 'Question must be at least 5 characters long')
        .max(100, 'Question must not exceed 500 characters'),
    answer: Yup.string()
        .required('Answer is required')
        .min(10, 'Answer must be at least 10 characters long')
        .max(2000, 'Answer must not exceed 2000 characters'),
});

