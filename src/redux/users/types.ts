export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UsersState {
  data: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;

  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}
