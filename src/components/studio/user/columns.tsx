import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User, UserRole } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { careerData, roleData, simplifyName } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "avatar",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original.image || ""}
            alt="Imagen del estudiante"
          />
          <AvatarFallback>{simplifyName(row.getValue("name"))}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role: UserRole = row.getValue("role") as UserRole;
      const variant = roleData[role].variant;
      return <Badge variant={variant}>{row.getValue("role")}</Badge>;
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const item = row.original;
  //
  //     return (
  //       <div className="flex items-center p-2">
  //         <Button variant="outline">
  //           <Eye className="h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
