import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentManagerService {
  private readonly AGENT_MAPPING = {
    '/': 'agent_01k0p4gvgaffpb08wtt3662eq5',
    '/prodotti': 'agent_01k0p91577erdb3zbsdfsyhehr',
    '/servizi': 'agent_01k0p91577erdb3zbsdfsyhehr', 
    '/contatti': 'agent_01k0p4gvgaffpb08wtt3662eq5',
    '/amministrazione': 'agent_01k0p4m8djec1a8ey5gy2r8eg1',
    '/fatturazione': 'agent_01k0p4m8djec1a8ey5gy2r8eg1',
    '/supporto': 'agent_01k0p91577erdb3zbsdfsyhehr'
  };

  constructor(private router: Router) {
    // Ascolta i cambi di rotta di Angular
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.switchAgentForRoute(event.url);
      });
  }

  private switchAgentForRoute(route: string) {
    const agentId = this.getAgentForRoute(route);
    this.switchWidget(agentId);
  }

  private getAgentForRoute(route: string): string {
    // Default agent
    let agentId = this.AGENT_MAPPING['/'];
    
    // Trova il match più specifico
    for (const [mappedRoute, agent] of Object.entries(this.AGENT_MAPPING)) {
      if (route === mappedRoute || route.startsWith(mappedRoute + '/')) {
        agentId = agent;
        break;
      }
    }
    
    return agentId;
  }

  private switchWidget(agentId: string) {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget && widget.getAttribute('agent-id') !== agentId) {
      console.log('🤖 Switching to agent:', agentId);
      widget.setAttribute('agent-id', agentId);
    }
  }
}