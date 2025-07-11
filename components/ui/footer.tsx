export default function Footer() {
    return (
        <footer className="border-t border-border bg-card" >
            <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs">V</span>
                        </div>
                        <span className="text-muted-foreground text-sm">© 2024 Void Chat. Start your journey.</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer >

    )
}