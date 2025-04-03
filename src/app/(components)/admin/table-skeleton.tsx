import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-[250px] animate-pulse rounded bg-muted"></div>
        <div className="h-8 w-[180px] animate-pulse rounded bg-muted"></div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
              <TableHead>
                <div className="h-5 w-24 animate-pulse rounded bg-muted"></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-5 w-full animate-pulse rounded bg-muted"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

