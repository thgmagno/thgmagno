import Link from "next/link";
import { ThemeToggleButton } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function AppNavbar() {
    return (
        <nav className="flex items-center p-2 md:p-4 gap-1 sticky top-0 z-10 bg-background">
            <AppNavItem href="/" label="Início" />
            <AppNavItem href="#projetos" label="Projetos" />
            <AppNavItem href="#contato" label="Contato" />
            <div className="h-8 border-r-2 ml-auto mx-1" />
            <ThemeToggleButton />
        </nav>
    )
}

interface AppNavItemProps {
    href: string,
    label: string
}

function AppNavItem({ href, label }: AppNavItemProps) {
    return (
        <Link
            href={href}
            className={cn(buttonVariants({ variant: "ghost" }), "font-bold")}
        >
            {label}
        </Link>
    )
}