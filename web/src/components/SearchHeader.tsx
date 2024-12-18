"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ChevronDown } from 'lucide-react'

interface SearchHeaderProps {
  onSearch: (filters: any) => void
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Your matches</h1>
        <p className="text-xl text-muted-foreground">
          Discover the best remote and work from home jobs at top remote companies that match your profile.
        </p>
      </div>

      <div className="rounded-lg bg-card shadow-sm border p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Job title or skill"
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Country or timezone"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">$0 - $50,000</SelectItem>
              <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
              <SelectItem value="100-150">$100,000 - $150,000</SelectItem>
              <SelectItem value="150+">$150,000+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startups</SelectItem>
              <SelectItem value="midsize">Mid-size</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Employee benefits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health">Health Insurance</SelectItem>
              <SelectItem value="dental">Dental Insurance</SelectItem>
              <SelectItem value="vision">Vision Insurance</SelectItem>
              <SelectItem value="401k">401(k)</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-background">
              <SelectValue placeholder="Markets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button variant="ghost">Clear</Button>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
