//* Libraries imports

//* Components import
import LikeButton from '@/components/like-button';

export default function Page() {
  

  async function increment() {
    'use server';
    console.log("Incrementing...");
  }

  return (
    <div>
      <LikeButton increment={increment} />
    </div>
  );
}