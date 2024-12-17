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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCandidate } from "@/hooks/useCandidates";

interface CandidateFormData {
    name: string;
    email: string;
    phone: string;
    skills: string;
    experience: string;
    education: string;
    resume: string;
}

export default function NewCandidatePage() {
    const router = useRouter();
    const createCandidate = useCreateCandidate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<CandidateFormData>({
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
        education: "",
        resume: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const candidateData = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim()),
            };

            await createCandidate.mutateAsync(candidateData);
            router.push("/candidates");
        } catch (error) {
            console.error("Error creating candidate:", error);
            setErrorMessage("Failed to create candidate");
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
                            <Link href="/candidates">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Add New Candidate
                            </h2>
                            <p className="text-muted-foreground">
                                Enter candidate information
                            </p>
                        </div>
                    </div>

                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Candidate Details</CardTitle>
                            <CardDescription>
                                Fill in the candidate's information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                                    <Input
                                        id="skills"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="e.g., JavaScript, React, Node.js"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">Work Experience</Label>
                                    <Textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="education">Education</Label>
                                    <Textarea
                                        id="education"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resume">Resume URL</Label>
                                    <Input
                                        id="resume"
                                        name="resume"
                                        type="url"
                                        value={formData.resume}
                                        onChange={handleChange}
                                        placeholder="https://example.com/resume.pdf"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Create Candidate
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