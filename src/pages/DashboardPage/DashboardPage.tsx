import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUsers } from "../../redux/users/slice";
import Filters from "../../components/Filters/Filters";
import UsersTable from "../../components/UsersTable/UsersTable";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <h1>User Management</h1>
      <Filters />
      <UsersTable />
    </>
  );
}
