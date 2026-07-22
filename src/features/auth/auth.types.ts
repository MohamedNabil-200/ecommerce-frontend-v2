export const User_Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof User_Role)[keyof typeof User_Role];

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type AuthState = {
  user: User | null;
  token: string | null;

  login: {
    loading: boolean;
    error: string | null;
  };

  register: {
    loading: boolean;
    error: string | null;
  };
};
