//* Libraries imports
import Image from 'next/image';
import Link from 'next/link';

import BgArt from "@/components/BgArt";

export default function Home() {
  return (
    <div className="flex flex-row items-start min-h-screen relative">
      <div className='absolute left-0 top-0 w-full h-full'>
        <BgArt />
      </div>

      <div className='flex flex-row justify-center items-center w-full h-full relative'>
        {/* left side */}
        <CTA />

        {/* right side */}
        <div className="flex flex-col w-full h-full bg-yellow-500" />
      </div>
    </div>
  )
}

function CTA() {
  return (
    <div className='flex flex-col justify-start bg-red-500 items-center w-full h-full text-white'>
      <h1 className=''>
        Create your Yu-Gi-Oh deck!
      </h1>
      <p>
        Build strategies, share your deck with friends, and more!
      </p>
      <Button />
    </div>
  );
}

function Button() {
  return (
    <Link href="/login">
      <span>
        Start now!
      </span>
    </Link>
  )
}