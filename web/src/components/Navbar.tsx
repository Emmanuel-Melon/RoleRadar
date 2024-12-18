"use client";
import Link from "next/link";
import {
  Briefcase,
  Clipboard,
  LogOut,
  User2,
  User,
  HelpCircle,
  Settings,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Move dummy user and nav links outside component
const dummyUser = {
  id: "63e12b78-a149-4119-956e-d47d3d2bc450",
  email: "emmanuelgatwech@gmail.com",
  full_name: "Emmanuel Gatwech",
  user_metadata: {
    avatar_url: "https://github.com/shadcn.png",
  },
};

const NavLinks = [
  {
    href: "/jobs",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    href: "/applications",
    label: "Applications",
    icon: Clipboard,
  },
  {
    href: "/candidates",
    label: "Candidates",
    icon: User2,
  }
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      // const result = await signOut();
      //console.log("result", result);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Add this function to determine if we should show back button
  const shouldShowBackButton = () => {
    // Add your logic here - for example:
    return pathname !== "/" && pathname !== "/discover";
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Mobile Layout */}
          <div className="flex items-center md:hidden">
            {shouldShowBackButton() ? (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="mr-2"
              >
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Go back</span>
                </Link>
              </Button>
            ) : null}
          </div>

          {/* Logo - centered on mobile */}
          <div className={cn(
            "flex-1 flex justify-center md:justify-start md:flex-initial",
            shouldShowBackButton() ? "ml-[-40px]" : "" // Offset to maintain center alignment when back button is present
          )}>
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden md:inline text-xl font-bold">
                RoleRadar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md flex items-center gap-2 transition-colors",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon className={cn(
                    "w-4 h-4",
                    isActive && "text-primary"
                  )} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-primary">
                      <AvatarImage
                        src={dummyUser.user_metadata?.avatar_url}
                        alt={dummyUser.email || ""}
                      />
                      <AvatarFallback>
                        {dummyUser.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 py-2">
                      <p className="text-sm font-medium leading-none">
                        {dummyUser?.full_name || dummyUser.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="space-y-2">
                    <Link href="/profile" passHref>
                      <DropdownMenuItem asChild>
                        <div>
                          <User className="mr-2 h-4 w-4" />
                          <span>View profile</span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings" passHref>
                      <DropdownMenuItem asChild>
                        <div>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Account settings</span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/help" passHref>
                      <DropdownMenuItem asChild>
                        <div>
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Help & Support</span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button - moved to right */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t bg-background">
            {NavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 transition-colors",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className={cn(
                    "w-5 h-5",
                    isActive && "text-primary"
                  )} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}