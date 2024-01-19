import { Injectable } from '@angular/core';
import File from '../model/file.model';
import { AbstractCacheService } from 'src/app/core/cache';

@Injectable({
  providedIn: 'root'
})
export class FileCacheService extends AbstractCacheService<File[]> {

}
