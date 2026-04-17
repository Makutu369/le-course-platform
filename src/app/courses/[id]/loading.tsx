export default function CoursePlayerLoading() {
    return (
        <div className="w-full h-[calc(100vh-64px)] flex flex-col">
            {/* Header Skeleton */}
            <div className="px-4 sm:px-6 lg:px-9 py-4 border-b-2 border-border bg-background">
                <div className="h-4 w-24 bg-muted animate-pulse rounded mb-1" />
                <div className="h-8 w-1/3 bg-muted animate-pulse rounded" />
            </div>

            <div className="flex-1 flex w-full flex-col lg:flex-row overflow-hidden">
                {/* Main Video Area Skeleton */}
                <div className="flex-1 bg-black/5 flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    </div>
                    <div className="p-4 bg-background border-t-2 border-border">
                        <div className="h-6 w-1/4 bg-muted animate-pulse rounded mb-2" />
                        <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="w-full lg:w-80 border-t-2 lg:border-t-0 lg:border-l-2 border-border bg-background flex flex-col">
                    <div className="p-4 border-b-2 border-border">
                        <div className="h-6 w-full bg-muted animate-pulse rounded" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-5 w-1/2 bg-muted animate-pulse rounded" />
                                <div className="space-y-1 pl-4">
                                    <div className="h-4 w-full bg-muted/50 animate-pulse rounded" />
                                    <div className="h-4 w-full bg-muted/50 animate-pulse rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
