import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? 'bg-sky-500' : '';
  const sendedAt = new Date(message.createdAt);
  const minutes =
    sendedAt.getMinutes() < 10
      ? '0' + sendedAt.getMinutes()
      : sendedAt.getMinutes();
  const shakeClass = message.shouldShake ? 'shake' : '';
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={`https://${profilePic}`}
            alt="tailwind Css chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {`${sendedAt.getHours()}: ${minutes}`}
      </div>
    </div>
  );
};
export default Message;
