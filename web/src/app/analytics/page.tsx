"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getApplicationStatusDistribution, getSkillsDemand, getApplicationTrends, ApplicationWithRelations } from "@/lib/analytics"

import { Application } from "@prisma/client";
console.log("applications", typeof Application)

export default function AnalyticsDashboard() {
  const [applications, setApplications] = useState<ApplicationWithRelations[]>([])
  const [statusData, setStatusData] = useState([])
  const [skillsData, setSkillsData] = useState([])
  const [trendsData, setTrendsData] = useState([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const fetchedApplications = [
      {
        "id": "cm4wrkc750003pwm4vujsstcu",
        "candidateId": "clh1n2f3g0005qw9k3x5j6t8z",
        "jobPostId": "clh1n2f3g0010qw9k3x5j6t8w",
        "status": "PENDING",
        "createdAt": "2024-12-20T13:05:55.607Z",
        "updatedAt": "2024-12-20T13:05:55.607Z",
        "jobPost": {
          "id": "clh1n2f3g0010qw9k3x5j6t8w",
          "title": "Senior Frontend Developer",
          "description": "Looking for an experienced frontend developer with React expertise",
          "skills": ["React", "TypeScript", "CSS3"],
          "location": "New York, NY",
          "recruiterId": "clh1n2f3g0008qw9k3x5j6t8u",
          "createdAt": "2024-01-20T13:00:00.000Z",
          "updatedAt": "2024-01-20T13:00:00.000Z",
          "type": "FULL_TIME",
          "salary": { min: 100000, max: 150000 }
        },
        "candidate": {
          "id": "clh1n2f3g0005qw9k3x5j6t8z",
          "userId": "cm4sv2jy70008pwkyevwu2ftb",
          "skills": ["JavaScript", "React", "Node.js"],
          "interests": ["Web Development", "UI/UX", "Open Source"],
          "createdAt": "2024-01-15T08:00:00.000Z",
          "updatedAt": "2024-01-15T08:00:00.000Z"
        }
      },
      {
        "id": "cm4wrkrvn0005pwm42ex6evpa",
        "candidateId": "clh1n2f3g0005qw9k3x5j6t8z",
        "jobPostId": "clh1n2f3g0010qw9k3x5j6t8w",
        "status": "ACCEPTED",
        "createdAt": "2024-12-20T13:06:15.970Z",
        "updatedAt": "2024-12-20T13:06:15.970Z",
        "jobPost": {
          "id": "clh1n2f3g0010qw9k3x5j6t8w",
          "title": "Senior Frontend Developer",
          "description": "Looking for an experienced frontend developer with React expertise",
          "skills": ["React", "TypeScript", "CSS3"],
          "location": "New York, NY",
          "recruiterId": "clh1n2f3g0008qw9k3x5j6t8u",
          "createdAt": "2024-01-20T13:00:00.000Z",
          "updatedAt": "2024-01-20T13:00:00.000Z",
          "type": "FULL_TIME",
          "salary": { min: 100000, max: 150000 }
        },
        "candidate": {
          "id": "clh1n2f3g0005qw9k3x5j6t8z",
          "userId": "cm4sv2jy70008pwkyevwu2ftb",
          "skills": ["JavaScript", "React", "Node.js"],
          "interests": ["Web Development", "UI/UX", "Open Source"],
          "createdAt": "2024-01-15T08:00:00.000Z",
          "updatedAt": "2024-01-15T08:00:00.000Z"
        }
      },
      {
        "id": "cm4wrktco0007pwm42shdxyvn",
        "candidateId": "clh1n2f3g0005qw9k3x5j6t8z",
        "jobPostId": "clh1n2f3g0010qw9k3x5j6t8w",
        "status": "REJECTED",
        "createdAt": "2024-12-20T13:06:17.880Z",
        "updatedAt": "2024-12-20T13:06:17.880Z",
        "jobPost": {
          "id": "clh1n2f3g0010qw9k3x5j6t8w",
          "title": "Senior Frontend Developer",
          "description": "Looking for an experienced frontend developer with React expertise",
          "skills": ["React", "TypeScript", "CSS3"],
          "location": "New York, NY",
          "recruiterId": "clh1n2f3g0008qw9k3x5j6t8u",
          "createdAt": "2024-01-20T13:00:00.000Z",
          "updatedAt": "2024-01-20T13:00:00.000Z",
          "type": "FULL_TIME",
          "salary": { min: 100000, max: 150000 }
        },
        "candidate": {
          "id": "clh1n2f3g0005qw9k3x5j6t8z",
          "userId": "cm4sv2jy70008pwkyevwu2ftb",
          "skills": ["JavaScript", "React", "Node.js"],
          "interests": ["Web Development", "UI/UX", "Open Source"],
          "createdAt": "2024-01-15T08:00:00.000Z",
          "updatedAt": "2024-01-15T08:00:00.000Z"
        }
      }
    ]

    setApplications(fetchedApplications as ApplicationWithRelations[])
  }, [])

  useEffect(() => {
    if (applications.length > 0) {
      setStatusData(getApplicationStatusDistribution(applications))
      setSkillsData(getSkillsDemand(applications))
      setTrendsData(getApplicationTrends(applications))
    }
  }, [applications])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Application Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                PENDING: {
                  label: "Pending",
                  color: "hsl(var(--chart-1))",
                },
                ACCEPTED: {
                  label: "Accepted",
                  color: "hsl(var(--chart-2))",
                },
                REJECTED: {
                  label: "Rejected",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-64"
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skills Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <BarChart data={skillsData.slice(0, 5)}>
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Application Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                applications: {
                  label: "Total Applications",
                  color: "hsl(var(--chart-1))",
                },
                accepted: {
                  label: "Accepted",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <LineChart data={trendsData}>
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="var(--color-applications)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  stroke="var(--color-accepted)"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

