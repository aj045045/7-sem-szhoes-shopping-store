/**
 * The Payment Detail Component
 * 
 * @returns The Payment type and the Delivery Address
 */
export function PaymentDetail() {
    return (
        <div className="grid md:grid-flow-row md:grid-cols-2 md:grid-rows-1 grid-flow-col grid-cols-1 grid-rows-2 w-full">
            <div className="space-y-5">
                <div className="text-lg font-semibold">Payment</div>
                <div className="text-neutral-500">Cash On Delivery</div>
            </div>
            <div className="space-y-5">
                <div className="text-lg font-semibold">Delivery Address</div>
                <div className="text-neutral-500 space-y-2">
                    <div>56778 Raynor Streets,</div>
                    <div>East Ocieton,</div>
                    <div>North Dakota,</div>
                    <div>Grenada</div>
                    <div>11932-5340</div>
                </div>
            </div>
        </div>
    )
}