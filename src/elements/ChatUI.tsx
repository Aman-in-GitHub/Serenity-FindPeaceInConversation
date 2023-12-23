import { useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ChatUI = ({ messages, color, isFetching, welcomeMsg }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && isFetching) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isFetching]);

  return (
    <div className="flex flex-col bg-[#f4f4f4] dark:bg-[#191919] items-start h-[78vh] lg:h-[77vh] overflow-auto chatUI">
      <div className="flex flex-col w-full space-y-4 lg:space-y-6 h-full px-2 lg:px-4 pt-2 lg:pt-4">
        {messages?.length > 2 ? (
          messages?.slice(2).map((message) => {
            const style = message.role === 'user' ? 'self-end' : 'self-start';

            return (
              <div
                key={message.index}
                className={`rounded-lg py-2 px-4 ${style} max-w-[80%] md:max-w-[60%] lg:max-w-[40%] bg-[#333333] text-white dark:bg-white dark:text-black`}
                style={{
                  backgroundColor: message.role === 'model' && color,
                  color: message.role === 'model' && 'white'
                }}
              >
                <span className="pb-5 lg:pb-6">{message.parts}</span>
              </div>
            );
          })
        ) : (
          <div className="flex w-full h-full justify-center items-center select-none text-center">
            <span className="text-xl" style={{ color: color }}>
              {welcomeMsg}
            </span>
          </div>
        )}

        {isFetching && (
          <div className="pb-2 lg:pb-4 select-none">
            <Skeleton className="h-28 w-[80%] md:w-[60%] lg:w-[40%] rounded-lg pb-4" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatUI;
