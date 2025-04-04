"use client";

import { useState, useEffect } from "react";
import { SearchIcon, ArrowUpIcon, ArrowDownIcon, CheckIcon, XIcon } from "lucide-react";
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
import { Student, useStudents } from "../../hooks/use-students";

export default function StudentsTable({ courseId }: { courseId: string }) {
  const { students, isLoading } = useStudents({ courseId });
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (students) {
      let filtered = students;

      
      if (searchQuery.trim()) {
        filtered = students.filter((student) =>
          student.firstName!.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.lastName!.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

    

      setFilteredStudents(filtered);
      setPage(1); 
    }
  }, [students, searchQuery, sortKey, sortOrder]);

 
  const totalPages = Math.ceil(filteredStudents.length / limit);
  const displayedStudents = filteredStudents.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-4">
  
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  Student Name {sortKey === "name" && (sortOrder === "asc" ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  Email {sortKey === "email" && (sortOrder === "asc" ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>Completed Sections</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() =>  setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  Progress {sortKey === "progress" && (sortOrder === "asc" ? <ArrowUpIcon className="ml-2 h-4 w-4" /> : <ArrowDownIcon className="ml-2 h-4 w-4" />)}
                </Button>
              </TableHead>
              <TableHead>Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : displayedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No students found.</TableCell>
              </TableRow>
            ) : (
              displayedStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{student.firstName} {student.lastName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.completedSections}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.completed ? <CheckIcon className="text-green-500 h-5 w-5" /> : <XIcon className="text-red-500 h-5 w-5" />}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <span>Page {page} of {totalPages}</span>
        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
