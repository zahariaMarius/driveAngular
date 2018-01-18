import { TestBed, inject } from '@angular/core/testing';

import { CheckCookieService } from './check-cookie.service';

describe('CheckCookieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckCookieService]
    });
  });

  it('should be created', inject([CheckCookieService], (service: CheckCookieService) => {
    expect(service).toBeTruthy();
  }));
});
