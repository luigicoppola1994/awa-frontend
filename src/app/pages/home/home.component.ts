import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessario per direttive come *ngFor
import { RouterModule } from '@angular/router'; // Necessario per routerLink

// Interfaccia per definire la struttura di ogni avatar
interface Avatar {
  name: string; // Nome della categoria (es. 'Laptop')
  image: string; // Percorso dell'immagine dell'avatar (es. 'assets/avatar-laptop.png')
  link: string; // Link di routing a cui l'avatar punterà (es. '/prodotti/laptop')
}

@Component({
  selector: 'app-home', // Selettore HTML per usare questo componente (<app-home></app-home>)
  standalone: true, // Indica che questo è un componente standalone
  imports: [
    CommonModule, // Fornisce direttive comuni di Angular come *ngFor
    RouterModule // Fornisce la direttiva routerLink per la navigazione
  ],
  templateUrl: './home.component.html', // Collega il file template HTML
  styleUrls: ['./home.component.scss'] // Collega il file di stile SCSS
})
export class HomeComponent implements OnInit {

  // Array di oggetti Avatar che definiscono i tuoi 6 cerchi stilizzati
  // Assicurati che questi percorsi corrispondano ai file immagine nella tua cartella src/assets/
  avatars: Avatar[] = [
  { name: 'AMMINISTRAZIONE', image: '/assets/avatars/mioavatar.png', link: '/amministrazione' },
  { name: 'COMMERCIALE', image: '/assets/avatars/mioavatar.png', link: '/commerciale' },
  { name: 'UFFICI', image: '/assets/avatars/mioavatar.png', link: '/uffici' },
  { name: 'SERVIZI', image: '/assets/avatars/mioavatar.png', link: '/servizi' },
  { name: 'FORMAZIONE', image: '/assets/avatars/mioavatar.png', link: '/formazione' },
  { name: 'CONTATTI', image: '/assets/avatars/mioavatar.png', link: '/contatti' },
];


  constructor() { }

  ngOnInit(): void {
    // Logica di inizializzazione del componente, se necessaria
    // Ad esempio, potresti caricare dati da un servizio qui
  }
}