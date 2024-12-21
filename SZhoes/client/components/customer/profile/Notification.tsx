import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/theme";
import { PersonalInformationInterface } from "./interface";
import { montserrat_Subrayada } from "@/langs";

/**
 * The component that is used for the setting and preference of the user
 * 
 * @param formData - The form Data
 * @param handleInputChange - The input handler
 * @returns List of setting 
 */
export function Notification({ setFormData, formData, handleInputChange }: PersonalInformationInterface) {
    const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData((prevData: any) => ({
            ...prevData,
            notification: {
                ...prevData.notification,
                [name]: checked, // Update the specific notification value
            },
        }));
    };

    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserrat_Subrayada.className} text-lg`}>Notification</span>
            <div className=" space-y-5 mt-5">
                {Object.entries(formData.notification).map(([key, value]) => (
                    <Switch
                        key={key}
                        name={key}
                        onChange={handleNotificationChange}
                        isSelected={value ? true : false}
                        classNames={{
                            base: cn(
                                "inline-flex flex-row-reverse w-full max-w-full bg-neutral-300 hover:bg-neutral-200  items-center",
                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-neutral-400",
                                "data-[selected=true]:border-green-400 data-[selected=true]:bg-green-100",
                            ),
                            wrapper: "p-0 h-4 overflow-visible",
                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                "group-data-[hover=true]:border-primary",
                                //selected
                                "group-data-[selected=true]:ml-6",
                                // pressed
                                "group-data-[pressed=true]:w-7",
                                "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-medium capitalize">{key} Notification</p>
                        </div>
                    </Switch>
                ))}
            </div>
        </div>
    )
}
