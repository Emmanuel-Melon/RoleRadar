import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Share2, Calendar } from 'lucide-react'

// Reuse the existing interfaces
interface ProfileProps {
  params: {
    profileId: string
  }
}

// Mock function to fetch profile data
const getProfileById = (id: string) => {
  // In a real app, this would be an API call
  if (id === "1") {
    return mockProfile
  }
  return null
}

export default function ProfilePage({ params }: ProfileProps) {
  const profile = getProfileById(params.profileId)

  if (!profile) {
    notFound()
  }

  return (
    <div className="container py-10 space-y-8">
      <Card>
        <CardContent className="p-6 space-y-8">
          <ProfileHeader
            name={profile.name}
            username={profile.username}
            location={profile.location}
            bio={profile.bio}
          />
          {/* Rest of the components remain the same */}
        </CardContent>
      </Card>
      {/* Experience section remains the same */}
    </div>
  )
} 