import { Chart } from "@/components/utility/admin/Chart";
import { DataCard } from "@/components/utility/admin/DataCard";
import { FaEye, FaProductHunt } from "react-icons/fa6";
import { ProductDetail } from "./ProductDetail";

export function AdminProductComp() {
    return (
        <div className="space-y-5 mb-5">
            <div className="flex space-x-5">
                <DataCard title="Active Product" value={"0"} icon={<FaEye />} />
                <DataCard title="Total No. of Product" value={"0"} icon={<FaProductHunt />} />
            </div>
            {/* <Chart title="Launched Product" imagePath="/f/graph/product" display="createdAt" /> */}
            {/* <Chart title="Updated Product" imagePath="/f/graph/product" display="updatedAt" /> */}
            <ProductDetail />
        </div>
    )
}