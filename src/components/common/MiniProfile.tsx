import { simplifyName } from "@/lib/utils";
import { useSession } from "next-auth/react";
import CareerCard from "../survey/CareerCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function getFirstTwoWords(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  return firstTwoWords.join(" ");
}

function generateUsername(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const username = `@${firstTwoWords.join("").toLowerCase()}`;
  return username;
}

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <CareerCard career="DS"
      className="min-h-[15rem] w-full px-8 rounded-b-xl rounded-t-none items-start justify-start"
      classNameIcon="right-[-5rem] scale-125"
    >
      <div className="flex mt-12 gap-4 items-center z-10">
        {session && (
          <>
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={session.user.image}
                  alt={`@${session.user.name}`}
                />
                <AvatarFallback>
                  {simplifyName(session.user.name.toUpperCase())}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-bold">
                {getFirstTwoWords(session.user.name)}
              </h3>
              <p className="text-black text-opacity-50">
                {generateUsername(session.user.name)}
              </p>
            </div>
          </>
        )}
      </div>
    </CareerCard >
  );
};

export default MiniProfile;
