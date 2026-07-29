import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export function createApiThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>,
) {
  return createAsyncThunk<Returned, ThunkArg, { rejectValue: string }>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data.message ?? "Something went wrong",
          );
        }

        return rejectWithValue("Something went wrong");
      }
    },
  );
}
