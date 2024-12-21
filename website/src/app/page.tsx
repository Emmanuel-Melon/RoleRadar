"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Users, MessageSquare, Briefcase, ArrowRight, Sparkles, CheckCircle, User, Radar, PartyPopper, Handshake } from 'lucide-react'
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion } from 'framer-motion'
import { ThemeToggle } from "@/components/theme-toggle"

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Build your professional profile highlighting your skills, experience, and career preferences. Our AI-powered system uses this information to find your perfect matches.",
    icon: User,
    color: "bg-blue-50/50"
  },
  {
    number: "02", 
    title: "Discover Opportunities",
    description: "Browse through personalized job recommendations. Swipe right on positions you are interested in, left on those you are not. It's that simple!",
    icon: Radar,
    color: "bg-rose-50/50"
  },
  {
    number: "03",
    title: "Match and Connect",
    description: "When there's mutual interest between you and an employer, it's a match! Start the conversation directly through our built-in messaging system.",
    icon: Handshake,
    color: "bg-green-50/50"
  },
  {
    number: "04",
    title: "Land Your Dream Job",
    description: "Track your applications, receive real-time updates, and move forward in your career journey. No more wondering about application status or missed opportunities.",
    icon: PartyPopper,
    color: "bg-amber-50/50"
  }
]

const AnimateOnScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {


  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">RoleRadar</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
              Find Jobs
            </Link>
            <Link href="/candidates" className="text-muted-foreground hover:text-foreground">
              Find Talent
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-muted/40 relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Role with RoleRadar
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover opportunities that match your skills and aspirations. Our AI-powered platform
            connects talented professionals with innovative companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />
      </section>

      {/* New Inspiration Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Inspired by Modern Dating Apps,
                    <span className="text-primary"> Built for Careers</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    We took the best parts of modern dating apps - the intuitive interface,
                    the quick decision-making, the instant connections - and applied them to
                    job searching. The result? A revolutionary way to find your next career opportunity.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <Search className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Smart Matching</h3>
                        <p className="text-muted-foreground">Like dating apps match based on compatibility,
                          we match based on skills and experience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Instant Connections</h3>
                        <p className="text-muted-foreground">Match with companies and start
                          conversations immediately</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Simple Interface</h3>
                        <p className="text-muted-foreground">Swipe right for jobs you like,
                          left for those you do not</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[280px] h-[400px] bg-background rounded-xl shadow-2xl transform rotate-[-5deg]">
                      <div className="p-4">
                        <div className="w-full aspect-video rounded-lg bg-muted mb-4" />
                        <div className="space-y-2">
                          <div className="h-6 w-2/3 bg-muted rounded" />
                          <div className="h-4 w-1/2 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="w-[280px] h-[400px] bg-background rounded-xl shadow-2xl transform rotate-[5deg] absolute">
                      <div className="p-4">
                        <div className="w-full aspect-video rounded-lg bg-muted mb-4" />
                        <div className="space-y-2">
                          <div className="h-6 w-2/3 bg-muted rounded" />
                          <div className="h-4 w-1/2 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>


      {/* Analytics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[280px] h-[400px] bg-background rounded-xl shadow-2xl transform rotate-[-5deg]">
                      <div className="p-4">
                        <div className="w-full h-32 rounded-lg bg-muted mb-4" />
                        <div className="space-y-3">
                          <div className="h-8 bg-muted/50 rounded-full w-3/4" />
                          <div className="h-8 bg-muted/40 rounded-full w-2/3" />
                          <div className="h-8 bg-muted/30 rounded-full w-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Data-Driven Profile
                    <span className="text-primary"> Performance Analytics</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Understand how your profile performs and get actionable insights to improve your chances of landing your dream job. Our AI-powered analytics help you stand out in the crowd.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Profile Strength Score</h3>
                        <p className="text-muted-foreground">Get detailed feedback on your profile completeness and impact</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Engagement Metrics</h3>
                        <p className="text-muted-foreground">Track profile views, matches, and response rates</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Industry Insights</h3>
                        <p className="text-muted-foreground">Compare your profile against industry standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Two-way Platform Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">
                A Two-Way Hiring Platform That
                <span className="text-primary"> Works for Everyone</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                RoleRadar creates meaningful connections between talented professionals and forward-thinking companies, making the hiring process efficient and enjoyable for both sides.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-background p-8 rounded-2xl shadow-sm">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
                  <p className="text-muted-foreground mb-6">
                    Take control of your job search with a platform that works as hard as you do.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Get matched with relevant opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Connect directly with hiring managers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Track application status in real-time</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 rounded-2xl shadow-sm">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">For Employers</h3>
                  <p className="text-muted-foreground mb-6">
                    Find and connect with pre-qualified candidates who match your requirements.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Access a pool of active, qualified candidates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Reduce time-to-hire with AI matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>Streamline your recruitment process</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">
              How RoleRadar Works
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {steps.map((step) => (
                <div 
                  key={step.title}
                  className={`group relative rounded-2xl ${step.color} p-6 sm:p-8 transition-all hover:shadow-sm`}
                >
                  <div className="flex items-start gap-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm shrink-0">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {step.number}
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <div className="h-1 w-12 bg-primary/10 group-hover:w-24 group-hover:bg-primary/20 transition-all duration-300" />
                      </div>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their perfect role through RoleRadar.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="text-muted-foreground hover:text-foreground">
                    Job Applications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/post-job" className="text-muted-foreground hover:text-foreground">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/candidates" className="text-muted-foreground hover:text-foreground">
                    Browse Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RoleRadar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
