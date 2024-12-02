import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/theme";
import { montserratSubrayada } from "@/langs";
import * as Yup from 'yup';
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * The component that is used for the setting and preference of the user
 * 
 * @param notifications - The notification settings data
 * @returns List of settings 
 */
export function NotificationPage({ notifications }: { notifications: Record<string, boolean> }) {
    const notificationSettings = useMemo(() => notifications ?? {}, [notifications]);
    const [hasChanges, setHasChanges] = useState(false);

    const schema = Yup.object(
        Object.fromEntries(
            Object.keys(notificationSettings).map(key => [key, Yup.boolean().required(`${key} is required`)])
        )
    ).required();

    const form = useForm<Record<string, boolean>>({ defaultValues: notifications, resolver: yupResolver(schema), mode: 'onChange' });
    useEffect(() => {
        const subscription = form?.watch((values) => {
            const hasDifference = Object.keys(notificationSettings).some(
                (key) => values[key] !== notificationSettings[key]
            );
            setHasChanges(hasDifference);
        });
        return () => subscription?.unsubscribe();
    }, [form, notificationSettings,]);

    const onSubmit = (data: Record<string, boolean>) => {
        SubmitHandlerUtil.onSubmitPut('/s/customer/notifications', data);
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <span className={`${montserratSubrayada.className} text-lg`}>Notification</span>
            <div className="space-y-5 mt-5">
                {Object.entries(notificationSettings).map(([key]) => (
                    <Controller
                        key={key}
                        name={key}
                        control={form?.control}
                        defaultValue={notificationSettings[key]}
                        render={({ field }) => (
                            <Switch
                                ref={field.ref}
                                isSelected={field.value}
                                onChange={(event) => field.onChange(event.target.checked)}
                                classNames={{
                                    base: cn(
                                        "inline-flex flex-row-reverse w-full max-w-full bg-neutral-300 hover:bg-neutral-200 items-center",
                                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-neutral-400",
                                        "data-[selected=true]:border-green-400 data-[selected=true]:bg-green-100",
                                    ),
                                    wrapper: "p-0 h-4 overflow-visible",
                                    thumb: cn(
                                        "w-6 h-6 border-2 shadow-lg",
                                        "group-data-[hover=true]:border-primary",
                                        "group-data-[selected=true]:ml-6",
                                        "group-data-[pressed=true]:w-7",
                                        "group-data-[selected]:group-data-[pressed]:ml-4",
                                    ),
                                }}
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-medium capitalize">{key} Notification</p>
                                </div>
                            </Switch>
                        )}
                    />
                ))}
                {hasChanges && (
                    <Button type="submit" className="text-green-950 bg-green-500 mt-5" radius="none">
                        Update Notifications
                    </Button>
                )}
            </div>
        </form>
    );
}
