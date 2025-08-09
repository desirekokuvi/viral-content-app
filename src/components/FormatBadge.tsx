import { clsx } from "clsx";
export default function FormatBadge({ label, type }: { label: string; type: "primary"|"secondary"|"backup" }) {
  const color = type === "primary" ? "bg-indigo-600" : type === "secondary" ? "bg-emerald-600" : "bg-amber-600";
  return <span className={[ "px-2 py-1 rounded-full text-white text-xs", color ].join(" ")}>{label}</span>;
}
