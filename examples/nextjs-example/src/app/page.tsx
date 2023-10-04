'use client'

import dynamic from 'next/dynamic'

const Pathfinder = dynamic(
  () => import('@pathfinder/react').then(mod => mod.Pathfinder),
  {
    ssr: false
  }
)

import "@pathfinder/react/dist/style.css";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center text-blue-700">
      My cool Next.js app
      <Pathfinder 
        schemaProps={{
          fetcherOptions: {
            endpoint: "https://graphql.earthdata.nasa.gov/api",
          },
        }}
      />
    </main>        
  )
}
