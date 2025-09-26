import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetFilters, setFilter } from "../../redux/users/slice";
import { selectFilters, selectUsers } from "../../redux/users/selectors";

import type { ChangeEvent } from "react";

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const total = useAppSelector(selectUsers).length;

  const onChange =
    (key: "name" | "username" | "email" | "phone") =>
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setFilter({ key, value: e.target.value }));

  return (
    <section aria-label="Filters">
      <h2>Filters</h2>

      <label>
        Name
        <input
          placeholder="Filter by name…"
          value={filters.name}
          onChange={onChange("name")}
        />
      </label>

      <label>
        Username
        <input
          placeholder="Filter by username…"
          value={filters.username}
          onChange={onChange("username")}
        />
      </label>

      <label>
        Email
        <input
          placeholder="Filter by email…"
          value={filters.email}
          onChange={onChange("email")}
        />
      </label>

      <label>
        Phone
        <input
          placeholder="Filter by phone…"
          value={filters.phone}
          onChange={onChange("phone")}
        />
      </label>

      <div>
        <span>Total: {total}</span>
        <button type="button" onClick={() => dispatch(resetFilters())}>
          Reset
        </button>
      </div>
    </section>
  );
}
