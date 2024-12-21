import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.application.deleteMany(),
    prisma.salary.deleteMany(),
    prisma.jobPost.deleteMany(),
    prisma.companyInterest.deleteMany(),
    prisma.company.deleteMany(),
    prisma.project.deleteMany(),
    prisma.education.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.notificationPreferences.deleteMany(),
    prisma.jobPreferences.deleteMany(),
    prisma.userSettings.deleteMany(),
    prisma.recruiterProfile.deleteMany(),
    prisma.candidateProfile.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'TechCorp',
        logo: 'https://placeholder.com/techcorp.png',
        description: 'Leading technology solutions provider',
        website: 'https://techcorp.example.com',
      },
    }),
    prisma.company.create({
      data: {
        name: 'InnovateSoft',
        logo: 'https://placeholder.com/innovatesoft.png',
        description: 'Innovation-driven software company',
        website: 'https://innovatesoft.example.com',
      },
    }),
  ])
  
  // Create recruiter users
  const recruiters = await Promise.all([
    prisma.user.create({
      data: {
        email: 'recruiter1@techcorp.com',
        name: 'Sarah Thompson',
        role: 'RECRUITER',
        recruiterProfile: {
          create: {
            company: companies[0].name,
            logo: companies[0].logo,
            companyId: companies[0].id,
          },
        },
        settings: {
          create: {
            profileVisibility: 'PUBLIC',
            notificationPreferences: {
              create: {
                emailNotifications: true,
              },
            },
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'recruiter2@innovatesoft.com',
        name: 'Michael Chen',
        role: 'RECRUITER',
        recruiterProfile: {
          create: {
            company: companies[1].name,
            logo: companies[1].logo,
            companyId: companies[1].id,
          },
        },
        settings: {
          create: {
            profileVisibility: 'PUBLIC',
            notificationPreferences: {
              create: {
                emailNotifications: true,
              },
            },
          },
        },
      },
    }),
  ])

  // Create candidate users
  const candidates = await Promise.all([
    prisma.user.create({
      data: {
        email: 'candidate1@example.com',
        name: 'John Davis',
        role: 'CANDIDATE',
        candidateProfile: {
          create: {
            skills: ['JavaScript', 'React', 'Node.js'],
            interests: ['Frontend Development', 'UI/UX'],
          },
        },
        settings: {
          create: {
            profileVisibility: 'PUBLIC',
            showSalaryExpectations: true,
            jobPreferences: {
              create: {
                jobType: 'FULL_TIME',
                experienceLevel: 'MID',
                skills: ['JavaScript', 'React', 'Node.js'],
                minSalary: 80000,
                maxSalary: 120000,
                locationPreference: 'HYBRID',
              },
            },
          },
        },
        Experience: {
          create: [
            {
              title: 'Frontend Developer',
              company: 'WebTech Solutions',
              startDate: new Date('2020-01-01'),
              endDate: new Date('2022-12-31'),
              technologies: ['React', 'JavaScript', 'CSS'],
              description: 'Developed responsive web applications',
            },
          ],
        },
        Education: {
          create: [
            {
              school: 'Tech University',
              degree: 'Bachelor',
              field: 'Computer Science',
              startDate: new Date('2016-09-01'),
              endDate: new Date('2020-05-31'),
            },
          ],
        },
        Project: {
          create: [
            {
              title: 'E-commerce Platform',
              description: 'Built a full-stack e-commerce platform',
              technologies: ['React', 'Node.js', 'PostgreSQL'],
              startDate: new Date('2021-06-01'),
              endDate: new Date('2021-12-31'),
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'candidate2@example.com',
        name: 'Emily Wilson',
        role: 'CANDIDATE',
        candidateProfile: {
          create: {
            skills: ['Python', 'Django', 'AWS'],
            interests: ['Backend Development', 'Cloud Architecture'],
          },
        },
        settings: {
          create: {
            profileVisibility: 'PUBLIC',
            showSalaryExpectations: true,
            jobPreferences: {
              create: {
                jobType: 'FULL_TIME',
                experienceLevel: 'SENIOR',
                skills: ['Python', 'Django', 'AWS'],
                minSalary: 120000,
                maxSalary: 160000,
                locationPreference: 'REMOTE',
              },
            },
          },
        },
      },
    }),
  ])

  // Create job posts
  const jobPosts = await Promise.all([
    prisma.jobPost.create({
      data: {
        title: 'Senior Frontend Developer',
        description: 'Looking for an experienced frontend developer to join our team.',
        requirements: ['5+ years experience', 'React expertise', 'Team leadership'],
        skills: ['React', 'JavaScript', 'TypeScript'],
        location: 'New York, NY',
        type: 'FULL_TIME',
        companyId: companies[0].id,
        salary: {
          create: {
            min: 120000,
            max: 160000,
            currency: 'USD',
          },
        },
      },
    }),
    prisma.jobPost.create({
      data: {
        title: 'Backend Developer',
        description: 'Python developer needed for our growing backend team.',
        requirements: ['3+ years experience', 'Python expertise', 'AWS knowledge'],
        skills: ['Python', 'Django', 'AWS'],
        location: 'Remote',
        type: 'FULL_TIME',
        companyId: companies[1].id,
        salary: {
          create: {
            min: 100000,
            max: 140000,
            currency: 'USD',
          },
        },
      },
    }),
  ])


  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })