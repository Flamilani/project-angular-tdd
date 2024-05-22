import { TestBed } from '@angular/core/testing';

import { IntegrationService } from './integration.service';
import { HttpClientModule } from '@angular/common/http';

describe('IntegrationService', () => {
  let service: IntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(IntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
