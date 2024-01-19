import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service';
import { PendingCacheService } from '../cache/pending-cache.service';
import FilePending from '../model/pending.model';
import ApiResponse from 'src/app/core/models/api.model';
import { map, shareReplay } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PendingService {
  constructor(
    private api: ApiService,
    private pendingCacheService: PendingCacheService
  ) {}

  getForUnit() {
    let pending$ = this.pendingCacheService.getValue();

    if (!pending$) {
      pending$ = this.api.get('pending').pipe(
        map((response: ApiResponse) => response['Data'] as FilePending[]),
        shareReplay(1)
      );

      this.pendingCacheService.setValue(pending$);
    }
    return pending$;
  }

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`pending/add`, data).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  accept(id: number | undefined) {
    return new Promise((resolve, reject) => {
      this.api.put(`pending/${id}`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  refuse(id: number | undefined) {
    return new Promise((resolve, reject) => {
      this.api.delete(`pending/${id}`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }
}
