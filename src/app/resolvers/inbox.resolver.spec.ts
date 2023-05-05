import { TestBed } from '@angular/core/testing';

import { InboxResolver } from './inbox.resolver';

describe('InboxResolver', () => {
  let resolver: InboxResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InboxResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
