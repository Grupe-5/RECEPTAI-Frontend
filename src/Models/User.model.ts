// user model
export interface IUser {
    userName: string;
    email: string;
    token: string;
}

export interface IUser_Info {
    id: number;
    userName: string;
    joinDate: Date;
    imageId?: number;
    karmaScore: number;
}