'use client';

type Props = {
  increment: () => Promise<void>;
}

export default function LikeButton({ increment }: Props) {
  return (
    <button
      onClick={async () => {
        await increment();
      }}
    >
      Like
    </button>
  );
}