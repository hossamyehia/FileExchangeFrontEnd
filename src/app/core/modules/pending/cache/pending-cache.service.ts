import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import FilePending from '../model/pending.model';

@Injectable({
  providedIn: 'root'
})
export class PendingCacheService extends AbstractCacheService<FilePending[]>{

}
