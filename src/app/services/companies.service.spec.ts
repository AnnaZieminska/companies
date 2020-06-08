import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: CompaniesService = TestBed.get(CompaniesService);
    expect(service).toBeTruthy();
  });
});
