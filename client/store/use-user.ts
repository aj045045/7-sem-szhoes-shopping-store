import { UserActions, UserState } from '@/interfaces/store-user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || "secret_key";

const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const useUserStore = create<UserState & UserActions>()(
    persist(
        (set, get) => ({
            cart: {},
            email: '',
            id: '',
            name: '',

            login: (userData: UserState) => set((state) => ({
                cart: userData.cart || state.cart,
                email: userData.email || state.email,
                id: encryptData(userData.id) || state.id,
                name: userData.name || state.name,
            })),

            logOut: () => {
                localStorage.removeItem('token');
                set(() => ({
                    cart: {},
                    email: '',
                    id: '',
                    name: '',
                }));
            },

            loadUserId: () => {
                const encryptedId = get().id;
                if (encryptedId) {
                    return decryptData(encryptedId);
                }
                return '';
            },

        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
