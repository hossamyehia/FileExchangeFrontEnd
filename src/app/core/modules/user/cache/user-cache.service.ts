import { Injectable } from '@angular/core';
import User from '../model/user.model';
import { AbstractCacheService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService extends AbstractCacheService<User[]> {


}
