import Header from "@/components/ui/header";
import Link from "next/link";
import { MessageSquare, Video, Mic } from "lucide-react";

export default function DemoSelection() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Choose Demo Type
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/messaging"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <MessageSquare className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Messaging</h2>
              <p className="text-sm text-muted-foreground text-center">
                Try our real-time text messaging demo
              </p>
            </Link>

            <Link
              href="/video"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <Video className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Video Chat</h2>
              <p className="text-sm text-muted-foreground text-center">
                Experience face-to-face video chat
              </p>
            </Link>

            <Link
              href="/voice"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <Mic className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Voice Chat</h2>
              <p className="text-sm text-muted-foreground text-center">
                Try our voice-only chat feature
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
