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
        src: '/next.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/next.svg',
        sizes: '512x512', 
        type: 'image/svg+xml',
      },
    ],
  }
}