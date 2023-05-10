import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as db from '../../__mock';
import { PaginatedList } from '../../interfaces/paginated-list.interface';
import { Tag, Task } from '../../models';
import { YataApiService } from './yata-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends YataApiService {
  constructor() {
    super();
  }

  create(tag: Tag) {
    db.mockTags.push(tag);
    return of({ ...tag });
  }

  delete(tag: Tag) {
    const idx = db.mockTags.findIndex((t) => t.id === tag.id);
    const tags = db.mockTags.splice(idx, 1);
    return of(tags[0]);
  }

  getAll() {
    return of({
      pageIndex: 0,
      pageSize: 30,
      count: db.mockTags.length,
      data: Array.from(db.mockTags),
    } as PaginatedList<Tag>);
  }

  getTasks(tagId: number) {
    return of({
      pageIndex: 0,
      pageSize: 30,
      count: db.mockTasks.length,
      data: db.mockTasks.filter(
        (task) =>
          task.tags &&
          task.tags.length &&
          task.tags.filter((t) => t.id === tagId).length
      ),
    } as PaginatedList<Task>);
  }

  update(tag: Tag) {
    const idx = db.mockTags.findIndex((t) => t.id === tag.id);
    db.mockTags[idx] = {
      ...db.mockTags[idx],
      ...tag,
    };

    return of(db.mockTags[idx]);
  }
}
