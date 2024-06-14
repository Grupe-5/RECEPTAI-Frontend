// user model
export interface IUser {
  userName: string;
  email: string;
  token: string;
}

export class IUser_Info {
  id: number;
  username: string;
  joinDate: Date;
  imageId: number;
  karmaScore: number;
}
