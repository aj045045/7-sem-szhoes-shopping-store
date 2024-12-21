'use client'
import { useCallback, useState } from "react";
import { toggle_loading } from "@/redux/feature/loading";
import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";
import { toggle_error } from "@/redux/feature/error";

/**
 * Custom hook to use DELETE method
 * @field url to request for delete
 * @returns SendRequest Object that have method to be called
 */
export function useDeleteHook(id: string, url: string): { deleteData: () => void, status: boolean } {
    const dispatch = useDispatch<AppDispatch>();
    const [status, setStatus] = useState(false);

    const deleteData = useCallback(async () => {
        if (!url || !id) return;

        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }), // Conditionally add the Authorization header
        };
        try {
            dispatch(toggle_loading(true));
            const urlData = `${url}/${id}`;
            console.log("DELETE URL " + urlData);
            const response = await fetch(urlData, {
                method: "DELETE",
                headers: headers,
            });
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Connection error try after some time" }));
            } else {
                const json = await response.json();
                if (json.status !== "alert") {
                    dispatch(toggle_error({ type: json.status, data: json.message }));
                    setStatus(true);
                } else {
                    dispatch(toggle_error({ type: "alert", data: json.message }));

                }
            }
        } finally {
            dispatch(toggle_loading(false));
        }
    }, [dispatch, url, id]);
    return { deleteData, status };
}
