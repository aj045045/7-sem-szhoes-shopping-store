import * as Yup from 'yup';

export interface CustomerInterface {
    _id: string;
    phoneNo: string;
    addresses: AddressInterface[];
    notification: Record<string, boolean>;
    updatedAt: string;
    lastLoggedInAt: string;
}

export interface AddressInterface {
    _id?: string
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

export interface CustomerProfileInterface {
    phoneNo: string;
    name: string;
}

export const CustomerProfileValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "Name must be at least 5 characters")
        .max(30, "Name must be at most 30 characters")
        .required("Name is required").default(""),
    phoneNo: Yup.string().min(0).max(13).default('0')
});