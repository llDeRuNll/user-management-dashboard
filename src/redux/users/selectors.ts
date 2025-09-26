import type { RootState } from "../store";
import type { User } from "./types";

const normalize = (v: string) => v.toLowerCase().trim();

export const selectUsers = (s: RootState) => s.users.data;
export const selectStatus = (s: RootState) => s.users.status;
export const selectError = (s: RootState) => s.users.error;
export const selectFilters = (s: RootState) => s.users.filters;

export const selectFilteredUsers = (s: RootState): User[] => {
  const users = selectUsers(s);
  const { name, username, email, phone } = selectFilters(s);

  const nName = normalize(name);
  const nUsername = normalize(username);
  const nEmail = normalize(email);
  const nPhone = normalize(phone);

  return users.filter(
    (u) =>
      (nName ? u.name.toLowerCase().includes(nName) : true) &&
      (nUsername ? u.username.toLowerCase().includes(nUsername) : true) &&
      (nEmail ? u.email.toLowerCase().includes(nEmail) : true) &&
      (nPhone ? u.phone.toLowerCase().includes(nPhone) : true)
  );
};
