"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Share2, Plus } from 'lucide-react'
import { useUsers, useUserEducation, useUserExperiences, useUserProjects, useUser } from "@/hooks/use-users"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { Calendar } from 'lucide-react'

const ExperienceSkeletonCard = () => {
    return (
        <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex flex-wrap gap-2">
                    {[1,2,3].map((i) => (
                        <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EducationSkeletonCard = () => {
    return (
        <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    );
};

const ProjectSkeletonCard = () => {
    return (
        <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
                {[1,2,3].map((i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
            </div>
            <Skeleton className="h-9 w-28" />
        </div>
    );
};

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

interface EducationItemProps {
    school: string
    degree: string
    field: string
    startDate: Date
    endDate?: Date
    current?: boolean
    description?: string
}

interface ProjectItemProps {
    title: string
    description?: string
    technologies?: string[]
    url?: string
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
                    <div className="flex gap-2">
                        {current && (
                            <Badge variant="secondary">Current</Badge>
                        )}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <p>Hello world</p>
                            </DialogContent>
                        </Dialog>
                    </div>
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

function EducationItem({
    school,
    degree,
    field,
    startDate,
    endDate,
    current,
    description
}: EducationItemProps) {
    return (
        <div className="flex gap-4 p-6 rounded-lg border bg-card">
            <Avatar className="h-12 w-12">
                <AvatarFallback>{school[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-xl">{degree} in {field}</h3>
                        <p className="text-muted-foreground">{school}</p>
                    </div>
                    <div className="flex gap-2">
                        {current && (
                            <Badge variant="secondary">Current</Badge>
                        )}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <p>Hello world</p>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )
}

function ProjectItem({
    title,
    description,
    technologies,
    url
}: ProjectItemProps) {
    return (
        <div className="p-6 rounded-lg border bg-card space-y-4">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-semibold text-xl">{title}</h3>
                    {description && (
                        <p className="text-muted-foreground mt-2">{description}</p>
                    )}
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <p>Hello world</p>
                    </DialogContent>
                </Dialog>
            </div>

            {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="rounded-full">
                            {tech}
                        </Badge>
                    ))}
                </div>
            )}

            {url && (
                <Button variant="outline" size="sm" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">View Project</a>
                </Button>
            )}
        </div>
    )
}

const UserExperiences = ({ experiences, isLoading, error }: { experiences: any[], isLoading: boolean, error: any }) => {
    if(isLoading) return (
        <div className="space-y-4">
            {[1,2,3].map((i) => (
                <ExperienceSkeletonCard key={i} />
            ))}
        </div>
    )
    if(error) return <p>Failed to load</p>
    return (
        <div className="space-y-4">
            {experiences.map((exp, index) => (
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
    )
}

const UserEducation = ({ education, isLoading, error }: { education: any[], isLoading: boolean, error: any }) => {
    if(isLoading) return (
        <div className="space-y-4">
            {[1,2].map((i) => (
                <EducationSkeletonCard key={i} />
            ))}
        </div>
    )
    if(error) return <p>Failed to load</p>
    return (
        <div className="space-y-4">
            {education.map((edu, index) => (
                <EducationItem
                    key={index}
                    school={edu.school}
                    degree={edu.degree}
                    field={edu.field}
                    startDate={edu.startDate}
                    endDate={edu.endDate}
                    current={edu.current}
                    description={edu.description}
                />
            ))}
        </div>
    )
}

const UserProjects = ({ projects, isLoading, error }: { projects: any[], isLoading: boolean, error: any }) => {
    if(isLoading) return (
        <div className="space-y-4">
            {[1,2,3].map((i) => (
                <ProjectSkeletonCard key={i} />
            ))}
        </div>
    )
    if(error) return <p>Failed to load</p>
    return (
        <div className="space-y-4">
            {projects.map((project, index) => (
                <ProjectItem
                    key={index}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    url={project.url}
                />
            ))}
        </div>
    )
}

const mockProfile = {
    name: "Emmanuel Gatwech",
    username: "emmanuelgatwech",
    location: "Rwanda",
    bio: "I am a software developer with over four years of experience and a passion for building innovative solutions that address real-world problems, having worked on various projects in various sectors.",
    salary: {
      min: 60000,
      max: 80000,
      currency: "USD"
    }
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

const UserProfile = ({ isLoading, error, user, profile }) => {
    console.log("profile", profile);
    if(isLoading) return <p>Loading</p>
    if(error) return <p>error</p>
    return (
        <div>
        <div className="p-4 space-y-8">
            <ProfileHeader
                name={profile?.name}
                username={user.username}
                location={user.location}
                bio={user.bio}
            />

            <div className="space-y-6">
                <SkillsSection
                    skills={profile?.candidateProfile.skills}
                />
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Job Categories</h2>
                        <Button variant="ghost" size="sm">
                            Edit
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {profile?.candidateProfile.interests.map((category) => (
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
                        {user.salary.min.toLocaleString()} - {user.salary.max.toLocaleString()} {user.salary.currency} / year
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default function ProfilePage() {
    const { data: experience, isLoading: expLoading, error: expError } = useUserExperiences("clh1n2f3g0000qw9k3x5j6t8m");
    const { data: education, isLoading: eduLoading, error: eduError } = useUserEducation("clh1n2f3g0000qw9k3x5j6t8m");
    const { data: projects, isLoading: projLoading, error: projError } = useUserProjects("clh1n2f3g0000qw9k3x5j6t8m");
    const { data: user, isLoading: userLoading, error: userError } = useUser("clh1n2f3g0000qw9k3x5j6t8m");

    return (
        <div className="container p-4 space-y-8">
            <UserProfile user={mockProfile} isLoading={userLoading} error={userError} profile={user} />
            <div>
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold">Experience</h2>
                                <p className="text-muted-foreground">Work history, roles, and key accomplishments</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <p>Hello world</p>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <UserExperiences experiences={experience} isLoading={expLoading} error={expError} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold">Education</h2>
                                <p className="text-muted-foreground">Academic background and qualifications</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <p>Hello world</p>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <UserEducation education={education} isLoading={eduLoading} error={eduError} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold">Projects</h2>
                                <p className="text-muted-foreground">Personal and professional projects</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <p>Hello world</p>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <UserProjects projects={projects} isLoading={projLoading} error={projError} />
                    </div>
                </div>
            </div>
        </div>
    )
}
