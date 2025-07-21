import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Connect with random strangers worldwide</span>
              <span className="sm:hidden">Random chats</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Meet New People in the Void
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              <span className="hidden sm:inline">Instantly connect with random people through video calls, voice chats, or text messages. Make new friends, earn XP, and unlock achievements in our gamified chat platform.</span>
              <span className="sm:hidden">Random video calls, voice chats, and messages with new people. Earn XP and achievements.</span>
            </p>
          </div>

          {/* Game Stats Preview */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Level</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">XP</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                <span className="hidden sm:inline">Achievements</span>
                <span className="sm:hidden">Awards</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
            <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
              <Link className="hidden sm:inline" href={"/register"}>Start Your Journey</Link>
              <Link className="sm:hidden" href={"/register"}>Start Journey</Link>
            </button>
            <Link className="w-full sm:w-auto border border-border hover:bg-accent text-foreground px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors" href={"/demo/chat"}>
              View Demo
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Image
                  src="/globe.svg"
                  alt="Random chat icon"
                  width={18}
                  height={18}
                  className="opacity-60 sm:w-5 sm:h-5"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                <span className="hidden sm:inline">Random Video Calls</span>
                <span className="sm:hidden">Video Chat</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                <span className="hidden sm:inline">Meet new people face-to-face through random video matches</span>
                <span className="sm:hidden">Random video matches</span>
              </p>
              <div className="text-xs text-muted-foreground">
                🎥 +15 XP per video chat
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Image
                  src="/window.svg"
                  alt="Voice chat icon"
                  width={18}
                  height={18}
                  className="opacity-60 sm:w-5 sm:h-5"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                <span className="hidden sm:inline">Random Voice Chat</span>
                <span className="sm:hidden">Voice Chat</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                <span className="hidden sm:inline">Have anonymous voice conversations with strangers</span>
                <span className="sm:hidden">Anonymous calls</span>
              </p>
              <div className="text-xs text-muted-foreground">
                🎤 +10 XP per voice chat
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Image
                  src="/file.svg"
                  alt="Text chat icon"
                  width={18}
                  height={18}
                  className="opacity-60 sm:w-5 sm:h-5"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                <span className="hidden sm:inline">Random Text Chat</span>
                <span className="sm:hidden">Text Chat</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                <span className="hidden sm:inline">Message random strangers anonymously and safely</span>
                <span className="sm:hidden">Anonymous messages</span>
              </p>
              <div className="text-xs text-muted-foreground">
                💬 +5 XP per conversation
              </div>
            </div>
          </div>

          {/* Progress Bar Example */}
          <div className="max-w-sm sm:max-w-md mx-auto mt-8 sm:mt-12 p-3 sm:p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-foreground">Next Level</span>
              <span className="text-xs text-muted-foreground">0 / 100 XP</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
            </div>
          </div>
        </div >
      </main >
      <Footer />
    </div >
  );
}