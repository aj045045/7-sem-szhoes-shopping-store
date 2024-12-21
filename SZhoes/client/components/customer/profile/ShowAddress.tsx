import { Divider, Input } from "@nextui-org/react";
import { AddressInterface } from "./interface";
import { UpdateAddress } from "./UpdateAddress";
import { useGetHook } from "@/hooks";
import { useEffect } from "react";

export function ShowAddress({ id, setProfileFormData }: { id: string, setProfileFormData: any }) {
    const { data, fetchData, status } = useGetHook<AddressInterface>(`/s/address/${id}`);
    useEffect(() => {
        if (!status) {
            fetchData();
        }
    }, [fetchData, status]);
    return (
        <>
            <div className="flex flex-row mt-5">
                <Divider orientation="horizontal" className="-mr-10" />
                <UpdateAddress setProfileFormData={setProfileFormData} data={data} id={id} />
            </div>
            <div className="grid grid-cols-2">
                <Input label="Street" name="street" isReadOnly classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400" }} labelPlacement="outside" placeholder="" radius="sm" variant="bordered" value={data?.street} />
                <Input label="City" name="city" isReadOnly classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400" }} labelPlacement="outside" placeholder=" " radius="sm" variant="bordered" value={data?.city} />
                <Input label="State" name="state" isReadOnly classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400" }} labelPlacement="outside" placeholder="" radius="sm" variant="bordered" value={data?.state} />
                <Input label="Zip" name="zip" isReadOnly classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400" }} labelPlacement="outside" placeholder="" radius="sm" variant="bordered" value={data?.zip} />
                <Input label="Country" name="country" isReadOnly classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400" }} labelPlacement="outside" placeholder="" radius="sm" variant="bordered" value={data?.country} />
            </div>
        </>
    )
}