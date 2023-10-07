'use client'

import dynamic from 'next/dynamic'

// dynamically import our React component
const Pathfinder = dynamic(
  () => import('@pathfinder-ide/react').then(mod => mod.Pathfinder),
  {
    ssr: false
  }
)

import "@pathfinder-ide/react/dist/style.css";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center">
      <div className="flex items-center gap-4 text-blue-700">
        <h1>My cool Next.js app</h1>
        <button 
        className="text-pink-700"
        onClick={async () => {
          // these imports include calls to navigator (via monaco editor), so we dynamically import the data and function that we need to adjust the theme
          const activeTheme = (await import('@pathfinder-ide/react')).usePathfinderThemeStore.getState().activeTheme
          const setPathfinderTheme = (await import('@pathfinder-ide/react')).setPathfinderTheme
          
          if (activeTheme === "dark") {
            setPathfinderTheme({theme: "light"})
          }
          if (activeTheme === "light") {
            setPathfinderTheme({theme: "dark"})
          }          
        }}>Toggle theme</button>
      </div>
    
      <Pathfinder 
        schemaProps={{
          fetcherOptions: {
            endpoint: "https://graphql.earthdata.nasa.gov/api",
          },
          withPolling: true
        }}
      />
    </main>        
  )
}
