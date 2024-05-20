"use client";

import { Prisma, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ProfileLink } from "../profile/profile-link";

interface SearchBarProps {
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({ className }) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (User & {
        _count: Prisma.UserCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className={cn(
        "relative rounded-2xl border max-w-lg z-50 overflow-visible",
        className,
        input.length > 0 && "rounded-b-none",
      )}
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        placeholder="Puesto, empresa o palabra clave"
        className="pr-6"
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-border top-full inset-x-0 shadow rounded-b-md border-2">
          {isFetched && (
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Usuarios">
              {queryResults?.map((user) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/${e}`);
                    router.refresh();
                  }}
                  key={user.id}
                  value={user.username || "explore"}
                  className="hover:bg-accent"
                >
                  <ProfileLink
                    user={user}
                    className="px-0 py-2 hover:bg-transparent"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
      {input.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute w-6 h-6 bg-accent right-0 top-1/2 transform -translate-y-1/2 mr-2"
          onClick={() => setInput("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Command>
  );
};

export default SearchBar;
