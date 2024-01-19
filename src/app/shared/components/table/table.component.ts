import { DATE_PIPE_DEFAULT_OPTIONS, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService, PaginatorService, PermissionService } from 'src/app/core';
import Pager from 'src/app/core/models/pager.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [],
  providers: [
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'yyyy-MM-dd'}}
  ]
})
export class TableComponent implements OnChanges, OnInit {

  /*  Table Prop  */
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 100;
  @Input() loading = true;
  @Input() currentPage = this.initialPage;
  @Input() rows?: Array<any>;
  @Input() headers?: Array<any>;

  pageOfRows?: Array<any>;
  pager?: Pager;

  /** Route && Operation */
  @Input() route!: string;
  @Input() operation: boolean = false;
  @Input() closed!: boolean;

  @Output() onSubmit = new EventEmitter();
  @Output() runOperation = new EventEmitter();

  sortProperty: string = 'id';
  sortOrder = 1;

  canEdit!: boolean;
  canDelete!: boolean;
  owner!: boolean;

  constructor(
    private perm: PermissionService,
    private auth: AuthService,
    private _paginator: PaginatorService
  ) {
    this._paginator.setPage(this.initialPage);
  }

  ngOnInit() {
    this.loading = false;
    this.canEdit = this.perm.canEdit(this.route);
    this.canDelete = this.perm.canDelete(this.route);
    this.owner = this.auth.getName();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['route']) {
      if (changes['route'].currentValue !== changes['route'].previousValue) {
        this.preparePage(this.initialPage)
        return;
      }
    }

    if (changes['rows']) {
      if (changes['rows'].currentValue !== changes['rows'].previousValue) {
        this.preparePage(this.initialPage)
        return;
      }
    }

    if (changes['headers']) {
      if (
        changes['headers'].currentValue !== changes['headers'].previousValue
      ) {
        this.preparePage(this.initialPage)
        return;
      }
    }
  }

  onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return 1;
  }

  runOp(id: number | string, operation: string, route?: string) {
    this.runOperation.emit({
      id,
      operation,
      route
    });
  }

  preparePage(page: number) {
    this._paginator.rows = this.rows;
    this._paginator.initialPage = 1;
    this._paginator.pageSize = 10;
    this._paginator.maxPages = 100;
    this._paginator.currentPage = page;
    let obj = this._paginator.setPage(page);
    this.pager = obj?.pager;
    this.pageOfRows = obj?.pageOfRows;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? this.sortOrder * -1 : 1;
    this.sortProperty = property;
    this.rows = [
      ...this.rows!.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property] < b[property]) {
          result = -1;
        }
        if (a[property] > b[property]) {
          result = 1;
        }
        return result * this.sortOrder;
      }),
    ];

    this.preparePage(this.currentPage);
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '↓' : '↑';
    }
    return '';
  }

  getLength(obj: object) {
    return Object.keys(obj).length;
  }

  isDate(value: any){
    //let regex = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/ ;
    let regex = /(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)/g;
    return regex.test(value);
  }
}
