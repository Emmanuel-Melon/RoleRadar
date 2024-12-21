'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, X } from 'lucide-react'
import { useCreateJob } from "@/hooks/useJobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Company {
  id: string
  name: string
}

interface JobFormData {
  title: string
  description: string
  location: string
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP'
  salary?: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  skills: string[]
  companyId: string
}

// Mock data for companies (replace with actual data fetching in a real application)
const companies: Company[] = [
  { id: '1', name: 'TechCorp Inc.' },
  { id: '2', name: 'InnoSoft Solutions' },
  { id: '3', name: 'DataDrive Systems' },
]

export default function NewJobPage() {
  const router = useRouter()
  const createJob = useCreateJob()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState('')
  const [newRequirement, setNewRequirement] = useState('')

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    location: "",
    type: 'FULL_TIME',
    salary: {
      min: 40000,
      max: 80000,
      currency: 'USD'
    },
    requirements: [],
    skills: [],
    companyId: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSalaryChange = (field: 'min' | 'max', value: string) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary!,
        [field]: parseInt(value) || 0
      }
    }))
  }

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault()
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleAddRequirement = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newRequirement.trim()) {
      e.preventDefault()
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }))
      setNewRequirement('')
    }
  }

  const handleRemoveRequirement = (reqToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== reqToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    if (!formData.companyId) {
      setErrorMessage("Please select a company")
      setIsSubmitting(false)
      return
    }

    try {
      await createJob.mutateAsync({
        ...formData,
        // @ts-ignore
        status: 'OPEN'
      })
      router.push("/jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      setErrorMessage("Failed to create job")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Post New Job</h2>
          <p className="text-muted-foreground">Create a new job posting</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the details for the new job posting</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select
                value={formData.companyId}
                onValueChange={(value: string) => 
                  setFormData(prev => ({ ...prev, companyId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP') => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  value={formData.salary?.min}
                  onChange={(e) => handleSalaryChange('min', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  value={formData.salary?.max}
                  onChange={(e) => handleSalaryChange('max', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Type a skill and press Enter"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.requirements.map((req) => (
                  <Badge key={req} variant="secondary">
                    {req}
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(req)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Type a requirement and press Enter"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyDown={handleAddRequirement}
              />
            </div>

            {errorMessage && (
              <div className="text-sm text-destructive">{errorMessage}</div>
            )}

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/jobs">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

