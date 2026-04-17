import { Card, CardContent } from "@/components/ui/card";

export default function CoursesLoading() {
    return (
        <div className="min-h-screen flex flex-col gap-y-10 px-4 sm:px-6 lg:px-12 w-full bg-background py-12">
            <div className="w-full flex flex-col gap-3 pb-8 border-b-2 border-border">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-64 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full max-w-2xl bg-muted animate-pulse rounded" />
            </div>
            <div className="flex-1">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden border-2 border-border/50">
                            <div className="aspect-[16/10] bg-muted animate-pulse" />
                            <CardContent className="p-6 space-y-4">
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                                </div>
                                <div className="pt-4 border-t-2 border-border flex justify-between items-center">
                                    <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
