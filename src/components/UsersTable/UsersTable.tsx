import { useAppSelector } from "../../redux/hooks";
import {
  selectError,
  selectFilteredUsers,
  selectStatus,
} from "../../redux/users/selectors";
import Loader from "../Loader/Loader";

export default function UsersTable() {
  const users = useAppSelector(selectFilteredUsers);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500" />
          <Loader />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
        Error: {error}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
        No users match your filters.
      </div>
    );
  }

  return (
    <section
      aria-label="Users"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h3 className="text-base font-semibold text-slate-900">Users</h3>
        <p className="text-xs text-slate-500">Showing {users.length} results</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {["Name", "Username", "Email", "Phone"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="sticky top-0 z-10 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 transition">
                <td className="px-5 py-3 text-sm text-slate-900">{u.name}</td>
                <td className="px-5 py-3 text-sm text-slate-700">
                  {u.username}
                </td>
                <td className="px-5 py-3 text-sm text-slate-700">{u.email}</td>
                <td className="px-5 py-3 text-sm text-slate-700">{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
