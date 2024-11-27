export interface CustomerInterface {
    phoneNo: string;
    addressId: [];
    notification: Record<string, boolean>;
    updatedAt: string;
    lastLoggedInAt: string;
}

export interface AddressInterface {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}