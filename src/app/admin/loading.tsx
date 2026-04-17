export default function AdminLoading() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-10 w-64 bg-muted rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted rounded border-2 border-border" />
                ))}
            </div>
            <div className="h-96 bg-muted rounded border-2 border-border" />
        </div>
    );
}
