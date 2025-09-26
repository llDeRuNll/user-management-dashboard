import { Suspense, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUsers } from "../../redux/users/slice";
import Filters from "../../components/Filters/Filters";
import UsersTable from "../../components/UsersTable/UsersTable";
import Loader from "../../components/Loader/Loader";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            User Management
          </span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Filter the directory by name, username, email, or phone. Results
          update instantly.
        </p>
      </header>

      <Suspense fallback={<Loader compact />}>
        <Filters />
      </Suspense>

      <Suspense fallback={<Loader compact />}>
        <UsersTable />
      </Suspense>
    </>
  );
}
