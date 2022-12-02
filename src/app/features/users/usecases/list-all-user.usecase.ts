import UserRepository from "../repositories/user.repository"

export class ListAllUsers {
   async execute() {
    const repository = new UserRepository();
    
    const list = repository.getUsers();
    
    return list;
   }
}