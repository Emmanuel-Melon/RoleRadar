'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react'

export function CandidateFilters() {
  return (
    <div className="w-full px-4 py-6 space-y-6 bg-gray-50">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Candidate matches</h1>
        <p className="text-sm text-muted-foreground">
          Discover talented candidates that match your company&apos;s requirements.
        </p>
      </div>

      <div className="rounded-lg bg-card shadow-sm border p-4 space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Skills or role"
              className="pl-9"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location or timezone"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Select>
            <SelectTrigger className="w-full bg-background">
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
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="2-weeks">2 weeks notice</SelectItem>
              <SelectItem value="month">1 month notice</SelectItem>
              <SelectItem value="passive">Passive</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">$0 - $50,000</SelectItem>
              <SelectItem value="50-100">$50,000 - $100,000</SelectItem>
              <SelectItem value="100-150">$100,000 - $150,000</SelectItem>
              <SelectItem value="150+">$150,000+</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col gap-2 w-full mt-2">
            <Button>Search</Button>
            <Button variant="ghost">Clear</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

