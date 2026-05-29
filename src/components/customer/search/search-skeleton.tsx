export default function SearchSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border-bg-light overflow-hidden rounded-xl border bg-[#1A252B] shadow-md"
        >
          <div className="aspect-4/3 w-full animate-pulse bg-[#0F1922]" />
          <div className="space-y-2 p-3">
            <div className="h-3.5 w-full animate-pulse rounded bg-[#0F1922]" />
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#0F1922]" />
            <div className="flex justify-between pt-2">
              <div className="h-4 w-20 animate-pulse rounded bg-[#0F1922]" />
              <div className="h-3 w-10 animate-pulse rounded bg-[#0F1922]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
