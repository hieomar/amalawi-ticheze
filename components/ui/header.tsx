import Link from "next/link";
import { ModeToggle } from "../theme-switcher";

export default function Header() {
    return (
        <header>
            <nav className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">V</span>
                        </div>
                        <span className="text-foreground font-semibold text-xl">
                            <span className="hidden sm:inline">Void Chat</span>
                            <span className="sm:hidden">Void</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <button className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                            <Link className="hidden sm:inline" href={"/login"}>Sign In</Link>
                            <Link className="sm:hidden" href={"/login"}>Sign</Link>
                        </button>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base">
                            <Link className="hidden sm:inline" href={"/register"}>Get Started</Link>
                            <Link className="sm:hidden" href={"/register"}>Start</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </header >
    )
}