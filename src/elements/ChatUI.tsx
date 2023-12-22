import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatUI = ({ messages, color }) => {
  const messagesContainerRef = useRef(null);

  return (
    <div className="flex flex-col bg-gray-50 items-start h-[75vh] overflow-auto">
      <div className="flex flex-col w-full space-y-4 h-full">
        {messages?.slice(2).map((message) => {
          const style =
            message.role === 'user'
              ? 'bg-green-300 self-end text-black'
              : 'bg-green-300 self-start text-white';
          const id = uuidv4();

          return (
            <div
              key={id}
              className={`rounded-lg py-2 px-4 ${style} max-w-[40%]`}
              style={{ backgroundColor: message.role === 'model' && color }}
              ref={messagesContainerRef}
            >
              {message.parts}
            </div>
          );
        })}
        {messages?.length <= 2 && 'No Messages Yet'}
      </div>
    </div>
  );
};

export default ChatUI;
