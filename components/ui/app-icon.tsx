"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function VoipeIcon({ className }: { className?: string }) {
    const { theme } = useTheme()

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-primary-foreground transition-colors", className)}
        >
            <path
                d="M12 2C11.4477 2 11 2.44772 11 3V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V3C13 2.44772 12.5523 2 12 2Z"
                className="fill-current opacity-80 transition-opacity"
            />
            <path
                d="M7 6C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18C7.55228 18 8 17.5523 8 17V7C8 6.44772 7.55228 6 7 6Z"
                className="fill-current opacity-60 transition-opacity"
            />
            <path
                d="M17 6C16.4477 6 16 6.44772 16 7V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6Z"
                className="fill-current opacity-60 transition-opacity"
            />
            <path
                d="M2 10C1.44772 10 1 10.4477 1 11V13C1 13.5523 1.44772 14 2 14C2.55228 14 3 13.5523 3 13V11C3 10.4477 2.55228 10 2 10Z"
                className="fill-current opacity-40 transition-opacity"
            />
            <path
                d="M22 10C21.4477 10 21 10.4477 21 11V13C21 13.5523 21.4477 14 22 14C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10Z"
                className="fill-current opacity-40 transition-opacity"
            />
        </svg>
    )
}