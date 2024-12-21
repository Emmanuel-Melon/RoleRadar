# RoleRadar Backend

This is the backend service for RoleRadar, built with NestJS, PostgreSQL, and Prisma. It handles all API requests for managing jobs, candidates, and user interactions in the RoleRadar platform.

## Architecture Overview

### Controllers and Services Pattern

The backend follows NestJS's controller-service pattern, implementing a clean separation of concerns. Let's look at how this works with our Jobs module:

#### 1. Controller (jobs.controller.ts)
```typescript
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JobService } from './jobs.service';
import { Prisma } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.JobPostCreateInput) {
    return this.jobService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.JobPostUpdateInput) {
    return this.jobService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
```

The controller:
- Handles HTTP requests using decorators (@Get, @Post, etc.)
- Defines route parameters and request body types
- Delegates business logic to the JobService
- Returns HTTP responses

#### 2. Service (jobs.service.ts)
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.jobPost.findMany({
      include: {
        applications: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.jobPost.findUnique({
      where: { id },
      include: {
        applications: true,
      },
    });
  }

  async create(data: Prisma.JobPostCreateInput) {
    return this.prisma.jobPost.create({
      data,
      include: {
        applications: true,
      },
    });
  }

  async update(id: string, data: Prisma.JobPostUpdateInput) {
    return this.prisma.jobPost.update({
      where: { id },
      data,
      include: {
        applications: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.jobPost.delete({
      where: { id },
    });
  }
}
```

The service:
- Uses `@Injectable()` decorator to enable dependency injection
- Implements business logic using Prisma for database operations
- Includes related data (applications) in responses
- Handles CRUD operations for job posts

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

## Development

```bash
# Start in development mode
npm run start:dev

# Start in production mode
npm run start:prod

# Run tests
npm run test
```

## API Endpoints

### Jobs Module Endpoints

| Method | Endpoint    | Description         | Request Body             |
|--------|------------|---------------------|-------------------------|
| GET    | /jobs      | List all jobs       | -                       |
| GET    | /jobs/:id  | Get specific job    | -                       |
| POST   | /jobs      | Create new job      | JobPostCreateInput      |
| PUT    | /jobs/:id  | Update job          | JobPostUpdateInput      |
| DELETE | /jobs/:id  | Delete job          | -                       |

#### Request/Response Examples

**Create Job (POST /jobs)**
```json
{
  "title": "Senior Developer",
  "description": "We are looking for...",
  "companyId": "123",
  "location": "Remote",
  "salary": 100000
}
```

**Response**
```json
{
  "id": "abc123",
  "title": "Senior Developer",
  "description": "We are looking for...",
  "companyId": "123",
  "location": "Remote",
  "salary": 100000,
  "applications": []
}
```

## Database Schema

### Job Post Schema
```prisma
model JobPost {
  id          String        @id @default(uuid())
  title       String
  description String
  companyId   String
  location    String
  salary      Int
  applications Application[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

The application is deployed on Vercel:
1. Configure environment variables in Vercel dashboard
2. Connect repository to Vercel
3. Deploy using:
```bash
vercel --prod
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## License

[MIT licensed](LICENSE)