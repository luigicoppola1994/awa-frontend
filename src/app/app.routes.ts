// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductSectionComponent } from './pages/product-section/product-section.component';
import { AmministrazioneComponent } from './pages/amministrazione/amministrazione.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  // Rotte esistenti con parametri
  { path: 'prodotti/:category', component: ProductSectionComponent },
  { path: 'servizi/:service', component: ProductSectionComponent },
  
  // NUOVE ROTTE STATICHE - AGGIUNGI QUESTE
  { path: 'amministrazione', component: AmministrazioneComponent },
  { path: 'commerciale', component: ProductSectionComponent },
  { path: 'uffici', component: ProductSectionComponent },
  { path: 'servizi', component: ProductSectionComponent }, // Rotta senza parametri
  { path: 'formazione', component: ProductSectionComponent },
  { path: 'contatti', component: ProductSectionComponent },
  
  // Catch-all route (deve rimanere ultima)
  { path: '**', redirectTo: '' }
];