import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { LocalStorageService } from './services';
// import { TasksOrderByOptionsActions } from './store/actions';
// import { TasksOrderByState } from './store/reducers/tasks.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // constructor(
  //   private readonly storage: LocalStorageService,
  //   private readonly store: Store
  // ) {}
  //
  ngOnInit(): void {
    // const entry: string | null = this.storage.get('orderBy');
    // if (entry == null) return;
    //
    // const orderByState: TasksOrderByState = JSON.parse(entry);
    // this.store.dispatch(
    //   TasksOrderByOptionsActions.setOrderBy({
    //     orderBy: orderByState,
    //   })
    // );
  }
}
