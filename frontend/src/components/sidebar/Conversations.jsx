import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-3 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner" /> : null}
    </div>
  );
};
export default Conversations;
