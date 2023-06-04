import { cookies } from 'next/headers';

export default function AddToCart() {
  async function addItem() {
    'use server';

    console.log("Adding item to cart...");
  }

  async function removeItem() {
    'use server';

    console.log("Removing item from cart...");
  }

  return (
    <div>
      <form action={addItem}>
        <button type="submit">Add to Cart</button>
      </form>
      <form action={removeItem}>
        <button type="submit">Remove from Cart</button>
      </form>
    </div>
  );
}