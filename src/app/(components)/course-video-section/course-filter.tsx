"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { CourseCategory } from "../../../lib/types/course-catalogue"

interface CourseFilterProps {
  categories: CourseCategory[]
  onFilterChange: (filters: { search: string; category: string; level: string }) => void
}

export function CourseFilter({ categories, onFilterChange }: CourseFilterProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, category, level })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    onFilterChange({ search, category: e.target.value, level })
  }

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value)
    onFilterChange({ search, category, level: e.target.value })
  }

  const handleReset = () => {
    setSearch("")
    setCategory("")
    setLevel("")
    onFilterChange({ search: "", category: "", level: "" })
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-9 border-2 border-gray-200 outline-none focus:outline-gray-200 focus:border-none bg-white"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center border-gray-200 bg-white border-2 gap-2 sm:w-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter size={16} />
          <span>Filter</span>
        </Button>
      </div>

      {isFilterOpen && (
        <div className="grid gap-4 rounded-lg border border-slate-100 bg-white p-4 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="category"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="level" className="mb-1 block text-sm font-medium text-slate-700">
              Level
            </label>
            <select
              id="level"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              value={level}
              onChange={handleLevelChange}
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button variant="ghost" className="text-slate-600" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

