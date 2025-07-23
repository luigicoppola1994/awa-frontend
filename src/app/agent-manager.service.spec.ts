import { TestBed } from '@angular/core/testing';

import { AgentManagerService } from './agent-manager.service';

describe('AgentManagerService', () => {
  let service: AgentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
