import React from 'react'

import { Student } from "../../hooks/use-students";

export const MegaCenterReport = ({ data, megaCenterName }: { data: Student[]; megaCenterName: string }) => {
    return (
      <div className="p-4 border rounded-md bg-white shadow">
        <h2 className="text-xl font-bold mb-4">
          Report for Mega Center: {megaCenterName}
        </h2>
  
        <p>Total Students: {data.length}</p>
        <p>
          Completed: {data.filter((s) => s.progress === 100).length} | In Progress:{" "}
          {data.filter((s) => s.progress > 0 && s.progress < 100).length} | Not Started:{" "}
          {data.filter((s) => s.progress === 0).length}
        </p>
  
        <table className="table-auto w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Progress (%)</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.userId}>
                <td className="border px-2 py-1">
                  {student.firstName} {student.lastName}
                </td>
                <td className="border px-2 py-1">{student.email}</td>
                <td className="border px-2 py-1">{student.progress}</td>
                <td className="border px-2 py-1">
                  {student.progress === 100
                    ? "Completed"
                    : student.progress > 0
                    ? "In Progress"
                    : "Not Started"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  