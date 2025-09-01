"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const pathname = usePathname();
  
  // Mock authentication state - in a real app, this would come from a context or hook
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Polling App</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/polls"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/polls" ? "text-primary" : "text-muted-foreground"}`}
            >
              Polls
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            {isAuthenticated ? (
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}