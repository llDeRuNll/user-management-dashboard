import { ScaleLoader } from "react-spinners";
type Props = { compact?: boolean };

export default function Loader({ compact }: Props) {
  return (
    <div
      className={
        "flex items-center justify-center " + (compact ? "py-6" : "py-12")
      }
      role="status"
      aria-live="polite"
    >
      <ScaleLoader />
    </div>
  );
}
