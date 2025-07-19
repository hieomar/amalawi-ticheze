"use client"

import React from 'react'
import { Download } from 'lucide-react'
import { Button } from './button'

export function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
    const [isInstallable, setIsInstallable] = React.useState(false)

    React.useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setIsInstallable(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        try {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                setIsInstallable(false)
            }
        } catch (error) {
            console.error('Error installing app:', error)
        }
    }

    if (!isInstallable) return null

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleInstallClick}
            className="sm:size-auto sm:px-3"
        >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Install App</span>
        </Button>
    )
}