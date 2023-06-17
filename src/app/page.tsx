//* Libraries imports
import Image from 'next/image';
import Link from 'next/link';

import BgArt from "@/components/BgArt";

export default function Home() {
  return (
    <div className="relative flex flex-row items-start h-screen min-h-screen">
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden bg-blue-400'>
        <BgArt />
      </div>

      <div className='relative flex flex-row items-center justify-center w-full h-full'>
        {/* left side */}
        <CTA />

        {/* right side */}
        <div className="flex flex-col w-1/4 h-full" />
      </div>
    </div>
  )
}

function CTA() {
  return (
    <div className='flex flex-col items-start justify-center w-3/4 h-full pl-8'>
      <div className='flex flex-col items-start justify-center gap-8 px-12 py-8 bg-neutral-950/20 backdrop-blur-xl rounded-2xl'>
        <h1 className='font-bold text-9xl'>
          Create your<br />
          <span>Yu-Gi-Oh</span>{" "}<br />
          decks!
        </h1>
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-bold'>
            Build strategies, share your deck with friends, and more!
          </p>
          <Button />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <Link href="/login">
      <button className='px-4 py-2 text-xl font-bold bg-purple-800 rounded-lg text-neutral-100'>
        Start now!
      </button>
    </Link>
  )
}