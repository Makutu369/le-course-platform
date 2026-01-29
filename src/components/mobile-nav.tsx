"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
    const pathname = usePathname();

    const links = [
        {
            href: "/",
            label: "Home",
            icon: Home,
        },
        {
            href: "/courses",
            label: "Courses",
            icon: BookOpen,
        },
        {
            href: "/resources",
            label: "Resources",
            icon: Layers,
        },
        // We can add a profile link or handle it via header
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t pb-safe">
            <div className="flex justify-around items-center h-16">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 w-full h-full text-xs font-medium transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
