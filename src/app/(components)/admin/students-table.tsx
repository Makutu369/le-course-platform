"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  XIcon,
  UsersIcon,
  Printer,
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
import { Badge } from "@/components/ui/badge";

import { type Student } from "../../hooks/use-students";
import { getAllMegaCenters } from "@/lib/queries/queries";
import { findUsersCourse } from "@/lib/queries/queries";
import { ActionMenu } from "./(components)/action-menu";
import { use } from "react";
// Main StudentsTable Component
interface StudentsTableProps {
  fetchStudents: Promise<Student[]>;
  courseId: string;
}
export default function StudentsTable({
  fetchStudents,
  courseId,
}: StudentsTableProps) {
  const students = use(fetchStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMegaCenter, setSelectedMegaCenter] = useState<string>("all");
  const [megaCenter, setMegaCenter] = useState<string[]>([]);
  const printSectionRef = useRef<HTMLDivElement | null>(null);
  const [course, setCourse] = useState<{ title: string } | null>(null);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
    findUsersCourse(courseId).then((data) => {
      if (data?.course) {
        setCourse({ title: data.course.title });
      }
    });
  }, [courseId]);


  const handlePrint = () => {
    if (printSectionRef.current) {
      // Use browser's print functionality instead of printJS
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Student Progress Report</title>"
        );
        printWindow.document.write("<style>");
        printWindow.document.write(`
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .header { text-align: center; margin-bottom: 20px; }
          .section-header { margin-top: 30px; margin-bottom: 10px; font-size: 18px; font-weight: bold; }
          .status-count { margin-bottom: 10px; font-size: 16px; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          .no-data { text-align: center; font-style: italic; padding: 10px; }
        `);
        printWindow.document.write("</style></head><body>");
        printWindow.document.write(printSectionRef.current.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  useEffect(() => {
    getAllMegaCenters().then((data) => {
      const megaCenters = data.map((center) => center.name);
      setMegaCenter(megaCenters);
    });

    if (students) {
      let filtered = students;

      if (searchQuery.trim()) {
        filtered = students.filter(
          (student) =>
            student.firstName
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            student.lastName
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (statusFilter !== "all") {
        if (statusFilter === "completed") {
          filtered = filtered.filter((student) => student.progress === 100);
        } else if (statusFilter === "in-progress") {
          filtered = filtered.filter(
            (student) => student.progress > 0 && student.progress < 100
          );
        } else if (statusFilter === "not-started") {
          filtered = filtered.filter((student) => student.progress === 0);
        }
      }

      if (selectedMegaCenter !== "all") {
        filtered = filtered.filter(
          (student) =>
            student.megaCenterName?.toLowerCase() ===
            selectedMegaCenter.toLowerCase()
        );
      }

      filtered = [...filtered].sort((a, b) => {
        if (sortKey === "name") {
          const nameA = `${a.firstName || ""} ${
            a.lastName || ""
          }`.toLowerCase();
          const nameB = `${b.firstName || ""} ${
            b.lastName || ""
          }`.toLowerCase();
          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        } else if (sortKey === "email") {
          return sortOrder === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        } else if (sortKey === "progress") {
          return sortOrder === "asc"
            ? a.progress - b.progress
            : b.progress - a.progress;
        }
        return 0;
      });

      setFilteredStudents(filtered);
      setPage(1);

    }
  }, [
    students,
    searchQuery,
    sortKey,
    sortOrder,
    statusFilter,
    selectedMegaCenter,
  ]);

  const totalPages = Math.ceil(filteredStudents.length / limit);
  const displayedStudents = filteredStudents.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };


  // Group students by status for the print view
  const getStudentsByStatus = () => {
    if (!students) return { completed: [], inProgress: [], notStarted: [] };

    return {
      completed: students.filter(
        (student) =>
          (selectedMegaCenter === "all" ||
            student.megaCenterName?.toLowerCase() ===
              selectedMegaCenter.toLowerCase()) &&
          student.progress === 100
      ),
      inProgress: students.filter(
        (student) =>
          (selectedMegaCenter === "all" ||
            student.megaCenterName?.toLowerCase() ===
              selectedMegaCenter.toLowerCase()) &&
          student.progress > 0 &&
          student.progress < 100
      ),
      notStarted: students.filter(
        (student) =>
          (selectedMegaCenter === "all" ||
            student.megaCenterName?.toLowerCase() ===
              selectedMegaCenter.toLowerCase()) &&
          student.progress === 0
      ),
    };
  };

  const studentsByStatus = getStudentsByStatus();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            Total Students: {students?.length || 0}
          </h3>
          {statusFilter !== "all" && (
            <Badge className="ml-2">
              {statusFilter === "completed"
                ? "Completed"
                : statusFilter === "in-progress"
                ? "In Progress"
                : "Not Started"}
            </Badge>
          )}
          {selectedMegaCenter !== "all" && (
            <Badge variant="outline" className="ml-2">
              MC: {selectedMegaCenter}
            </Badge>
          )}
        </div>

        <Button className="flex items-center gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Download Report
        </Button>
      </div>

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
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">MC:</p>
            <Select
              value={selectedMegaCenter}
              onValueChange={setSelectedMegaCenter}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="All MCs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {megaCenter.map((center, index) => (
                  <SelectItem key={index} value={center}>
                    {center}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Status:</p>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-[130px]">
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
            <p className="text-sm text-muted-foreground">Show</p>
            <Select
              value={String(limit)}
              onValueChange={(value) => setLimit(Number(value))}
            >
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
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          All Students ({students?.length || 0})
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          size="sm"
          className={
            statusFilter === "completed"
              ? ""
              : "border-green-200 text-green-700 hover:bg-green-50"
          }
          onClick={() => setStatusFilter("completed")}
        >
          <CheckIcon className="mr-1 h-4 w-4" />
          Completed ({students?.filter((s) => s.progress === 100).length || 0})
        </Button>
        <Button
          variant={statusFilter === "in-progress" ? "default" : "outline"}
          size="sm"
          className={
            statusFilter === "in-progress"
              ? ""
              : "border-yellow-200 text-yellow-700 hover:bg-yellow-50"
          }
          onClick={() => setStatusFilter("in-progress")}
        >
          In Progress (
          {students?.filter((s) => s.progress > 0 && s.progress < 100).length ||
            0}
          )
        </Button>
        <Button
          variant={statusFilter === "not-started" ? "default" : "outline"}
          size="sm"
          className={
            statusFilter === "not-started"
              ? ""
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }
          onClick={() => setStatusFilter("not-started")}
        >
          Not Started ({students?.filter((s) => s.progress === 0).length || 0})
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => handleSort("name")}
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
                  onClick={() => handleSort("email")}
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
              <TableHead>Mega Center</TableHead>
              <TableHead>Completed Sections</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="p-0 font-medium"
                  onClick={() => handleSort("progress")}
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.megaCenterName || "N/A"}</TableCell>
                <TableCell>{student.completedSections || 0}</TableCell>
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
                  {student.progress === 100 ? (
                    <CheckIcon className="text-green-500 h-5 w-5" />
                  ) : (
                    <XIcon className="text-red-500 h-5 w-5" />
                  )}
                </TableCell>
                <TableCell>
                  <ActionMenu userId={student.userId} courseId={courseId} />
                </TableCell>
              </TableRow>

            ))}

            ) : (
              displayedStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.megaCenterName || "N/A"}</TableCell>
                  <TableCell>{student.completedSections || 0}</TableCell>
                  <TableCell>{student.contactNumber || "N/A"}</TableCell>
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
                    {student.progress === 100 ? (
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
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* Print template - hidden but accessible via ref */}
      <div className="hidden">
        <div ref={printSectionRef}>
          <div className="p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">
                Student Progress Report
              </h1>
              <h4>Current Course: {course?.title || "N/A"}</h4>
              <p className="text-gray-500">Generated on {today}</p>
              {selectedMegaCenter !== "all" && (
                <p className="text-gray-500">
                  Mega Center: {selectedMegaCenter}
                </p>
              )}
              <p className="text-gray-500">
                Total Students:{" "}
                {(selectedMegaCenter === "all"
                  ? students?.length
                  : students?.filter(
                      (s) =>
                        s.megaCenterName?.toLowerCase() ===
                        selectedMegaCenter.toLowerCase()
                    ).length) || 0}
              </p>
            </div>

            {/* COMPLETED STUDENTS TABLE */}
            <div className="section-header">Completed Students</div>
            <div className="status-count">
              Total: {studentsByStatus.completed.length}
            </div>

            {studentsByStatus.completed.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Student Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Mega Center</th>
                    <th className="border px-4 py-2 text-left">
                      Completed Sections
                    </th>
                    <th className="border px-4 py-2 text-left">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsByStatus.completed.map((student, index) => (
                    <tr
                      key={`completed-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="border px-4 py-2">{student.email}</td>
                      <td className="border px-4 py-2">
                        {student.megaCenterName || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {student.completedSections || 0}
                      </td>
                      <td className="border px-4 py-2">{student.progress}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No completed students found</div>
            )}

            {/* IN PROGRESS STUDENTS TABLE */}
            <div className="section-header">In Progress Students</div>
            <div className="status-count">
              Total: {studentsByStatus.inProgress.length}
            </div>

            {studentsByStatus.inProgress.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Student Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Mega Center</th>
                    <th className="border px-4 py-2 text-left">
                      Completed Sections
                    </th>
                    <th className="border px-4 py-2 text-left">Progress</th>

                    <th className="">Contact number</th>

                  </tr>
                </thead>
                <tbody>
                  {studentsByStatus.inProgress.map((student, index) => (
                    <tr
                      key={`in-progress-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="border px-4 py-2">{student.email}</td>
                      <td className="border px-4 py-2">
                        {student.megaCenterName || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {student.completedSections || 0}
                      </td>
                      <td className="border px-4 py-2">{student.progress}%</td>

                      <td className="">{student.contactNumber}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No in-progress students found</div>
            )}

            {/* NOT STARTED STUDENTS TABLE */}
            <div className="section-header">Not Started Students</div>
            <div className="status-count">
              Total: {studentsByStatus.notStarted.length}
            </div>

            {studentsByStatus.notStarted.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Student Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Mega Center</th>
                    <th className="border px-4 py-2 text-left">
                      Completed Sections
                    </th>
                    <th className="border px-4 py-2 text-left">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsByStatus.notStarted.map((student, index) => (
                    <tr
                      key={`not-started-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="border px-4 py-2">{student.email}</td>
                      <td className="border px-4 py-2">
                        {student.megaCenterName || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {student.completedSections || 0}
                      </td>
                      <td className="border px-4 py-2">{student.progress}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No not-started students found</div>
            )}

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                This report contains confidential information. Please handle
                accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
