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
        endpoint: "https://meowwoof-grafbase-main-jonathanawesome.grafbase.app/graphql",
        headers: [[
          "x-api-key",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgwNjY5NTQsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFHVFQ5QkNGNDM1RkRDWEtFUDdYUlJTS1oiLCJqdGkiOiIwMUdUVDlCQ0Y0UkJOVFY1NzFNNTk2V1MwNSIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.m2cmHEvgkD3-4z59lyKNppjafvgVKqLdypJ2UbiQ1qU"
        ]]
      }
    }}
    >
      <Scout />
    </Trailblazer>
  )
}
