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
    <Trailblazer />
  )
}
