import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, RoleCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Role from '../model/role.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private api: ApiService,
    private roleCacheService: RoleCacheService
  ) {}


  getAll() {
    let role$ = this.roleCacheService.getValue();

    if (!role$) {
      role$ = this.api.get('role').pipe(
        map((response: ApiResponse) => response['Data'] as Role[]),
        shareReplay(1)
      );

      this.roleCacheService.setValue(role$);
    }
    return role$;
  }

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`role/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.roleCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getByTag(tag: string) {
    let role$ = this.roleCacheService.getByKey("tag", tag );

    if (!role$) {
      role$ = this.api.get(`role/${tag}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Role),
        shareReplay(1)
      );
    }
    return role$;
  }

  edit(tag:string | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`role/${tag}`, newValue)
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

  remove(tag:string | undefined){
    return new Promise((resolve, reject) => {
      this.api.delete(`role/${tag}`)
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
