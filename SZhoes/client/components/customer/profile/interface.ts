/**
 * The interface that is used for form validators
 * 
 * @field handleInputChange - The input handler
 * @field formData - The form Data
 * @field validationErrors - The regex validator
 */
export interface PersonalInformationInterface {
    handleInputChange?: any,
    formData: any,
    validationErrors?: any,
    setFormData?: any,
    handleSubmit?:any,
}

export interface UserProfile {
    notification: Notification;
    createdAt: string;
    wishlist: {};
    lastLoggedInAt: string;
    name: string;
    loggedInAt: string;
    id: string;
    email: string;
    phoneNo: null;
    cart: {};
    addressId: any[];
    updatedAt: null;
}


interface Notification {
    delivery: boolean;
    review: boolean;
    promotional: boolean;
    return: boolean;
    order: boolean;
}

export interface AddressInterface{
    street:string;
    city:string;
    state:string;
    zip:string;
    country:string;
}