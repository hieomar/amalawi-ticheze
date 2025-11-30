"use client";
import Header from "@/components/ui/header";
import Link from "next/link";
import { MessageSquare, Video, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAuthStore } from "@/states/auth.state";
import { useRouter } from "next/navigation";

export default function OptionsPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // Always call this hook — even if user is null
  const { register } = useSocket(user?._id || "");

  // Redirect effect (safe)
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    register(user._id);
    // return () => cleanup("chat-list");
  }, [user]);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Lets TalK</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/messaging"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <MessageSquare className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Messaging</h2>
              <p className="text-sm text-muted-foreground text-center">
                Not ready for voice chat yet? Try out text messaging
              </p>
            </Link>
            <Link
              href="/voice"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <Mic className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Voice Chat</h2>
              <p className="text-sm text-muted-foreground text-center">
                Not ready for face-to-face video chat yet? Try our voice chat
              </p>
            </Link>
            <Link
              href="/video"
              className="flex flex-col items-center p-6 bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <Video className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Video Chat</h2>
              <p className="text-sm text-muted-foreground text-center">
                Experience face-to-face video chat and boost your communication
                skills
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
function cleanup(arg0: string): void | { [UNDEFINED_VOID_ONLY]: never } {
  throw new Error("Function not implemented.");
}
