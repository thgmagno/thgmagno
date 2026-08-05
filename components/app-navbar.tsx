"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { ThemeToggleButton } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Início" },
    { href: "/projetos", label: "Projetos" },
    { href: "/contato", label: "Contato" },
] satisfies { href: Route; label: string }[];

export function AppNavbar() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center p-2 md:p-4 gap-1 sticky top-0 z-10 bg-background">
            {navItems.map((item) => (
                <AppNavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={pathname === item.href}
                />
            ))}
            <div className="h-8 border-r-2 ml-auto mx-1" />
            <ThemeToggleButton />
        </nav>
    )
}

interface AppNavItemProps {
    href: Route,
    label: string,
    active: boolean
}

function AppNavItem({ href, label, active }: AppNavItemProps) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-bold",
                active ? "bg-muted text-foreground" : "text-muted-foreground"
            )}
        >
            {label}
        </Link>
    )
}
