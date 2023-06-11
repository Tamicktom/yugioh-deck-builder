'use client';
import Image from 'next/image';
import { experimental_useOptimistic as useOptimistic, useRef } from 'react';
import { sendMessage } from '@/actions/sendMessage';

type Props = {
  messages: {
    message: string;
    sending: boolean;
  }[];
}

export function Thread({ messages }: Props) {

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [...state, { message: newMessage, sending: true }],
  );
  const formRef = useRef<HTMLFormElement>();

  return (
    <div>
      {optimisticMessages.map((m, index) => (
        <div key={index}>
          {
            m.sending
              ? <span>Loading</span>
              : <Image alt="Image" width={421 / 2} height={614 / 2} src={m.message} />
          }
        </div>
      ))}
      <form
        action={async (formData) => {
          const message = formData.get('message');
          if (!message) {
            return;
          }
          const text = message.toString();
          if (formRef.current) {
            formRef.current.reset();
          }
          addOptimisticMessage(text);
          await sendMessage(text);
        }}
        ref={(props) => {
          if (props) {
            formRef.current = props;
          }
        }}
      >
        <input type="text" name="message" style={{
          color: 'black',
        }} />
      </form>
    </div>
  );
}