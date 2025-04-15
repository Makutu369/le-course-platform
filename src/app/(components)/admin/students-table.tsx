"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  XIcon,
  UsersIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
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
import { type Student, useStudents } from "../../hooks/use-students";

export default function StudentsTable() {
  const { students, isLoading } = useStudents({
    courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
  });
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (students) {
      let filtered = students;

      if (searchQuery.trim()) {
        filtered = students.filter(
          (student) =>
            student
              .firstName!.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            student
              .lastName!.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (statusFilter !== "all") {
        if (statusFilter === "completed") {
          filtered = filtered.filter((student) => student.courseCompleted);
        } else if (statusFilter === "in-progress") {
          filtered = filtered.filter(
            (student) => student.progress > 0 && student.progress < 100
          );
        } else if (statusFilter === "not-started") {
          filtered = filtered.filter((student) => student.progress === 0);
        }
      }

      setFilteredStudents(filtered);
      setPage(1);
    }
  }, [students, searchQuery, sortKey, sortOrder, statusFilter]);

  const totalPages = Math.ceil(filteredStudents.length / limit);
  const displayedStudents = filteredStudents.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="space-y-4">
      {/* Total Students Count */}
      <div className="flex items-center gap-2 mb-4">
        <UsersIcon className="h-5 w-5 text-muted-foreground" />
        <h6 className=" font-medium text-muted-foreground">
          Total Students: {students?.length || 0}
        </h6>
      </div>

      <div className="flex flex-col gap-x-6 lg:gap-x-[30%] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Filter students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8  w-full"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Filter:</p>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 ">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={String(limit)}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger className="h-8 ">
                <SelectValue placeholder="10" /> <p className="ml-1">items</p>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-nowrap text-muted-foreground">
              per page
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Student Name{" "}
                  {sortKey === "name" &&
                    (sortOrder === "asc" ? (
                      <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Email{" "}
                  {sortKey === "email" &&
                    (sortOrder === "asc" ? (
                      <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>Completed Sections</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Progress{" "}
                  {sortKey === "progress" &&
                    (sortOrder === "asc" ? (
                      <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : displayedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              displayedStudents.map((student, index) => (
                <TableRow key={index} className="">
                  <TableCell className="font-medium truncate">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.completedSections}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${
                            student.progress === 100
                              ? "bg-green-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.courseCompleted ? (
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

      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <Button
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="text-muted-foreground" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="text-muted-foreground" />
          </Button>
        </div>
        <span className="text-muted-foreground">
          Page {page} / {totalPages}
        </span>
      </div>
    </div>
  );
}
