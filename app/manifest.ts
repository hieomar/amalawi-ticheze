import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'amalawi ticheze',
    short_name: 'AMT',
    description: 'An application for talking with different people all around Malawi',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256', 
        type: 'image/png',
      },
     {
        src: '/icon-512x512.png',
        sizes: '512x512', 
        type: 'image/png',
      }, {
        src: '/icon-1024x1024.png',
        sizes: '1024x1024', 
        type: 'image/png',
      },],
  }
}