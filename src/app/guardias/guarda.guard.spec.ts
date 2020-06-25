import { TestBed, async, inject } from '@angular/core/testing';

import { GuardaGuard } from './guarda.guard';

describe('GuardaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardaGuard]
    });
  });

  it('should ...', inject([GuardaGuard], (guard: GuardaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
