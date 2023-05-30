import { TestBed } from '@angular/core/testing';

import { CodeProcessingService } from './code-processing.service';

describe('CodeProcessingService', () => {
  let service: CodeProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
