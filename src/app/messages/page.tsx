//* Libraries imports

//* Components imports
import { Thread } from "@/components/Thread"

const messages = [
  {
    message: "https://images.ygoprodeck.com/images/cards/4031928.jpg",
    sending: false,
  },
  {
    message: "https://images.ygoprodeck.com/images/cards/38033121.jpg",
    sending: false,
  }
]

export default async function Index() {
  return (
    <div>
      <Thread messages={messages} />
    </div>
  )
}