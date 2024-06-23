import { Fragment } from "react";
import SearchBar from "@/components/common/search-bar";
import { ProfileLink } from "@/components/profile/profile-link";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import getUsers from "@/lib/data/getUsers";

const ExplorePage = async () => {
  const users = await getUsers();

  if (!users) return null;

  return (
    <div className="flex flex-col gap-4 px-6 md:px-0">
      <SearchBar className="mx-auto" />
      <div>
        {users.map((user: User) => (
          <Fragment key={user.id}>
            <ProfileLink
              user={user}
              key={user.id}
              className="px-0 hover:bg-transparent"
            />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
