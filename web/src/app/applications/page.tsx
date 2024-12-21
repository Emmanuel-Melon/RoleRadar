"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, MessageSquare, Heart, Clock, MapPin, Calendar, CheckCircle2, XCircle, Clock3, Send, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const mockApplications = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    appliedDate: new Date("2024-12-15"),
    status: "PENDING" as const,
    description: "We're looking for a Senior Frontend Developer to join our dynamic team. You'll be working on cutting-edge web applications using React and Next.js.",
    requirements: [
      "5+ years of experience with React",
      "Strong understanding of modern JavaScript",
      "Experience with TypeScript and Next.js",
    ],
    salary: "$120k - $160k/year",
    messages: [
      {
        id: "1",
        sender: "TechCorp Inc.",
        content: "Thanks for your application! We'll review it and get back to you soon.",
        timestamp: new Date("2024-12-15T10:00:00"),
        isCompany: true
      },
      {
        id: "2",
        sender: "You",
        content: "Thank you for considering my application. I'm looking forward to hearing from you!",
        timestamp: new Date("2024-12-15T10:05:00"),
        isCompany: false
      }
    ]
  },
  {
    id: "2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    location: "New York, NY",
    appliedDate: new Date("2024-12-10"),
    status: "ACCEPTED" as const,
    description: "Join our team as a Full Stack Engineer and work on exciting projects using a variety of technologies.",
    requirements: [
      "4+ years of full stack development",
      "Experience with Node.js and React",
      "Knowledge of cloud platforms (AWS/GCP)",
    ],
    salary: "$130k - $180k/year",
    messages: [
      {
        id: "1",
        sender: "InnovateTech",
        content: "We're excited to move forward with your application! When would you be available for an initial interview?",
        timestamp: new Date("2024-12-11T14:00:00"),
        isCompany: true
      }
    ]
  },
  {
    id: "3",
    jobTitle: "Software Engineer",
    company: "StartupCo",
    location: "Remote",
    appliedDate: new Date("2024-12-05"),
    status: "REJECTED" as const,
    description: "Looking for a Software Engineer to help build our core product features.",
    requirements: [
      "3+ years of software development",
      "Strong problem-solving skills",
      "Experience with agile methodologies",
    ],
    salary: "$100k - $140k/year",
    messages: [
      {
        id: "1",
        sender: "StartupCo",
        content: "Thank you for your interest in StartupCo. While your background is impressive, we've decided to move forward with other candidates who better match our current needs.",
        timestamp: new Date("2024-12-20T09:00:00"),
        isCompany: true
      }
    ]
  }
]

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [showMobileDetail, setShowMobileDetail] = useState(false)
  
  const getStatusColor = (status: "PENDING" | "ACCEPTED" | "REJECTED") => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500/10 text-green-500"
      case "REJECTED":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-yellow-500/10 text-yellow-500"
    }
  }

  const getStatusIcon = (status: "PENDING" | "ACCEPTED" | "REJECTED") => {
    switch (status) {
      case "ACCEPTED":
        return <CheckCircle2 className="h-4 w-4" />
      case "REJECTED":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock3 className="h-4 w-4" />
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedApplication) return
    
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className={cn(
        "md:w-[400px] w-full md:border-r",
        (selectedApplication && showMobileDetail) ? "hidden md:block" : "block"
      )}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
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
            <TabsTrigger value="submitted" className="flex gap-2">
              <Clock className="h-4 w-4" />
              Submitted ({mockApplications.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="p-0">

            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="divide-y">
                {mockApplications.map((app) => (
                  <div
                    key={app.id}
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer",
                      selectedApplication?.id === app.id && "bg-muted"
                    )}
                    onClick={() => {
                      setSelectedApplication(app)
                      setShowMobileDetail(true)
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={""} />
                      <AvatarFallback>{app.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{app.company}</span>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {app.jobTitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="submitted" className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="divide-y">
                {mockApplications.map((app) => (
                  <div
                    key={app.id}
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer",
                      selectedApplication?.id === app.id && "bg-muted"
                    )}
                    onClick={() => {
                      setSelectedApplication(app)
                      setShowMobileDetail(true)
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={""} />
                      <AvatarFallback>{app.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{app.company}</span>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.toLowerCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {app.jobTitle}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Applied: {app.appliedDate.toLocaleDateString()}
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
                    className={cn(
                      "flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer",
                      selectedApplication?.id === app.id && "bg-muted"
                    )}
                    onClick={() => {
                      setSelectedApplication(app)
                      setShowMobileDetail(true)
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={""} />
                      <AvatarFallback>{app.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{app.company}</span>
                        <span className="text-xs text-muted-foreground">
                          {app.messages[app.messages.length - 1]?.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {app.messages[app.messages.length - 1]?.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 overflow-auto",
        (selectedApplication && showMobileDetail) ? "block" : "hidden md:block"
      )}>
        {selectedApplication ? (
          <Tabs defaultValue="details" className="h-full flex flex-col">
            <div className="border-b">
              <div className="flex items-center p-2 md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileDetail(false)}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="font-semibold">{selectedApplication.company}</span>
              </div>
              <TabsList className="w-full justify-start rounded-none border-b-0">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="flex-1 overflow-auto">
              <div className="p-6 max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedApplication.jobTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4" />
                          {selectedApplication.company}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(selectedApplication.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(selectedApplication.status)}
                          {selectedApplication.status.toLowerCase()}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedApplication.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied {selectedApplication.appliedDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Job Description</h3>
                      <p className="text-muted-foreground">
                        {selectedApplication.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Requirements</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {selectedApplication.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Salary Range</h3>
                      <p className="text-muted-foreground">
                        {selectedApplication.salary}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Application Submitted</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedApplication.appliedDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {selectedApplication.status !== "PENDING" && (
                        <div className="flex gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            selectedApplication.status === "ACCEPTED" 
                              ? "bg-green-500/10" 
                              : "bg-red-500/10"
                          )}>
                            {selectedApplication.status === "ACCEPTED" 
                              ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                              : <XCircle className="h-4 w-4 text-red-500" />
                            }
                          </div>
                          <div>
                            <div className="font-medium">
                              Application {selectedApplication.status.toLowerCase()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedApplication.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 max-w-lg",
                        message.isCompany ? "" : "ml-auto flex-row-reverse"
                      )}
                    >
                      <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarImage src={""} />
                        <AvatarFallback>
                          {message.isCompany ? selectedApplication.company[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {message.sender}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className={cn(
                          "rounded-lg p-3",
                          message.isCompany 
                            ? "bg-muted" 
                            : "bg-primary text-primary-foreground"
                        )}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-2xl mx-auto text-center p-8">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Select a conversation</h2>
            <p className="text-muted-foreground">
              Choose a company from the sidebar to view your application status and messages
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
