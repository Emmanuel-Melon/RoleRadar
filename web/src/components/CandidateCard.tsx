import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Briefcase, GraduationCap, X, Check, Share2 } from 'lucide-react'

interface CandidateCardProps {
  candidate: {
    id: string
    name: string
    title: string
    location: string
    experience: number
    education: string
    skills: string[]
    bio: string
    matchScore: number
    avatar?: string
  }
  onReject: () => void
  onApprove: () => void
}

export function CandidateCard({ candidate, onReject, onApprove }: CandidateCardProps) {

    console.log("candidate", candidate);
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{candidate?.user?.name}</h2>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    {candidate?.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-muted-foreground">{candidate?.title}</p>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{candidate?.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={onReject}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={onApprove}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{candidate.experience} years of experience</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{candidate.education}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground">{candidate.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

