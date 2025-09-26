import { useMemo, type ChangeEvent, type JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetFilters, setFilter } from "../../redux/users/slice";
import { selectFilters, selectUsers } from "../../redux/users/selectors";

function TextField({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none
                     transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
        />
      </div>
    </div>
  );
}

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const total = useAppSelector(selectUsers).length;

  const onChange =
    (key: "name" | "username" | "email" | "phone") =>
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setFilter({ key, value: e.target.value }));

  const activeCount = useMemo(
    () =>
      [filters.name, filters.username, filters.email, filters.phone].filter(
        Boolean
      ).length,
    [filters]
  );

  return (
    <section
      aria-label="Filters"
      className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur md:p-5"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-900">Filters</h2>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Total: {total}
          </span>
          {activeCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
              {activeCount} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:translate-y-[1px]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <TextField
          label="Name"
          placeholder="Filter by name…"
          value={filters.name}
          onChange={onChange("name")}
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <TextField
          label="Username"
          placeholder="Filter by username…"
          value={filters.username}
          onChange={onChange("username")}
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 7a4 4 0 1 1-4 4 4 4 0 0 1 4-4Zm7 13a7 7 0 1 0-14 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <TextField
          label="Email"
          placeholder="Filter by email…"
          value={filters.email}
          onChange={onChange("email")}
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16v12H4z M4 6l8 6 8-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <TextField
          label="Phone"
          placeholder="Filter by phone…"
          value={filters.phone}
          onChange={onChange("phone")}
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.61a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.56-1.09a2 2 0 0 1 2.11-.45c.84.24 1.71.42 2.61.54A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}
