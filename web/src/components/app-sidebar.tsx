import {
    Home,
    Settings,
    Briefcase,
    Clipboard,
    User2,
    BarChart,
    ChevronUp
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuBadge
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

// Menu items.
const items = [
    {
        title: "RoleRadar",
        url: "/",
        icon: Home,
    },
    {
        url: "/jobs",
        title: "Jobs",
        icon: Briefcase,
      },
      {
        url: "/applications",
        title: "Applications",
        icon: Clipboard,
      },
      {
        url: "/candidates",
        title: "Candidates",
        icon: User2,
      },
      {
        url: "/analytics",
        title: "Analytics",
        icon: BarChart,
      },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                        
                                    </SidebarMenuButton>
                                    <SidebarMenuBadge>24</SidebarMenuBadge>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
