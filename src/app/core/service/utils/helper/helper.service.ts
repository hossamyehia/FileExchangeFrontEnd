import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  groupBy(xs: any[], key: string | number) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getLength(obj: object) {
    return Object.keys(obj).length;
  }

  clean(obj: any) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] == '' ||
        obj[propName] == 'default'
      ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  processSize(size: number): [number, string] {
    let sizeUnit: string = 'B';
    if (size >= 1024 * 1024 * 1024) {
      size /= 1024 * 1024 * 1024;
      sizeUnit = 'GB';
    } else if (size >= 1024 * 1024) {
      size /= 1024 * 1024;
      sizeUnit = 'MB';
    } else if (size >= 1024) {
      size /= 1024;
      sizeUnit = 'KB';
    }

    return [size, sizeUnit];
  }

  processFile(originalname: string): [string, string] {
    let m = originalname.match(/([^:\\/]*?)(?:\.([^ :\\/.]*))?$/);
    return [m === null ? '' : m[1], m === null ? '' : m[2]];
  }
}
