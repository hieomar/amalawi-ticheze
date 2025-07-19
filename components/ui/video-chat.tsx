"use client"

import React from 'react'
import { Camera, CameraOff, Mic, MicOff, Phone, PhoneOff } from 'lucide-react'

interface VideoChatProps {
    isOpen?: boolean
    onClose?: () => void
}

export function VideoChat({ isOpen = false, onClose }: VideoChatProps) {
    const [isMuted, setIsMuted] = React.useState(false)
    const [isVideoOff, setIsVideoOff] = React.useState(false)
    const [isConnected, setIsConnected] = React.useState(false)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-4 sm:inset-16 bg-card border border-border rounded-lg shadow-lg flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-medium">Video Chat</h3>
                    <span className="text-sm text-primary">Live</span>
                </div>

                <div className="flex-1 bg-muted rounded-lg m-4 relative">
                    {/* Video placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground">Camera not connected</span>
                    </div>

                    {/* Self view */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-card border border-border rounded-lg shadow-lg"></div>
                </div>

                <div className="p-4 border-t border-border">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`p-3 rounded-full ${isMuted ? 'bg-destructive text-destructive-foreground' : 'bg-muted hover:bg-accent'}`}
                        >
                            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`p-3 rounded-full ${isVideoOff ? 'bg-destructive text-destructive-foreground' : 'bg-muted hover:bg-accent'}`}
                        >
                            {isVideoOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
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
        </div>
    )
}