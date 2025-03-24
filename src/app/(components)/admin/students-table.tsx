"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpDown,
  SearchIcon,
} from "lucide-react";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStudents } from "../../hooks/use-students";

export default function StudentsTable({ courseId }: { courseId: string }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "name";
  const order = searchParams.get("order") || "asc";
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState("");
  const { students, isLoading,totalStudents } = useStudents({
    page,
    sort,
    order,
    filter,
    limit,
    courseId,
  });

  const totalPages = Math.ceil(totalStudents / limit);
  

  const getSortIcon = (columnName: string) => {
    if (sort !== columnName) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return order === "asc" ? (
      <ArrowUpIcon className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDownIcon className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter students..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Show</p>
          <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">per page</p>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button variant="ghost" className="p-0 font-medium">
                  Student Name {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium">
                  Email {getSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead>Completed Sections</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium">
                  Progress {getSortIcon("progress")}
                </Button>
              </TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-5 w-full animate-pulse rounded bg-muted"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {student.firstName
                      ? `${student.firstName} ${student.lastName || ""}`
                      : ""}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>

                  <TableCell>{student.completedSections}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {student.completed ? (
                      <CheckIcon className="text-green-500 h-5 w-5" />
                    ) : (
                      <XIcon className="text-red-500 h-5 w-5" />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", String(page - 1));
          window.history.pushState(null, "", `?${params.toString()}`);
          window.location.reload();
        }}>
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", String(page + 1));
          window.history.pushState(null, "", `?${params.toString()}`);
          window.location.reload();
        }}>
          Next
        </Button>
      </div>
    </div>
  );
}
