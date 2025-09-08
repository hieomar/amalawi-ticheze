"use client";

import { LogOut, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../theme-switcher";
import { VoipeIcon } from "./app-icon";
import { InstallButton } from "./install-button";
import { useAuthStore } from "@/states/auth.state";
import { Button } from "./button";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header>
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / App Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-colors">
              <VoipeIcon />
            </div>
            <span className="text-foreground font-semibold text-xl">
              <span className="hidden sm:inline">Void Chat</span>
              <span className="sm:hidden">Void</span>
            </span>
          </div>

          {/* Right-side Controls */}
          <div className="flex items-center gap-4">
            <InstallButton />
            <ModeToggle />

            {!user ? (
              // Not authenticated → show Sign In + Get Started
              <>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Sign</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </Link>
              </>
            ) : (
              // Authenticated → show user info + logout
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base text-foreground">
                  Hi, {user.username}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={logout}
                  className="sm:h-9 sm:w-auto sm:px-3"
                  // className="bg-destructive hover:bg-destructive/90 text-white px-3 py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
