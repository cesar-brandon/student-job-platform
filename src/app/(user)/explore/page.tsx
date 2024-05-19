import SearchBar from "@/components/common/search-bar";
import { ProfileLink } from "@/components/profile/profile-link";
import { db } from "@/lib/prisma";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

const ExplorePage = async () => {
  const users = await db.user.findMany();

  if (!users) return null;

  return (
    <div className="flex flex-col gap-4">
      <SearchBar className="mx-auto" />
      <div>
        {users.map((user: User) => (
          <>
            <ProfileLink
              user={user}
              key={user.id}
              className="px-0 hover:bg-transparent"
            />
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
