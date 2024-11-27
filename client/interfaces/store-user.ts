export interface UserState {
    cart: Record<string, string>;
    email: string;
    id: string;
    name: string;
}


export interface UserActions {
    login: (userData: UserState) => void;
    logOut: () => void;
    loadUserId: () => string;
}