import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useEffect, useRef } from 'react';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' }, 100);
    });
  }, [messages]);

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef} className="pb-1">
              <Message message={message} />
            </div>
          ))}

        {loading &&
          [...Array(3)].map((message, idx) => <MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <p className="text-center">Send a message to start a conversation</p>
        )}
      </div>
    </>
  );
};
export default Messages;
