import { PageHeading, ResizableSlider } from '@components';
import { MessagesLeftPanel } from './components/MessagesLeftPanel';
import { MessagesRightPanel } from './components/MessagesRightPanel';
import {
  APP_ACTIONS,
  ICONS,
  MESSAGES_DATA,
  PERMISSIONS,
  ROUTES,
} from '@constants';
import { useAuth, useMessage } from '@context';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const MessagesPage: React.FC = () => {
  const { userData } = useAuth();
  const { selectedMessage, setSelectedMessage } = useMessage();
  const navigate = useNavigate();
  const userPermissions =
    PERMISSIONS[userData?.role as keyof typeof PERMISSIONS];

  useEffect(() => {
    if (MESSAGES_DATA && MESSAGES_DATA.length > 0 && window.innerWidth > 768) {
      navigate(`/messages?id=${MESSAGES_DATA[0]._id}`);
    }
  }, []);

  const handleClick = () => {
    setSelectedMessage(null);
  };

  if (!userPermissions.includes(APP_ACTIONS.messagesPage))
    return <Navigate to={ROUTES.not_available} />;
  return (
    <section className="pt-20 md:pt-0 h-screen w-full">
      <div className="md:px-14 px-2 flex justify-between items-center border-b py-8">
        <PageHeading label="Messages" />
      </div>

      <div className="w-full h-[calc(100vh-8rem)]">
        <ResizableSlider
          Left={MessagesLeftPanel}
          Right={
            <div
              className={`relative md:w-2/3 ${selectedMessage === null ? 'w-0' : 'w-full'
                }`}
            >
              <button
                onClick={handleClick}
                className={`text-basicGreen text-[30px] absolute left-2 top-3 z-20 md:hidden ${selectedMessage === null ? 'hidden' : 'block'
                  }`}
              >
                <ICONS.leftArrow />
              </button>
              <MessagesRightPanel />
            </div>
          }
        />
      </div>
    </section>
  );
};

export default MessagesPage;
