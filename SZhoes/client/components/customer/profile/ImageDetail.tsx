import { FormatDate } from "@/components/utility/FormatData";
import { Avatar } from "@nextui-org/avatar";

/**
 * The Components that is used to display the user detail
 * 
 * @returns User Detail
 */
export function ImageDetail({ name, emailId, lastLoggedIn, updatedAt }: { name: string | undefined, emailId: any, lastLoggedIn: any, updatedAt: any }) {
    return (
        <div className="flex flex-row space-x-4 border-2 border-neutral-300 rounded-xl p-4 items-center" >
            <Avatar
                size="lg"
                as="button"
                classNames={{ base: "bg-gradient-to-tl from-lime-400 to-orange-400 ", name: "text-2xl md:text-4xl" }}
                name={name?.charAt(0)}
                className="transition-transform"
            />
            <div className="flex flex-col">
                <span className="lg:text-lg md:text-medium text-sm">{name}</span>
                <span className="lg:text-medium md:text-sm text-xs text-neutral-500">{emailId}</span>
                {lastLoggedIn && <span className="md:text-sm text-xs text-neutral-500 mt-2">Reviewed  on {FormatDate(lastLoggedIn)}</span>}
                {updatedAt && <span className="md:text-sm text-xs text-neutral-500 mt-2">Updated  on {FormatDate(updatedAt)}</span>}
            </div>
        </div>
    )
}
