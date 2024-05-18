import { Student } from "@prisma/client";

export type ExtendedStudent = Student & {
  User: User;
};
