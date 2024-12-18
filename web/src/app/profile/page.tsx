
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Share2 } from 'lucide-react'

import { Calendar } from 'lucide-react'

interface ExperienceItemProps {
    title: string
    company: string
    companyLogo?: string
    startDate: Date
    endDate?: Date
    current?: boolean
    description?: string
    technologies?: string[]
}

function ExperienceItem({
    title,
    company,
    companyLogo,
    startDate,
    endDate,
    current,
    description,
    technologies
}: ExperienceItemProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }

    const getDuration = (start: Date, end?: Date) => {
        const months = (end ? end.getTime() : new Date().getTime()) - start.getTime()
        const years = Math.floor(months / (1000 * 60 * 60 * 24 * 365))
        const remainingMonths = Math.floor(months / (1000 * 60 * 60 * 24 * 30)) % 12

        if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    }

    return (
        <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Avatar className="h-12 w-12">
                {companyLogo ? (
                    <AvatarImage src={companyLogo} alt={company} />
                ) : (
                    <AvatarFallback>{company[0]}</AvatarFallback>
                )}
            </Avatar>
            <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-xl">{title}</h3>
                        <p className="text-muted-foreground">{company}</p>
                    </div>
                    {current && (
                        <Badge variant="secondary">Current</Badge>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                        {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
                    </span>
                    <span className="text-muted-foreground/60">
                        ({getDuration(startDate, endDate)})
                    </span>
                </div>

                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}

                {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="rounded-full">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}



const mockProfile = {
    name: "Emmanuel Gatwech",
    username: "emmanuelgatwech",
    location: "Rwanda",
    bio: "I am a software developer with over four years of experience and a passion for building innovative solutions that address real-world problems, having worked on various projects in various sectors.",
    skills: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "GraphQL",
      "Redis",
      "Docker",
      "Technical Writing",
      "Rust"
    ],
    jobCategories: [
      "Full Stack Engineer",
      "Frontend Developer",
      "Backend Developer"
    ],
    salary: {
      min: 60000,
      max: 80000,
      currency: "USD"
    },
    experience: [
      {
        title: "FullStack Engineer",
        company: "Pack",
        startDate: new Date("2024-05"),
        current: true,
      },
      {
        title: "Engineering Lead",
        company: "Sahil",
        startDate: new Date("2023-11"),
        current: true,
      },
      {
        title: "Software Engineer",
        company: "GitStart",
        startDate: new Date("2021-05"),
        endDate: new Date("2022-09"),
        description: "Worked with remote distributed teams around the world, offering pull requests as a service on large scale client applications.",
        technologies: ["Next.js", "GraphQL", "PostgreSQL", "Docker", "React", "Apollo", "Relay", "MongoDB"]
      }
    ]
  }


interface ProfileHeaderProps {
    name: string
    username: string
    location: string
    bio: string

}

function ProfileHeader({ name, username, location, bio }: ProfileHeaderProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex gap-4 items-start">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <p className="text-muted-foreground">@{username}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Badge variant="secondary">{location}</Badge>
                            <Badge variant="secondary">Open to opportunities</Badge>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share profile
                    </Button>
                </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">{bio}</p>
        </div>
    )
}

interface SkillsSectionProps {
    skills: string[]
}

function SkillsSection({ skills }: SkillsSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Skills</h2>
                <Button variant="ghost" size="sm" >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <div className="container py-10 space-y-8">
            <Card>
                <CardContent className="p-6 space-y-8">
                    <ProfileHeader
                        name={mockProfile.name}
                        username={mockProfile.username}
                        location={mockProfile.location}
                        bio={mockProfile.bio}

                    />

                    <div className="space-y-6">
                        <SkillsSection
                            skills={mockProfile.skills}

                        />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Job Categories</h2>
                                <Button variant="ghost" size="sm">
                                    Edit
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {mockProfile.jobCategories.map((category) => (
                                    <Badge key={category} variant="secondary">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Salary Expectations</h2>
                                <Button variant="ghost" size="sm">
                                    Edit
                                </Button>
                            </div>
                            <div className="text-muted-foreground">
                                {mockProfile.salary.min.toLocaleString()} - {mockProfile.salary.max.toLocaleString()} {mockProfile.salary.currency} / year
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Experience</h2>
                            <p className="text-muted-foreground">Work history, roles, and key accomplishments</p>
                        </div>
                        <Button variant="outline">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {mockProfile.experience.map((exp, index) => (
                            <ExperienceItem
                                key={index}
                                title={exp.title}
                                company={exp.company}
                                startDate={exp.startDate}
                                endDate={exp.endDate}
                                current={exp.current}
                                description={exp.description}
                                technologies={exp.technologies}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

