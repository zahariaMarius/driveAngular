import { TestBed, inject } from '@angular/core/testing';

import { ServerRequestService } from './server-request.service';

describe('ServerRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerRequestService]
    });
  });

  it('should be created', inject([ServerRequestService], (service: ServerRequestService) => {
    expect(service).toBeTruthy();
  }));
});
