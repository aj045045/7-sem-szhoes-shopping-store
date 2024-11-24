import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ChangeStepInterface } from "@/interfaces/login";
import { IoWarning } from "react-icons/io5";
import { getErrorMessage } from "@/utility/form-wrapper";

/**
 * The component that is used to update the password if the user forgets it.
 *
 * @returns The Login 3 Page
 */
export function Login_3Page({ previousStep, register, errors, form }: ChangeStepInterface) {
    const [isVisible, setIsVisible] = useState(false);

    // Watch form values for real-time validation
    const newPassword = form?.watch('newPassword');
    const confirmPassword = form?.watch('confirmPassword');

    // Determine if the passwords match and if both are valid
    const passwordsMatch = newPassword === confirmPassword;
    const isPasswordValid = newPassword && newPassword.length >= 8;
    return (
        <div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl mb-20">
            <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
                <Image
                    src={"/images/reset-password.png"}
                    alt="Login Image"
                    priority
                    width={0}
                    height={0}
                    className="w-full p-5"
                    unoptimized
                />
            </div>
            <div className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
                <div className="space-y-2 mb-5">
                    <div className="text-3xl">Login</div>
                </div>
                <Input
                    label="New Password"
                    classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }}
                    isRequired
                    labelPlacement="outside"
                    placeholder="Enter New Password"
                    variant="bordered"
                    radius="sm"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onMouseEnter={() => setIsVisible(true)}
                            onMouseLeave={() => setIsVisible(false)}
                        >
                            {isVisible ? (
                                <FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />
                            ) : (
                                <FaEye className="text-2xl text-neutral-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    value={newPassword}  // Bind value to form state
                    {...register('newPassword')}
                    {...getErrorMessage(errors.newPassword)}
                />
                <Input
                    label="Confirm Password"
                    classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }}
                    isRequired
                    labelPlacement="outside"
                    placeholder="Enter Password again to Confirm"
                    variant="bordered"
                    radius="sm"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onMouseEnter={() => setIsVisible(true)}
                            onMouseLeave={() => setIsVisible(false)}
                        >
                            {isVisible ? (
                                <FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />
                            ) : (
                                <FaEye className="text-2xl text-neutral-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    value={confirmPassword}  // Bind value to form state
                    {...register('confirmPassword')}
                    {...getErrorMessage(errors.confirmPassword)}  // Use errors for confirmPassword field
                />
                {newPassword && confirmPassword && !passwordsMatch && (
                    <div className="flex flex-row space-x-2 items-center text-sm mt-1 text-red-500">
                        <IoWarning className="text-medium" />
                        <p>New Password and Confirm Password are not the same</p>
                    </div>
                )}
                <div className="flex flex-row w-11/12 bottom-0 mt-auto space-x-5">
                    <Button
                        isDisabled={true}
                        size="md"
                        radius="none"
                        className="mt-10 border-2 border-green-600 bg-transparent uppercase w-full self-center"
                        onClick={previousStep}
                    >
                        Back
                    </Button>
                    <Button
                        isDisabled={!passwordsMatch || !isPasswordValid}
                        type="submit"
                        variant="solid"
                        size="md"
                        radius="none"
                        className="bg-green-500 mt-10 uppercase w-full self-center"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
