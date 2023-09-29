'use client'

import dynamic from 'next/dynamic'

const Trailblazer = dynamic(
  () => import('@pathfinder/core').then(mod => mod.Trailblazer),
  {
    ssr: false
  }
)

import "@pathfinder/core/dist/style.css";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center text-blue-700">
      My cool Next.js app
      <Trailblazer 
        schemaProps={{
          fetcherOptions: {
            endpoint: "https://graphql.earthdata.nasa.gov/api",
          },
        }}
      />
    </main>        
  )
}
