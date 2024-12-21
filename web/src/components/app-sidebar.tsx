import {
    Home,
    Settings,
    Briefcase,
    Clipboard,
    User2,
    BarChart
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

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
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
