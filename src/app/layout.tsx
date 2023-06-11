//* Libraries imports
import { Roboto_Flex } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export const metadata = {
  title: 'Yugioh Deck Builder',
  description: 'A deck builder for Yugioh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className + " bg-neutral-950 text-neutral-100"}>
        {children}
      </body>
    </html>
  )
}
