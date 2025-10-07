import { User, UserFilters } from '../../Interfaces/Board/user-card-interface';
import peopleData from '../../Data/people.json';

export class UserCardService {
  private static users: User[] = peopleData as User[];

 
  static async getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 100);
    });
  }


  static async getUserById(id: number): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(user => user.id === id);
        resolve(user || null);
      }, 100);
    });
  }

}

export default UserCardService;
