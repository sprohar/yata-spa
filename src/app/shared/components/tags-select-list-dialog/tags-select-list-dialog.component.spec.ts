import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSelectListDialogComponent } from './tags-select-list-dialog.component';

describe('TagsSelectListDialogComponent', () => {
  let component: TagsSelectListDialogComponent;
  let fixture: ComponentFixture<TagsSelectListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsSelectListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsSelectListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
