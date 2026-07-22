import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./auth.service";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "./auth.types";
import { authStorage } from "./auth.storage";

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await authService.login(data);
    try {
      authStorage.saveAuth(response);
    } catch (error) {
      console.error(error);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Something went wrong",
      );
    }

    return rejectWithValue("Something went wrong");
  }
});

export const registerThunk = createAsyncThunk<User, RegisterRequest>(
  "/auth/register",
  async (data) => {
    return await authService.register(data);
  },
);
