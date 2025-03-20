import { useAuth } from '@context';

export const UserProfile: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { userData } = useAuth();
  return (
    <div className="flex md:gap-3 gap-2 items-center">
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full bg-grayTxt flex items-center justify-center font-bold text-basicWhite`}
        >
          {userData?.firstName[0].toUpperCase()}
          {userData?.lastName[0].toUpperCase()}
        </div>
      </div>
      <span className={`${className} text-neutralGray`}>
        {userData?.firstName} {userData?.lastName}
      </span>
    </div>
  );
};
export default UserProfile;
