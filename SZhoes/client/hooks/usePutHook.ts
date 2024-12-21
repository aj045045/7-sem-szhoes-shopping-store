'use client'
import { useState } from "react";
import { toggle_loading } from "@/redux/feature/loading";
import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";
import { toggle_error } from "@/redux/feature/error";

interface FormData {
    [key: string]: any;
}
interface ValidationPattern {
    [key: string]: RegExp;
}

export function usePutHook(id: string | undefined, url: string, initialState: FormData, validationPatterns: ValidationPattern,): {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    validationErrors: { [key: string]: boolean },
    submitSuccess: boolean,
    formData: FormData,
    setFormData?: any,
} {
    const [formData, setFormData] = useState<FormData>(initialState);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: any) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox' || type === 'radio') {
            setFormData(prevState => ({ ...prevState, [name]: checked }));
        } else {
            const isValid = validationPatterns[name]?.test(value) || false;
            setFormData(prevState => ({ ...prevState, [name]: value }));
            setValidationErrors(prevState => ({ ...prevState, [name]: !isValid }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(toggle_loading(true));
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }), // Conditionally add the Authorization header
        };

        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Connection error try after some time" }));
            }
            const responseData = await response.json();
            dispatch(toggle_error({ type: responseData.status, data: responseData.message }));
            setSubmitSuccess(true);
        } catch (error: any) {
            dispatch(toggle_error({ type: "alert", data: "Server error please try after sometime" }));
        } finally {
            dispatch(toggle_loading(false));
        }
    };
    return {
        formData,
        submitSuccess,
        validationErrors,
        handleInputChange,
        handleSubmit,
        setFormData,
    };
}