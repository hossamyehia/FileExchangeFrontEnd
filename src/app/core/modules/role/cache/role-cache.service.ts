import { Injectable } from '@angular/core';
import Role from '../model/role.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class RoleCacheService extends AbstractCacheService<Role[]> {

}
