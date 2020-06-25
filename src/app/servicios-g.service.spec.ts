import { TestBed } from '@angular/core/testing';

import { ServiciosGService } from './servicios-g.service';

describe('ServiciosGService', () => {
  let service: ServiciosGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
