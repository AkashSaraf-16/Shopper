import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@shopper.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "akash",
    email: "akash@shopper.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "lorem",
    email: "lorem@shopper.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
