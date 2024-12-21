"use client"
import { motion } from "framer-motion"
import { Building2, Users, MapPin, DollarSign, Calendar, Briefcase, GraduationCap, Trophy, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// import { div, div } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      description: "We're looking for an experienced frontend developer to join our team and help build the next generation of our product.",
      requirements: [
        "5+ years of experience with React",
        "Strong understanding of web performance",
        "Experience with TypeScript",
        "Knowledge of modern CSS practices",
        "Experience with state management (Redux, MobX, etc.)"
      ],
      skills: ["React", "TypeScript", "Next.js", "CSS", "Redux"],
      location: "New York, NY",
      type: "FULL_TIME",
      salary: {
        min: 120000,
        max: 180000,
        currency: "USD"
      },
      company: {
        name: "TechCorp Inc.",
        logo: "/placeholder.svg",
        description: "Leading technology company focused on innovation",
        benefits: [
          "Health Insurance",
          "401(k) matching",
          "Unlimited PTO",
          "Remote work options"
        ]
      },
      team: {
        leader: "Sarah Johnson",
        members: [
          { name: "Mike Chen", role: "Tech Lead" },
          { name: "Emma Wilson", role: "Senior Developer" },
          { name: "James Rodriguez", role: "Product Manager" }
        ]
      },
      status: "OPEN",
      applications: 45,
      postedAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    }
  ]
  
  

export default function JobPage() {
  const job = jobs[0];

  return (
    <section className="container p-4">
      <div className="space-y-6">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {formatDistanceToNow(new Date(job.postedAt))} ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button>Apply Now</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">About the Role</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Requirements</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Team</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        👑
                      </div>
                      <div>
                        <p className="font-medium">{job.team.leader}</p>
                        <p className="text-sm text-muted-foreground">Hiring Manager</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {job.team.members.map((member, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            👤
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Salary Range</h3>
                    <div className="flex items-center gap-1 text-xl font-medium">
                      <DollarSign className="w-5 h-5" />
                      {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Per year</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-semibold">Benefits</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {job.company.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold">About {job.company.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.company.description}
                  </p>
                </div>
              </div>

              <div className="text-sm text-center text-muted-foreground">
                <p>{job.applications} people have applied</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

