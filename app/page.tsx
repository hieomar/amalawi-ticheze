import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="text-foreground font-semibold text-xl">Void Chat</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </button>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground mb-6">
              <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
              Level up your conversations
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Chat in the Void
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience seamless real-time communication. Earn XP, unlock achievements,
              and level up your chat game with our gamified PWA.
            </p>
          </div>

          {/* Game Stats Preview */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Level</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">XP</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Achievements</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
              Start Your Journey
            </button>
            <button className="border border-border hover:bg-accent text-foreground px-8 py-3 rounded-lg font-medium transition-colors">
              View Demo
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/globe.svg"
                  alt="Real-time icon"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Instant messaging with WebSocket technology
              </p>
              <div className="text-xs text-muted-foreground">
                🏆 +10 XP per message
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/window.svg"
                  alt="PWA icon"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Progressive Web App</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Install and use offline with native experience
              </p>
              <div className="text-xs text-muted-foreground">
                🎯 Unlock "Mobile Warrior"
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/file.svg"
                  alt="Achievement icon"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Achievement System</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Earn badges and level up as you chat
              </p>
              <div className="text-xs text-muted-foreground">
                ⭐ 25+ achievements to unlock
              </div>
            </div>
          </div>

          {/* Progress Bar Example */}
          <div className="max-w-md mx-auto mt-12 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Next Level</span>
              <span className="text-xs text-muted-foreground">0 / 100 XP</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
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
      </footer>
    </div>
  );
}
