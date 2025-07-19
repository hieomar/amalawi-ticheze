"use client"

import React from 'react'
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react'
import { Avatar, AvatarFallback } from './avatar'

interface VoiceChatProps {
    isOpen?: boolean
    onClose?: () => void
}

export function VoiceChat({ isOpen = false, onClose }: VoiceChatProps) {
    const [isMuted, setIsMuted] = React.useState(false)
    const [isConnected, setIsConnected] = React.useState(false)

    if (!isOpen) return null

    return (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-80 bg-card border border-border rounded-lg shadow-lg">
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Voice Chat</h3>
                    <span className="text-xs text-primary">Live</span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-center mb-6">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full ${isMuted ? 'bg-destructive text-destructive-foreground' : 'bg-muted hover:bg-accent'}`}
                    >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                        onClick={() => {
                            setIsConnected(!isConnected)
                            if (!isConnected) onClose?.()
                        }}
                        className={`p-3 rounded-full ${isConnected ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                    >
                        {isConnected ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    )
}