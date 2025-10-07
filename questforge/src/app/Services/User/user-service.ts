import { User } from '../../Interfaces/User/user-interface';
import userData from '../../Data/user.json';

export class UserService {

  static async getUser(): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData as User);
      }, 100);
    });
  }

}
