// Mock data entities
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

export const users: User[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    age: 30,
    email: "alice@example.com",
    isAdmin: true,
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    age: 25,
    email: "bob@example.com",
    isAdmin: false,
  },
  {
    id: "3",
    firstName: "Carol",
    lastName: "Williams",
    age: 28,
    email: "carol@example.com",
    isAdmin: false,
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Brown",
    age: 30,
    email: "david@example.com",
    isAdmin: false,
  },
  {
    id: "5",
    firstName: "Eve",
    lastName: "Jones",
    age: 27,
    email: "eve@example.com",
    isAdmin: false,
  },
  {
    id: "6",
    firstName: "Frank",
    lastName: "Garcia",
    age: 32,
    email: "frank@example.com",
    isAdmin: false,
  },
  {
    id: "7",
    firstName: "Grace",
    lastName: "Martinez",
    age: 30,
    email: "grace@example.com",
    isAdmin: false,
  },
  {
    id: "8",
    firstName: "Henry",
    lastName: "Robinson",
    age: 31,
    email: "henry@example.com",
    isAdmin: false,
  },
  {
    id: "9",
    firstName: "Ivy",
    lastName: "Clark",
    age: 26,
    email: "ivy@example.com",
    isAdmin: false,
  },
  {
    id: "10",
    firstName: "Jack",
    lastName: "Lewis",
    age: 31,
    email: "jack@example.com",
    isAdmin: false,
  },
  {
    id: "11",
    firstName: "Karen",
    lastName: "Walker",
    age: 24,
    email: "karen@example.com",
    isAdmin: false,
  },
  {
    id: "12",
    firstName: "Leo",
    lastName: "Young",
    age: 31,
    email: "leo@example.com",
    isAdmin: false,
  },
  {
    id: "13",
    firstName: "Megan",
    lastName: "Hall",
    age: 31,
    email: "megan@example.com",
    isAdmin: false,
  },
  {
    id: "14",
    firstName: "Nina",
    lastName: "Allen",
    age: 27,
    email: "nina@example.com",
    isAdmin: false,
  },
  {
    id: "15",
    firstName: "Oscar",
    lastName: "Scott",
    age: 29,
    email: "oscar@example.com",
    isAdmin: false,
  },
  {
    id: "16",
    firstName: "Paula",
    lastName: "Adams",
    age: 33,
    email: "paula@example.com",
    isAdmin: false,
  },
  {
    id: "17",
    firstName: "Quinn",
    lastName: "Baker",
    age: 26,
    email: "quinn@example.com",
    isAdmin: false,
  },
  {
    id: "18",
    firstName: "Rachel",
    lastName: "Gonzalez",
    age: 31,
    email: "rachel@example.com",
    isAdmin: false,
  },
  {
    id: "19",
    firstName: "Sam",
    lastName: "Nelson",
    age: 34,
    email: "sam@example.com",
    isAdmin: false,
  },
  {
    id: "20",
    firstName: "Tina",
    lastName: "Carter",
    age: 28,
    email: "tina@example.com",
    isAdmin: false,
  },
  {
    id: "21",
    firstName: "Umar",
    lastName: "Mitchell",
    age: 32,
    email: "umar@example.com",
    isAdmin: false,
  },
  {
    id: "22",
    firstName: "Vera",
    lastName: "Perez",
    age: 25,
    email: "vera@example.com",
    isAdmin: false,
  },
  {
    id: "23",
    firstName: "Will",
    lastName: "Roberts",
    age: 30,
    email: "will@example.com",
    isAdmin: false,
  },
  {
    id: "24",
    firstName: "Xander",
    lastName: "Turner",
    age: 27,
    email: "xander@example.com",
    isAdmin: false,
  },
  {
    id: "25",
    firstName: "Yara",
    lastName: "Phillips",
    age: 26,
    email: "yara@example.com",
    isAdmin: false,
  },
  {
    id: "26",
    firstName: "Zack",
    lastName: "Campbell",
    age: 31,
    email: "zack@example.com",
    isAdmin: false,
  },
  {
    id: "27",
    firstName: "Anna",
    lastName: "Parker",
    age: 28,
    email: "anna@example.com",
    isAdmin: false,
  },
  {
    id: "28",
    firstName: "Brian",
    lastName: "Evans",
    age: 33,
    email: "brian@example.com",
    isAdmin: false,
  },
  {
    id: "29",
    firstName: "Clara",
    lastName: "Edwards",
    age: 24,
    email: "clara@example.com",
    isAdmin: false,
  },
  {
    id: "30",
    firstName: "Dean",
    lastName: "Collins",
    age: 35,
    email: "dean@example.com",
    isAdmin: true,
  },
];
