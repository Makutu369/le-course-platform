"use client"

import { useState, useEffect } from "react"
import { SearchIcon, ArrowUpIcon, ArrowDownIcon, CheckIcon, XIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { type Student, useStudents } from "../../hooks/use-students"

export default function StudentsTable({ courseId }: { courseId: string }) {
  const { students, isLoading } = useStudents({ courseId })
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortKey] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (students) {
      let filtered = students

     
      if (searchQuery.trim()) {
        filtered = students.filter(
          (student) =>
            student.firstName!.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.lastName!.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

     
      if (statusFilter !== "all") {
        if (statusFilter === "completed") {
          filtered = filtered.filter((student) => student.completed)
        } else if (statusFilter === "in-progress") {
          filtered = filtered.filter((student) => student.progress > 0 && student.progress < 100)
        } else if (statusFilter === "not-started") {
          filtered = filtered.filter((student) => student.progress === 0)
        }
      }

      setFilteredStudents(filtered)
      setPage(1)
    }
  }, [students, searchQuery, sortKey, sortOrder, statusFilter])

  const totalPages = Math.ceil(filteredStudents.length / limit)
  const displayedStudents = filteredStudents.slice((page - 1) * limit, page * limit)

  return (
    <div className="space-y-4">
      {/* Total Students Count */}
      <div className="flex items-center gap-2 mb-4">
        <UsersIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Total Students: {students?.length || 0}</h3>
        {statusFilter !== "all" && (
          <Badge className="ml-2">
            Showing:{" "}
            {statusFilter === "completed"
              ? "Completed"
              : statusFilter === "in-progress"
                ? "In Progress"
                : "Not Started"}
          </Badge>
        )}
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
        <div className="flex flex-wrap items-center gap-2">
         
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
          className={statusFilter === "completed" ? "" : "border-green-200 text-green-700 hover:bg-green-50"}
          onClick={() => setStatusFilter("completed")}
        >
          <CheckIcon className="mr-1 h-4 w-4" />
          Completed ({students?.filter((s) => s.completed).length || 0})
        </Button>
        <Button
          variant={statusFilter === "in-progress" ? "default" : "outline"}
          size="sm"
          className={statusFilter === "in-progress" ? "" : "border-yellow-200 text-yellow-700 hover:bg-yellow-50"}
          onClick={() => setStatusFilter("in-progress")}
        >
          In Progress ({students?.filter((s) => s.progress > 0 && s.progress < 100).length || 0})
        </Button>
        <Button
          variant={statusFilter === "not-started" ? "default" : "outline"}
          size="sm"
          className={statusFilter === "not-started" ? "" : "border-gray-200 text-gray-700 hover:bg-gray-50"}
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
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.completedSections}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${student.progress === 100 ? "bg-green-500" : "bg-primary"}`}
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
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}

