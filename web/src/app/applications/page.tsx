import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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


interface Application {
    id: string
    jobTitle: string
    company: string
    location: string
    appliedDate: Date
    status: "PENDING" | "ACCEPTED" | "REJECTED"
}

interface ApplicationsTableProps {
    applications: Application[]
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
    const getStatusColor = (status: Application["status"]) => {
        switch (status) {
            case "ACCEPTED":
                return "bg-green-500/10 text-green-500"
            case "REJECTED":
                return "bg-red-500/10 text-red-500"
            default:
                return "bg-yellow-500/10 text-yellow-500"
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications.map((application) => (
                    <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.jobTitle}</TableCell>
                        <TableCell>{application.company}</TableCell>
                        <TableCell>{application.location}</TableCell>
                        <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Badge className={getStatusColor(application.status)} variant="secondary">
                                {application.status.toLowerCase()}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}




export default function ApplicationsPage() {
    return (
        <div className="container py-10 max-w-5xl">
            <Card>
                <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <ApplicationsTable applications={mockApplications} />
                </CardContent>
            </Card>
        </div>
    )
}

