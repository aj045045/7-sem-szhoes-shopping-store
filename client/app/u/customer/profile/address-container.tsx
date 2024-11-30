import { montserratSubrayada } from "@/langs";
import { AddAddressPage } from "./add-address";
import { UpdateAddressPage } from "./update-address";
import { Divider, Input } from "@nextui-org/react";
import { AddressInterface } from "@/interfaces/customer";

/**
 * The Component that is used to add or update the address of the user
 * 
 * @param formData - The Form Data
 * @parm handleInputChange - The Input Handler
 * @param validationErrors - The Error Validator
 * @returns Address
 */

export function AddressPage({ address }: { address: AddressInterface[] }) {
    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <div className="flex justify-between">
                <span className={`${montserratSubrayada.className} text-lg`}>Address</span>
                <AddAddressPage />
            </div>
            <div className="px-2">
                {
                    address.length ?
                        address.map((addressItem: AddressInterface, index: number) => (
                            <div key={index}>
                                <div className="flex flex-row mt-5">
                                    <Divider orientation="horizontal" className="-mr-10" />
                                    <UpdateAddressPage address={addressItem} />
                                </div>
                                <div className="grid grid-cols-2">
                                    <Input
                                        label="Street"
                                        name="street"
                                        isReadOnly
                                        value={addressItem.street}
                                        classNames={{
                                            base: "w-11/12 pt-5 z-0",
                                            inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400"
                                        }}
                                        labelPlacement="outside"
                                        placeholder=""
                                        radius="sm"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="City"
                                        name="city"
                                        isReadOnly
                                        value={addressItem.city} // Assuming AddressInterface has a `city` property
                                        classNames={{
                                            base: "w-11/12 pt-5 z-0",
                                            inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400"
                                        }}
                                        labelPlacement="outside"
                                        placeholder=" "
                                        radius="sm"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="State"
                                        name="state"
                                        isReadOnly
                                        value={addressItem.state} // Assuming AddressInterface has a `state` property
                                        classNames={{
                                            base: "w-11/12 pt-5 z-0",
                                            inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400"
                                        }}
                                        labelPlacement="outside"
                                        placeholder=""
                                        radius="sm"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Zip"
                                        name="zip"
                                        isReadOnly
                                        value={addressItem.zip} // Assuming AddressInterface has a `zip` property
                                        classNames={{
                                            base: "w-11/12 pt-5 z-0",
                                            inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400"
                                        }}
                                        labelPlacement="outside"
                                        placeholder=""
                                        radius="sm"
                                        variant="bordered"
                                    />
                                    <Input
                                        label="Country"
                                        name="country"
                                        isReadOnly
                                        value={addressItem.country} // Assuming AddressInterface has a `country` property
                                        classNames={{
                                            base: "w-11/12 pt-5 z-0",
                                            inputWrapper: "h-12  bg-neutral-300 border-2 border-neutral-400"
                                        }}
                                        labelPlacement="outside"
                                        placeholder=""
                                        radius="sm"
                                        variant="bordered"
                                    />
                                </div>
                            </div>
                        )) :
                        (
                            <div className="w-full h-20 items-center flex justify-center text-lg bg-gray-300 rounded-lg my-5 text-gray-600">
                                No address is found
                            </div>
                        )
                }
            </div>
        </div>
    );
}




