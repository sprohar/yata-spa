import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogService } from './confirmation-dialog.service';

describe('ConfirmationDialogService', () => {
  let service: ConfirmationDialogService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogSpy,
        }
      ]
    });

    service = TestBed.inject(ConfirmationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#open', () => {
    it('should open the dialog', () => {
      service.open({
        content: 'content',
        title: 'title',
      });

      expect(matDialogSpy.open).toHaveBeenCalled();
    })
  })
});
