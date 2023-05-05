import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Task } from '../../models';
import { selectTasks } from '../../store/selectors';

@Component({
  selector: 'yata-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
  tasks$ = this.store.select(selectTasks);
  overdueTasks$ = this.route.data.pipe(
    map((data) => data['inbox'].overdueTasks)
  );

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Inbox');
  }

  trackByTaskId(_index: number, task: Task) {
    return task.id;
  }
}
