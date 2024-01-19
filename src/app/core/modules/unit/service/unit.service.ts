import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ApiService, UnitCacheService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import Unit from '../model/unit.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(
    private api: ApiService,
    private unitCacheService: UnitCacheService
  ) {}

  add(data: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`unit/add`, data).subscribe({
        next: (res: ApiResponse) => {
          this.unitCacheService.appendValue(data);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getByID(id: number) {
    let unit$ = this.unitCacheService.getByKey('id', id);

    if (!unit$) {
      unit$ = this.api.get(`unit/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as Unit),
        shareReplay(1)
      );
    }
    return unit$;
  }

  getMaster() {
    return new Promise((resolve, reject) => {
      this.api.get(`unit/master`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getAll() {
    let unit$ = this.unitCacheService.getValue();

    if (!unit$) {
      unit$ = this.api.get('unit').pipe(
        map((response: ApiResponse) => response['Data'] as Unit[]),
        shareReplay(1)
      );

      this.unitCacheService.setValue(unit$);
    }
    return unit$;
  }

  getByType(type: number) {
    let unit$ = this.unitCacheService.getValue(`type_${type}`);

    if (!unit$) {
      unit$ = this.api.get(`unit/type/${type}`).pipe(
        map((response: ApiResponse) => response['Data'] as Unit[]),
        shareReplay(1)
      );

      this.unitCacheService.setValue(unit$, `type_${type}`);
    }
    return unit$;
  }

  getSlaves() {
    return new Promise((resolve, reject) => {
      this.api.get(`unit/slaves`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  getRelatives() {
    return new Promise((resolve, reject) => {
      this.api.get(`unit/relatives`).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  edit(id: number | undefined, newValue: any) {
    return new Promise((resolve, reject) => {
      this.api.put(`unit/${id}`, newValue).subscribe({
        next: (res: ApiResponse) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }

  remove(id: number | undefined) {
    return new Promise((resolve, reject) => {
      this.api.delete(`unit/${id}`).subscribe({
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
