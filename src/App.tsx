import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-dvh bg-slate-50 text-slate-800">
        <main className="container max-w-6xl px-4 py-8">
          <DashboardPage />
        </main>
      </div>
    </Suspense>
  );
}
