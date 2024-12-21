import { Application, JobPost, CandidateProfile, JobType } from "@prisma/client";

export interface ApplicationWithRelations extends Application {
  jobPost: JobPost & {
    skills: string[]
    salary: {
      min: number
      max: number
    }
    type: JobType
  }
  candidate: CandidateProfile & {
    skills: string[]
  }
}

// Get applications by status distribution
export const getApplicationStatusDistribution = (applications: ApplicationWithRelations[]) => {
  const statusCount = applications.reduce((acc: { [key: string]: number }, application) => {
    acc[application.status] = (acc[application.status] || 0) + 1
    return acc
  }, {})

  return Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
  }))
}

// Get most in-demand skills
export const getSkillsDemand = (applications: ApplicationWithRelations[]) => {
  const skillsCount = applications.reduce((acc: { [key: string]: number }, app) => {
    app.jobPost.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1
    })
    return acc
  }, {})

  return Object.entries(skillsCount)
    .map(([skill, count]) => ({
      skill,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

// Get application trends over time
export const getApplicationTrends = (applications: ApplicationWithRelations[]) => {
  const trends = applications.reduce((acc: { [key: string]: { total: number; accepted: number } }, app) => {
    const month = new Date(app.createdAt).toLocaleString('default', { month: 'short' })
    
    if (!acc[month]) {
      acc[month] = { total: 0, accepted: 0 }
    }
    
    acc[month].total++
    if (app.status === 'ACCEPTED') {
      acc[month].accepted++
    }
    
    return acc
  }, {})

  return Object.entries(trends).map(([month, stats]) => ({
    month,
    applications: stats.total,
    accepted: stats.accepted,
  }))
}

