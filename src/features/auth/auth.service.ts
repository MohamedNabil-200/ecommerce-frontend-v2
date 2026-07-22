import { api } from "../../api/axios";
import type { ApiResponse } from "../../api/api.types";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "./auth.types";

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    data,
  );

  return response.data.data;
};

const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<ApiResponse<User>>("/auth/register", data);

  return response.data.data;
};

export const authService = {
  login,
  register,
};
