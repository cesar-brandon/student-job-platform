import { simplifyName } from "@/lib/utils";
import CareerCard from "../survey/CareerCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { user } from "@/types/next-auth";

const MiniProfile = ({ user }: { user: user }) => {

  return (
    <CareerCard career="DS"
      className="min-h-[15rem] w-full px-8 rounded-b-xl rounded-t-none items-start justify-start"
      classNameIcon="right-[-5rem] scale-125"
    >
      <div className="flex mt-12 gap-4 items-center z-10">
        <Avatar>
          <AvatarImage src={user.image} alt="avatar" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">
            {user.name}
          </h3>
          <p className="text-black text-opacity-50">
            @{user.username}
          </p>
        </div>
      </div>
    </CareerCard >
  );
};

export default MiniProfile;
