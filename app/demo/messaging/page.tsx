import Header from "@/components/ui/header";
import { Chat } from "@/components/ui/chat";

export default function MessagingDemo() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
                <div className="h-full max-w-4xl mx-auto flex flex-col">
                    <Chat />
                </div>
            </main>
        </div>
    );
} 