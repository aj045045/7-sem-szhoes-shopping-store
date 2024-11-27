import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/theme";
import { montserratSubrayada } from "@/langs";

/**
 * The component that is used for the setting and preference of the user
 * 
 * @param notifications - The notification settings data
 * @returns List of settings 
 */
export function NotificationPage({ notifications }: { notifications: Record<string, boolean> }) {
    const notificationSettings = notifications ?? {};

    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserratSubrayada.className} text-lg`}>Notification</span>
            <div className=" space-y-5 mt-5">
                {Object.entries(notificationSettings).map(([key, value]) => (
                    <Switch
                        key={key}
                        name={key}
                        // onChange={handleNotificationChange}
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
    );
}
