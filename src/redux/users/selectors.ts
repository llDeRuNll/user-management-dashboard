import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "./types";

const normalize = (v: string) => v.toLowerCase().trim();

export const selectUsers = (s: RootState) => s.users.data;
export const selectStatus = (s: RootState) => s.users.status;
export const selectError = (s: RootState) => s.users.error;
export const selectFilters = (s: RootState) => s.users.filters;

export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters],
  (users, { name, username, email, phone }): User[] => {
    const nName = normalize(name);
    const nUsername = normalize(username);
    const nEmail = normalize(email);
    const nPhone = normalize(phone);

    if (!nName && !nUsername && !nEmail && !nPhone) {
      return users;
    }

    return users.filter(
      (u) =>
        (nName ? u.name.toLowerCase().includes(nName) : true) &&
        (nUsername ? u.username.toLowerCase().includes(nUsername) : true) &&
        (nEmail ? u.email.toLowerCase().includes(nEmail) : true) &&
        (nPhone ? u.phone.toLowerCase().includes(nPhone) : true)
    );
  }
);
