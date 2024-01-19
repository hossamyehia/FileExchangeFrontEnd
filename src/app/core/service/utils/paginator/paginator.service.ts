import { Injectable } from '@angular/core';
import Pager from 'src/app/core/models/pager.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  initialPage = 1;
  pageSize = 10;
  maxPages = 100;
  currentPage = this.initialPage;
  rows?: Array<any>;

  pageOfRows?: Array<any>;
  pager?: Pager;

  constructor() {}

  setPage(page: number) {
    if (!this.rows?.length) return;

    // get new pager object for specified page
    this.pager = this.paginate(
      this.rows.length,
      page,
      this.pageSize,
      this.maxPages
    );

    // get new page of items from items array
    this.pageOfRows = this.rows.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.currentPage = page;
    return {
      pager: this.pager,
      pageOfRows: this.pageOfRows
    };
  }

  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ): Pager {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    //pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }
}
