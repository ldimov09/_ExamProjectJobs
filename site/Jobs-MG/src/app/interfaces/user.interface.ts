export interface IUser {
    _id?: string;
    displayName: string;
    password: string;
    email: string;
    imageIndex: string;
    gender: string;
    applications?: string[];
    favorites?: string[];
}