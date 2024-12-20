"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, MessageSquare, Heart, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface Application {
//   id: string
//   companyName: string
//   companyLogo?: string
//   jobTitle: string
//   status: "liked" | "applied" | "interviewing" | "matched"
//   lastActivity?: string
//   unread?: boolean
// }

// const applications: Application[] = [
//   {
//     id: "1",
//     companyName: "TechCorp Inc.",
//     jobTitle: "Senior Frontend Developer",
//     status: "liked",
//     lastActivity: "2 hours ago",
//     unread: true
//   },
//   {
//     id: "2",
//     companyName: "InnovateTech",
//     jobTitle: "Full Stack Engineer",
//     status: "interviewing",
//     lastActivity: "1 day ago"
//   },
//   // Add more mock data as needed
// ]

const mockApplications = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: new Date("2024-12-15"),
    status: "PENDING" as const
  },
  {
    id: "2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    location: "New York, NY",
    appliedDate: new Date("2024-12-10"),
    status: "ACCEPTED" as const
  },
  {
    id: "3",
    jobTitle: "Software Engineer",
    company: "StartupCo",
    location: "Remote",
    appliedDate: new Date("2024-12-05"),
    status: "REJECTED" as const
  }
]

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="font-semibold">Your Applications</span>
          </div>
        </div>

        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b px-4">
            <TabsTrigger value="matches" className="flex gap-2">
              <Building2 className="h-4 w-4" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="p-0">
            <div className="p-4 border-b bg-muted/40">
              <div className="aspect-square relative rounded-xl border bg-card p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">24</span>
                <span className="text-sm text-muted-foreground">Companies interested</span>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-13rem)]">
              <div className="grid grid-cols-1 gap-2 p-2">
                {mockApplications.map((app) => (
                  <div
                    key={app.id}
                    className="relative aspect-square rounded-xl border bg-card hover:border-primary cursor-pointer transition-colors overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-sm font-medium text-white truncate">
                        {app.company}
                      </div>
                      <div className="text-xs text-white/80 truncate">
                        {app.jobTitle}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="messages" className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="divide-y">
                {mockApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={null} />
                      <AvatarFallback>{app.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{app.company}</span>
                        {/* <span className="text-xs text-muted-foreground">{app.lastActivity}</span> */}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {app.jobTitle}
                      </div>
                    </div>
                    {/* {app.unread && (
                      <div className="h-2 w-2 rounded-full bg-destructive" />
                    )} */}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto text-center p-8">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Select a conversation</h2>
          <p className="text-muted-foreground">
            Choose a company from the sidebar to view your application status and messages
          </p>
        </div>
      </div>
    </div>
  )
}

