import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) {
      throw new Error("No user_id has been provided");
    }

    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("No user has been found");
    }

    if (!user.admin) {
      throw new Error("Only admin users can list other users");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
