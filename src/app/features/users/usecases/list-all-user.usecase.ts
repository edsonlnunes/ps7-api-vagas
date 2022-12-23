import User from "../../../models/user";
import { CacheRepository } from "../../../shared/database/cache-repositories/cache.repositoy";
import { ExpProfile } from "../../../shared/enums/profile.enum";
import UserRepository from "../repositories/user.repository";

export class ListAllUsers {
  private _repository: UserRepository;
  private _cacheRepository: CacheRepository;

  constructor(repository: UserRepository, cacheRepository: CacheRepository) {
    this._repository = repository;
    this._cacheRepository = cacheRepository;
  }

  async execute(profile?: ExpProfile) {
    // const repository = new UserRepository();
    let list: User[] | null = null;
    const queryCache = await this._cacheRepository.get<ExpProfile>("query")    

    const tempProfile = profile || null
      
    if(tempProfile?.toLowerCase() === queryCache?.toLowerCase()){
      console.log("cache");
      list = await this._cacheRepository.get<User[]>("users")
    }

    
    if(!list){   
      list = await this._repository.getUsers(profile);
      await this._cacheRepository.set("users", list)
      await this._cacheRepository.set("query", profile)
    }

    
    return list;
  }
}

// !!queryCache === !!profile && (queryCache === profile || (!profile && !queryCache))