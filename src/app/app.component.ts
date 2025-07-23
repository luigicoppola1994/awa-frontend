/* src/app/app.component.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `, // DEVE ESSERE SOLO QUESTO
  styleUrls: ['./app.component.scss'] // Collega il file SCSS minimalista sopra
})
export class AppComponent implements OnInit {
  title = 'Sito Intelligente IT';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('🅰️ Angular AppComponent initialized');
    
    // Listener per la navigazione dal widget ElevenLabs
    window.addEventListener('angular-navigate', (event: any) => {
      console.log('🧭 Angular navigating to:', event.detail.url);
      this.router.navigate([event.detail.url]);
    });
  }
}