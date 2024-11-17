import { faker } from "@faker-js/faker";
import { BaseTableEntity } from "./types.ts";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

export interface UserTableEntity extends BaseTableEntity {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

const generateUsers = (count: number) => {
  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    users.push({
      id: i.toString(),
      firstName: faker.internet.displayName(),
      lastName: faker.internet.username(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      isAdmin: false,
    });
  }

  return users;
};

export const users = generateUsers(1000);
