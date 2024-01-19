import { Observable, filter, map, of, toArray } from 'rxjs';

export abstract class AbstractCacheService<T> {
  readonly CACHE_DURATION_IN_MINUTES = 60;
  readonly DEFAULT_KEY = 'DEFAULT';

  private cache: {
    [id: string]: {
      expires: Date;
      value: Observable<T>;
    };
  } = {};

  getValue(api?: string): Observable<T> {
    const key = api ? api : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item) {
      return null as any;
    }

    if (new Date().toISOString() > item.expires.toISOString()) {
      return null as any;
    }

    return item.value;
  }

  setValue(value: Observable<T>, api?: string) {
    const key = api ? api : this.DEFAULT_KEY;
    const expires = new Date(
      new Date().getTime() + this.CACHE_DURATION_IN_MINUTES * 60000
    );
    this.cache[key] = { expires, value };
  }

  appendValue(value: any, api?: string) {
    const key = api ? api : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item) {
      return null as any;
    }
    item.value.pipe(
      map((data) => {
        return [...(data as T[]), value];
      })
    );
  }

  getByKey(searchKey: string, value: any, api?: string) {
    const key = api ? api : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item) {
      return null as any;
    }
    return item.value.pipe(
      map((myData: any) =>
        myData.find(
          (data: any) => data[searchKey].toString() === value.toString()
        )
      )
    );
  }

  removeByKey(searchKey: string, value: any, api?: string) {
    const key = api ? api : this.DEFAULT_KEY;
    const item = this.cache[key];
    if (!item) {
      return null as any;
    }
    //let newData: any = [];
    this.cache[key].value.pipe(
      map((myData: any) => {
        let list = [...myData];
        list.splice(
          list.findIndex(
            (data: any) => data[searchKey].toString() === value.toString()
          ), 1
        );
        //newData = list;
        return list as T;
      })
    );
    //this.cache[key].value.next(newData);
  }

  clearCache() {
    this.cache = null as any;
  }
}
