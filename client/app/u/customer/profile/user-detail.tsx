import { useUserStore } from "@/store";
import { formatDateUtil } from "@/utility/other/format-date";
import { Avatar } from "@nextui-org/avatar";

interface ImageDetailPageProps {
    lastLoggedIn: string;
    updatedAt: string;
    phoneNo: string;
}

/**
 * The Components that is used to display the user detail
 * 
 * @returns User Detail
 */
export function ImageDetailPage({ lastLoggedIn, updatedAt, phoneNo }: ImageDetailPageProps) {
    const { email, name } = useUserStore();
    return (
        <div className="flex flex-row space-x-4 border-2 border-neutral-300 rounded-xl p-4 items-center" >
            <Avatar
                size="lg"
                as="button"
                classNames={{ base: "bg-gradient-to-tl from-lime-400 to-orange-400 ", name: "text-2xl md:text-4xl" }}
                name={name.charAt(0)}
                className="transition-transform"
            />
            <div className="flex flex-col">
                <span className="lg:text-lg md:text-medium text-sm">{name}</span>
                {phoneNo && <span className="lg:text-medium md:text-sm text-xs text-neutral-500">{phoneNo}</span>}
                <span className="lg:text-medium md:text-sm text-xs text-neutral-500">{email}</span>
                {lastLoggedIn && <span className="md:text-sm text-xs text-neutral-500 mt-2">Reviewed  on {formatDateUtil(lastLoggedIn)}</span>}
                {updatedAt != lastLoggedIn && <span className="md:text-sm text-xs text-neutral-500 mt-2">Updated  on {formatDateUtil(updatedAt)}</span>}
            </div>
        </div>
    )
}
