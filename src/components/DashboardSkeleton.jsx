import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold capitalize">Welcome,</h1>
        <p className="md:mt-2 text-sm">
          Here&apos;s an overview of your account and the latest crypto currency
          prices.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10 mt-3">
        {[...Array(18)].map((_, index) => (
          <div
            key={index}
            className={`relative overflow-hidden md:col-start-[${
              index + 1
            }] md:col-end-[${
              index + 3
            }] bg-muted/50 flex gap-6 min-w-[200px] items-center p-4 rounded-sm]`}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="h-10 w-10 grid place-content-center">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 font-bold mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </>
  );
}

export default DashboardSkeleton;
