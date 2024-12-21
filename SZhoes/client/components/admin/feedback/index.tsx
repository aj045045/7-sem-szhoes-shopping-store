'use client'
import { Chart } from "@/components/utility/admin/Chart";
import { DataCard } from "@/components/utility/admin/DataCard";
import { MdOutlineFeedback } from "react-icons/md";
import { DataList } from "./DataList";
import { useGetHook } from "@/hooks";
import { useEffect } from "react";

/**
 * Feedback component to view feedback
 * 
 * This component is used to view the number of feedback on the system
 * @returns Feedback Components
 */
export function AdminFeedbackComp() {
    const { data, fetchData } = useGetHook("/f/count/feedback");
    const feedbackCount = data !== null ? String(data) : "0";
    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [fetchData, data]);
    return (
        <>
            <DataCard title="No. of Feedback" value={feedbackCount} icon={<MdOutlineFeedback />} />
            <Chart title="Feedback summary" imagePath="/f/graph/feedback" display="createdAt" />
            <DataList />
        </>
    )
}