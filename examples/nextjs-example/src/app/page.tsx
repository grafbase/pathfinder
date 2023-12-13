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
    <main className="flex h-full flex-col items-center overflow-hidden">
      <div className="flex items-center gap-4 text-blue-700">
        <h1>My cool Next.js app</h1>

        <button 
          className="text-pink-700"
          onClick={async () => {
            const setPathfinderTheme = (await import('@pathfinder-ide/react')).setPathfinderTheme
            setPathfinderTheme({theme: "dark"})
          }}
        >
          go dark
        </button>


        <button 
          className="text-pink-700"
          onClick={async () => {
            const setPathfinderTheme = (await import('@pathfinder-ide/react')).setPathfinderTheme
            setPathfinderTheme({theme: "light"})
          }}
        >
          go light
        </button>

        <button 
          className="text-pink-700"
          onClick={async () => {
            const setPathfinderTheme = (await import('@pathfinder-ide/react')).setPathfinderTheme
            setPathfinderTheme({theme: "system"})
          }}
        >
          go system
        </button> 


  
      </div>
    
      <Pathfinder 
        fetcherOptions={{
          endpoint: "https://graphql.earthdata.nasa.gov/api",
        }}
        schemaPollingOptions={{
          enabled: true
        }}
        themeOptions={{
          overrides:{
            dark:{
              color:{
                neutral:{
                  "1": 'green'
                }
              }
            },
            light:{
              color:{
                neutral:{
                  "1": 'blue'
                }
              }
            }            
          }
        }}
      />
    </main>        
  )
}
