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

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;
  if (users.length === 0) return <p>No users match your filters.</p>;

  return (
    <section aria-label="Users table">
      <table>
        <caption>Users</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
