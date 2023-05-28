import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-between min-h-screen">
      <div className='w-1/2'></div>
      <div className='w-1/2'>
        <h1>Yugioh Deck Builder</h1>
        <p>A deck builder for Yugioh</p>
      </div>
    </main>
  )
}
