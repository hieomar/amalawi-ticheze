import { ThemeSwitcher } from "../theme-switcher";

export default function Header() {
    return (
        <nav className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">V</span>
                    </div>
                    <span className="text-foreground font-semibold text-xl">Void Chat</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Sign In
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}