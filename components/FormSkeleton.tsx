// B9 loading state: a skeleton shaped like the walkthrough form, shown while it hydrates.
export function FormSkeleton() {
  const bar = "animate-pulse rounded-xl bg-mist";
  return (
    <div aria-busy="true" aria-label="Loading the request form" className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <div className={`${bar} h-4 w-24`} />
            <div className={`${bar} mt-2 h-12`} />
          </div>
        ))}
      </div>
      <div className={`${bar} h-4 w-40`} />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`${bar} h-11 w-24 rounded-full`} />
        ))}
      </div>
      <div className={`${bar} h-28`} />
      <div className={`${bar} ml-auto h-11 w-48`} />
    </div>
  );
}
