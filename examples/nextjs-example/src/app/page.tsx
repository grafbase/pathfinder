'use client'

import dynamic from 'next/dynamic'

const Trailblazer = dynamic(
  () => import('@pathfinder/core').then(mod => mod.Trailblazer),
  {
    ssr: false
  }
)

const Scout = dynamic(
  () => import('@pathfinder/core').then(mod => mod.Scout),
  {
    ssr: false
  }
)

import "@pathfinder/pathfinder/dist/style.css";


export default function Home() {
  return (
    <Trailblazer
    schemaProps={{
      fetcherOptions:{
        endpoint: "https://.com",
        headers: [[
          "x-api-key",
          "XXX"
        ]]
      }
    }}
    >
      <Scout />
    </Trailblazer>
  )
}
