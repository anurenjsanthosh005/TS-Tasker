export interface User{
    id:number
    username:string
    password:string
    role:"user"|"admin"
}

export const users:User[] = [
    {
      id: 1,
      username: "user1",
      password: "user123", 
      role: "user",
    },
    {
      id: 2,
      username: "user2",
      password: "user1234",
      role: "user",
    },
  ];