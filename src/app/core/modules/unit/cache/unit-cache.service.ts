import { Injectable } from '@angular/core';
import { AbstractCacheService } from 'src/app/core/cache';
import Unit from '../model/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitCacheService extends AbstractCacheService<Unit[]>{

}
