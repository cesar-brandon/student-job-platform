"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import type { User } from "@prisma/client";
import { cn, simplifyName } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: User[];
  user: User;
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
  user,
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    user.email,
  );

  const handleAccountChange = async (email: string) => {
    setSelectedAccount(email);
    await signIn("email", { email });
  };

  const currentSelectedAccount =
    accounts.find((account) => account.email === selectedAccount) ?? user;

  return (
    <Select defaultValue={selectedAccount} onValueChange={handleAccountChange}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={currentSelectedAccount.image || ""}
              alt="Foto de perfil"
            />
            <AvatarFallback>
              {simplifyName(currentSelectedAccount.name.toUpperCase())}
            </AvatarFallback>
          </Avatar>

          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {
              accounts.find((account) => account.email === selectedAccount)
                ?.name
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <Avatar className="w-7 h-7">
                <AvatarImage src={account.image || ""} alt="Foto de perfil" />
                <AvatarFallback>
                  {simplifyName(account.name.toUpperCase())}
                </AvatarFallback>
              </Avatar>

              <span className="max-w-40 truncate">{account.email}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
