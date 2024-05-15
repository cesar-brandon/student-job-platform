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
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { UsersIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
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
      className="relative rounded-2xl border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        placeholder="Puesto, empresa o palabra clave"
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-border top-full inset-x-0 shadow rounded-b-md">
          {isFetched && (
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Usuarios">
              {queryResults?.map((subreddit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/${e}`);
                    router.refresh();
                  }}
                  key={subreddit.id}
                  value={subreddit.name}
                >
                  <UsersIcon className="mr-2 h-4 w-4" />
                  <a href={`/${subreddit.username}`}>@{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
