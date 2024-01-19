import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HelperService, MsgService } from 'src/app/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [],
})
export class SearchComponent {
  @Output() searchVals: EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup = new FormGroup({
    rkmaskry: new FormControl(null),
    name: new FormControl(null),
    daraga_id: new FormControl(null),
    fea_id: new FormControl(null),
    selah_id: new FormControl(null),
    wehda_id: new FormControl(null),
    khedma_id: new FormControl(null),
    mohafza_id: new FormControl(null),
  });

  constructor(
    private helper: HelperService,
    private msgService: MsgService

  ) {}

  ngOnInit(): void {this.loadData();}

  loadData() {

  }

  onSearch() {
    this.searchVals.emit(this.helper.clean(this.searchForm.value));
  }

}
