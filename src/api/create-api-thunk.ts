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
          const message = error.response?.data.message;
          return rejectWithValue(
            typeof message === "string" ? message : "Something went wrong",
          );
        }

        return rejectWithValue("Something went wrong");
      }
    },
  );
}
