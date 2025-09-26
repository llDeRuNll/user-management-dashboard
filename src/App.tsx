import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardPage />
    </Suspense>
  );
}
