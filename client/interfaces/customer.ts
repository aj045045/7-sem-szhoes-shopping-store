import * as Yup from 'yup';

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

export const AddressValidationSchema = Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip code is required').matches(/^\d{5,8}$/, 'Zip code must be in number'),
    country: Yup.string().required('Country is required'),
});