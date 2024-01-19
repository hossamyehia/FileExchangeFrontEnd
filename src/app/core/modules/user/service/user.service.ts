import { Injectable } from '@angular/core';
import { ApiService, UserCacheService } from 'src/app/core';
import User from '../model/user.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    private userCacheService: UserCacheService
  ) {}


  getAll() {
    let user$ = this.userCacheService.getValue();

    if (!user$) {
      user$ = this.api.get('user').pipe(
        map((response: ApiResponse) => response['Data'] as User[]),
        shareReplay(1)
      );

      this.userCacheService.setValue(user$);
    }
    return user$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`user/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.userCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getById(id: number) {
    let user$ = this.userCacheService.getByKey("id", id );

    if (!user$) {
      user$ = this.api.get(`user/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as User),
        shareReplay(1)
      );
    }
    return user$;
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`user/${id}`, newValue)
      .subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });
  }

  remove(id:number | undefined){
    return new Promise((resolve, reject) => {
      this.api.delete(`user/${id}`)
      .subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });
  }
}
