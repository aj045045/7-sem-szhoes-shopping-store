'use client'
import { useState, useCallback } from "react";
import { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";
import { toggle_error } from "@/redux/feature/error";
import { UseFetchResult } from "./interface";

/**
 * Custom hook to fetch data from a given URL
 * @param url The URL to fetch data from
 * @returns An object containing the fetch status and data
 */
export function useGetHook<T>(url: string): UseFetchResult<T> {
  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(async () => {
    if (!url) return;

    const token = localStorage.getItem("token");  
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    };
    try {
      const response = await fetch(url,{headers});
      if (!response.ok) {
        throw new Error("Connection error, try again later");
      }
      const json = await response.json();
      if (json.status === "alert") {
        dispatch(toggle_error({ type: "alert", data: json.message }));
      } else {
        setStatus(true);
        setData(json.data);
      }
    } catch (error) {
      dispatch(toggle_error({ type: "alert", data: "An error occurred, try again later" }));
    }
  }, [url, dispatch]);
  return { fetchData, status, data };
}
