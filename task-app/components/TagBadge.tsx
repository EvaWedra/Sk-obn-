export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap">
      #{tag}
    </span>
  );
}
