export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
  }
  
  export interface RootState {
    users: User[];
    filters: {
      name: string;
      username: string;
      email: string;
      phone: string;
    };
  }