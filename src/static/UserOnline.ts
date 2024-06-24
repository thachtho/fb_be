export interface IUsersOnline {
    socketId: string;
    phone: string;
  }
  
  export class UsersOnline {
    static usersOnline: IUsersOnline[] = [];
  }
  