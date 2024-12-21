'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Sparkles } from 'lucide-react'

interface MatchSuccessProps {
  isOpen: boolean
  onClose: () => void
  candidateImage: string
  companyImage: string
  companyName: string
}

export function MatchSuccess({
  isOpen,
  onClose,
  candidateImage,
  companyImage,
  companyName
}: MatchSuccessProps) {
  const [message, setMessage] = useState('')

  const quickResponses = [
    { emoji: '👋', text: 'Wave' },
    { emoji: '😉', text: 'Wink' },
    { emoji: '❤️', text: 'Heart' },
    { emoji: '😍', text: 'Love' },
  ]

  const handleSend = () => {
    // Handle sending the message
    console.log('Sending message:', message)
    setMessage('')
  }

  const handleQuickResponse = (emoji: string) => {
    setMessage(emoji)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-transparent shadow-none">
        <div className="relative flex flex-col items-center justify-center w-full overflow-hidden rounded-xl bg-gradient-to-b from-green-500/90 to-green-700/90 p-6 text-center shadow-xl backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] animate-pulse rounded-full bg-green-400/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-full w-full text-white/10" />
          </div>

          {/* Content */}
          <div className="relative space-y-4">
            <div className="flex items-center justify-center gap-4 pb-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/20">
                <Image
                  src={candidateImage}
                  alt="Candidate"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/20">
                <Image
                  src={companyImage}
                  alt="Company"
                  className="object-cover"
                  fill
                />
              </div>
            </div>

            <div className="space-y-2 text-white">
              <h2 className="text-3xl font-bold tracking-tight">
                IT&apos;S A MATCH
              </h2>
              <p className="text-xl">
                You matched with {companyName}
              </p>
            </div>

            <div className="pt-4">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice!"
                  className="bg-black/20 border-0 text-white placeholder:text-white/70"
                />
                <Button
                  onClick={handleSend}
                  className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-white/10"
                  variant="ghost"
                >
                  Send
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                {quickResponses.map((response) => (
                  <Button
                    key={response.emoji}
                    variant="outline"
                    className={cn(
                      "h-12 border-white/20 bg-black/20 text-xl hover:bg-white/10",
                      message === response.emoji && "bg-white/20"
                    )}
                    onClick={() => handleQuickResponse(response.emoji)}
                  >
                    {response.emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

