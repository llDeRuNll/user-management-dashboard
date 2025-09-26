import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { UsersState, User } from "./types";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchAll",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    const json = (await res.json()) as User[];
    return json.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone,
    }));
  }
);

const initialState: UsersState = {
  data: [],
  status: "idle",
  filters: { name: "", username: "", email: "", phone: "" },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{ key: keyof UsersState["filters"]; value: string }>
    ) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters = { name: "", username: "", email: "", phone: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});
export const { setFilter, resetFilters } = usersSlice.actions;
export default usersSlice.reducer;
