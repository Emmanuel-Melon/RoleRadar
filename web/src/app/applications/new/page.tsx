'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateApplication } from "@/hooks/useApplications";
import { useJobs } from "@/hooks/useJobs";
import { useCandidates } from "@/hooks/useCandidates";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ApplicationFormData {
    jobId: string;
    candidateId: string;
    coverLetter: string;
}

export default function NewApplicationPage() {
    const router = useRouter();
    const createApplication = useCreateApplication();
    const { data: jobs } = useJobs();
    const { data: candidates } = useCandidates();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<ApplicationFormData>({
        jobId: "",
        candidateId: "",
        coverLetter: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const applicationData = {
                ...formData,
                status: 'PENDING' as const,
            };

            await createApplication.mutateAsync(applicationData);
            router.push("/applications");
        } catch (error) {
            console.error("Error creating application:", error);
            setErrorMessage("Failed to create application");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1">
                <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-6 max-w-2xl mx-auto">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/applications">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                New Application
                            </h2>
                            <p className="text-muted-foreground">
                                Submit a new job application
                            </p>
                        </div>
                    </div>

                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Application Details</CardTitle>
                            <CardDescription>
                                Fill in the application details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jobId">Select Job</Label>
                                    <Select
                                        value={formData.jobId}
                                        onValueChange={(value) => handleSelectChange("jobId", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a job" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobs?.map((job) => (
                                                <SelectItem key={job.id} value={job.id}>
                                                    {job.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="candidateId">Select Candidate</Label>
                                    <Select
                                        value={formData.candidateId}
                                        onValueChange={(value) => handleSelectChange("candidateId", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a candidate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {candidates?.map((candidate) => (
                                                <SelectItem key={candidate.id} value={candidate.id}>
                                                    {candidate.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="coverLetter">Cover Letter</Label>
                                    <Textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Submit Application
                                    </Button>
                                </div>
                            </form>
                            {errorMessage && (
                                <div className="text-red-500 mt-4">{errorMessage}</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 