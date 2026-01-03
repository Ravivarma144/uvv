type Props = {
  title: string;
  value: number;
  accent?: "blue" | "green" | "purple" | "gray";
  className?: string;
};

const accentMap = {
  blue: "border-blue-500 text-blue-600",
  green: "border-green-500 text-green-600",
  purple: "border-purple-500 text-purple-600",
  gray: "border-gray-400 text-gray-700"
};

export default function StatCard({
  title,
  value,
  accent = "gray",
  className = ""
}: Props) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-sm
        border-l-4
        ${accentMap[accent]}
        p-6
        min-h-[110px]
        flex
        flex-col
        justify-between
        ${className}
      `}
    >
      <p className="text-sm font-medium text-gray-500 leading-tight">
        {title}
      </p>

      <div className="text-3xl font-bold tracking-tight">
        {value}
      </div>
    </div>
  );
}
