import { Injectable } from '@angular/core';
import { ApiService, FileCacheService, HelperService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';
import File from '../model/file.model';
import { map, shareReplay } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private fileCacheService: FileCacheService,
    private _helper: HelperService
  ) {}

  add(data: any){
    return new Promise((resolve, reject) => {
      this.api.post(`file/add`, data).subscribe({
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
    let file$ = this.fileCacheService.getValue();

    if (!file$) {
      file$ = this.api.get('file').pipe(
        map((response: ApiResponse) => response['Data'] as File[]),
        shareReplay(1)
      );

      this.fileCacheService.setValue(file$);
    }
    return file$;
  }

  getByOwner(owner: number) {
    let file$ = this.fileCacheService.getValue("owner");

    if (!file$) {
      file$ = this.api.get(`file/owner/${owner}`).pipe(
        map((response: ApiResponse) => response['Data'] as File[]),
        shareReplay(1)
      );

      this.fileCacheService.setValue(file$, "owner");
    }
    return file$;
  }

  getSeenBy(id: number) {
    let file$ = this.fileCacheService.getValue(`${id}_file_units`);

    if (!file$) {
      file$ = this.api.get(`file/seenby/${id}`).pipe(
        map((response: ApiResponse) => response['Data'] as File[]),
        shareReplay(1)
      );

      this.fileCacheService.setValue(file$, `${id}_file_units`);
    }

    return file$;
  }

  getSharedWith() {
    let file$ = this.fileCacheService.getValue(`shared`);

    if (!file$) {
      file$ = this.api.get(`file/sharedwith`).pipe(
        map((response: ApiResponse) => response['Data'] as File[]),
        shareReplay(1)
      );

      this.fileCacheService.setValue(file$, `shared`);
    }

    return file$;
  }

  getByID(id: number) {
    let file$ = this.fileCacheService.getByKey("id", id );

    if (!file$) {
      file$ = this.api.get(`file/${id}`).pipe(
        map((response: ApiResponse) => response['Data'][0] as File),
        shareReplay(1)
      );
    }
    return file$;
  }

  download(id: number){
    return this.http.get(`${this.api.baseURL}file/download/${id}`, {responseType:"blob"});
  }

  edit(id:number | undefined, newValue: any){
    return new Promise((resolve, reject) => {
      this.api.put(`file/${id}`, newValue)
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
      this.api.delete(`file/${id}`)
      .subscribe({
        next: (res: ApiResponse) => {
          this.fileCacheService.removeByKey("id", id, "owner");
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        }
      });
    });
  }

  /*************************Pending */
  getPendingForUnit(unit: number){
    let file$ = this.fileCacheService.getValue();

    if (!file$) {
      file$ = this.api.get('pending').pipe(
        map((response: ApiResponse) => response['Data'] as File[]),
        shareReplay(1)
      );

      this.fileCacheService.setValue(file$);
    }
    return file$;
  }
}
