import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { VoiceAssistantComponent } from '../../components/voice-assistant/voice-assistant.component';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VoiceAssistantComponent
  ],
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit, OnDestroy {
  sectionTitle: string = '';
  products: any[] = [];
  pageContent: string = '';
  currentRoute: string = '';
  private routeSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Ottieni la rotta corrente
    this.currentRoute = this.router.url;
    
    // Sottoscriviti ai cambiamenti dei parametri dell'URL
    this.routeSub = this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      const service = params.get('service');

      if (category) {
        this.sectionTitle = 'Prodotti: ' + category.charAt(0).toUpperCase() + category.slice(1);
        this.loadProductData(category);
      } else if (service) {
        this.sectionTitle = 'Servizi: ' + service.charAt(0).toUpperCase() + service.slice(1);
        this.loadServiceData(service);
      } else {
        // NUOVA LOGICA: Gestisci le rotte statiche
        this.handleStaticRoutes();
      }
    });
  }

  // NUOVA FUNZIONE: Gestisce le rotte statiche
  private handleStaticRoutes(): void {
    const path = this.router.url.substring(1); // Rimuove il '/' iniziale
    
    switch (path) {
      case 'amministrazione':
        this.sectionTitle = 'Amministrazione';
        this.loadAmministrazioneData();
        break;
      case 'commerciale':
        this.sectionTitle = 'Commerciale';
        this.loadCommercialeData();
        break;
      case 'uffici':
        this.sectionTitle = 'Uffici';
        this.loadUfficiData();
        break;
      case 'servizi':
        this.sectionTitle = 'Servizi';
        this.loadServiziGenerali();
        break;
      case 'formazione':
        this.sectionTitle = 'Formazione';
        this.loadFormazioneData();
        break;
      case 'contatti':
        this.sectionTitle = 'Contatti';
        this.loadContattiData();
        break;
      default:
        this.sectionTitle = 'Sezione non trovata';
        this.products = [];
        this.pageContent = 'Nessuna informazione disponibile per questa sezione.';
        break;
    }
  }

  // NUOVE FUNZIONI per le sezioni statiche
  private loadAmministrazioneData(): void {
    this.products = [
      { id: 100, name: 'Gestione Fatturazione', description: 'Sistema automatizzato per emissione e gestione fatture elettroniche.', price: 'Su misura' },
      { id: 101, name: 'Contabilità Digitale', description: 'Software per la gestione completa della contabilità aziendale.', price: 300 },
      { id: 102, name: 'Gestione Documentale', description: 'Archiviazione digitale e gestione documenti aziendali.', price: 450 },
    ];
    this.pageContent = "Benvenuto nella sezione Amministrazione. Gestiamo Fatturazione elettronica, Contabilità Digitale a 300 euro mensili, e Gestione Documentale a 450 euro.";
  }

  private loadCommercialeData(): void {
    this.products = [
      { id: 200, name: 'CRM Aziendale', description: 'Sistema completo per gestione clienti e opportunità commerciali.', price: 500 },
      { id: 201, name: 'E-commerce Solutions', description: 'Sviluppo e gestione piattaforme di vendita online.', price: 1200 },
      { id: 202, name: 'Marketing Digitale', description: 'Consulenza e gestione campagne pubblicitarie online.', price: 800 },
    ];
    this.pageContent = "Sezione Commerciale: offriamo CRM Aziendale a 500 euro, E-commerce Solutions a 1200 euro, e servizi di Marketing Digitale a 800 euro.";
  }

  private loadUfficiData(): void {
    this.products = [
      { id: 300, name: 'Suite Office 365', description: 'Licenze Microsoft Office complete per tutta l\'azienda.', price: 120 },
      { id: 301, name: 'Videoconferenza Pro', description: 'Sistema professionale per meeting e conferenze virtuali.', price: 200 },
      { id: 302, name: 'Cloud Storage Aziendale', description: 'Spazio cloud sicuro e condiviso per i documenti aziendali.', price: 80 },
    ];
    this.pageContent = "Soluzioni per Uffici: Suite Office 365 a 120 euro mensili, Videoconferenza Pro a 200 euro, Cloud Storage a 80 euro mensili.";
  }

  private loadServiziGenerali(): void {
    this.products = [
      { id: 400, name: 'Consulenza IT', description: 'Analisi e ottimizzazione dell\'infrastruttura tecnologica aziendale.', price: 'Preventivo' },
      { id: 401, name: 'Backup e Disaster Recovery', description: 'Soluzioni complete per la protezione e recupero dati.', price: 350 },
      { id: 402, name: 'Sicurezza Informatica', description: 'Protezione completa da minacce cyber e malware.', price: 600 },
    ];
    this.pageContent = "I nostri Servizi includono Consulenza IT su preventivo, Backup e Disaster Recovery a 350 euro, Sicurezza Informatica a 600 euro.";
  }

  private loadFormazioneData(): void {
    this.products = [
      { id: 500, name: 'Corso Base Informatica', description: 'Formazione di base su computer, internet e software essenziali.', price: 180 },
      { id: 501, name: 'Cybersecurity Training', description: 'Corso avanzato su sicurezza informatica e best practices.', price: 400 },
      { id: 502, name: 'Digital Skills Workshop', description: 'Workshop intensivo sulle competenze digitali moderne.', price: 250 },
    ];
    this.pageContent = "Formazione disponibile: Corso Base Informatica a 180 euro, Cybersecurity Training a 400 euro, Digital Skills Workshop a 250 euro.";
  }

  private loadContattiData(): void {
    this.products = [
      { id: 600, name: 'Sede Principale', description: 'Via Roma 123, Milano - Tel: 02-1234567 - Email: info@sitointelligente.it', price: 'Gratuito' },
      { id: 601, name: 'Supporto Tecnico', description: 'Hotline dedicata: 800-123456 - Email: support@sitointelligente.it', price: 'Incluso' },
      { id: 602, name: 'Consulenza Commerciale', description: 'Tel: 02-7654321 - Email: commerciale@sitointelligente.it', price: 'Gratuita' },
    ];
    this.pageContent = "Contatti: Sede Principale in Via Roma 123 Milano, Supporto Tecnico al numero verde 800-123456, Consulenza Commerciale al 02-7654321.";
  }

  // Funzioni esistenti per prodotti e servizi parametrici
  private loadProductData(category: string): void {
    switch (category) {
      case 'laptop':
        this.products = [
          { id: 1, name: 'Laptop Ultra Slim X', description: 'Potente e leggero, ideale per la mobilità. Schermo 13.3" Full HD, Intel Core i7, 16GB RAM, 512GB SSD.', price: 1200 },
          { id: 2, name: 'Gaming Beast Pro', description: 'Massime prestazioni per il gaming. Processore AMD Ryzen 9, NVIDIA RTX 4080, 32GB RAM, 1TB NVMe SSD.', price: 1800 },
          { id: 3, name: 'Chromebook Student', description: 'Economico e veloce per lo studio. Chrome OS, Intel Celeron, 4GB RAM, 64GB eMMC.', price: 350 },
        ];
        this.pageContent = "Benvenuto nella sezione Laptop. Qui puoi trovare il Laptop Ultra Slim X, potente e leggero con un prezzo di 1200 euro, il Gaming Beast Pro per massime prestazioni a 1800 euro, e il Chromebook Student a 350 euro.";
        break;
      case 'desktop':
        this.products = [
          { id: 4, name: 'PC Fisso Ufficio', description: 'Ideale per la produttività aziendale. Intel Core i5, 8GB RAM, 256GB SSD.', price: 750 },
          { id: 5, name: 'Workstation Grafica', description: 'Per professionisti creativi e rendering 3D. AMD Threadripper, 64GB RAM, NVIDIA RTX A6000.', price: 2500 },
        ];
        this.pageContent = "La sezione Desktop offre il PC Fisso Ufficio ideale per la produttività a 750 euro, e la Workstation Grafica per professionisti creativi a 2500 euro.";
        break;
      case 'componenti':
        this.products = [
          { id: 6, name: 'Scheda Madre Z790', description: 'Supporta processori Intel di ultima generazione.', price: 280 },
          { id: 7, name: 'GPU Nvidia RTX 4070', description: 'Scheda grafica ad alte prestazioni.', price: 600 },
        ];
        this.pageContent = "Qui trovi Componenti come la Scheda Madre Z790 a 280 euro e la GPU Nvidia RTX 4070 a 600 euro.";
        break;
      case 'periferiche':
        this.products = [
          { id: 8, name: 'Monitor Ultrawide 34"', description: 'Ottimale per multitasking e gaming immersivo.', price: 450 },
          { id: 9, name: 'Tastiera Meccanica RGB', description: 'Comfort e stile per i gamer.', price: 90 },
        ];
        this.pageContent = "Esplora Periferiche come il Monitor Ultrawide 34 pollici a 450 euro e la Tastiera Meccanica RGB a 90 euro.";
        break;
      case 'software':
        this.products = [
          { id: 10, name: 'Licenza Windows 11 Pro', description: 'Sistema operativo professionale.', price: 150 },
          { id: 11, name: 'Suite Adobe Creative Cloud', description: 'Abbonamento annuale per tutte le app Adobe.', price: 600 },
        ];
        this.pageContent = "Nella sezione Software trovi la Licenza Windows 11 Pro a 150 euro e la Suite Adobe Creative Cloud a 600 euro annuali.";
        break;
      default:
        this.products = [];
        this.pageContent = "Nessuna informazione disponibile per questa categoria di prodotti.";
        break;
    }
  }

  private loadServiceData(service: string): void {
    switch (service) {
      case 'supporto':
        this.products = [
          { id: 12, name: 'Assistenza Tecnica Remota', description: 'Risoluzione problemi software e configurazioni via internet. Costo orario: 50€.', price: 50 },
          { id: 13, name: 'Ripristino Dati', description: 'Recupero dati da dispositivi di archiviazione danneggiati. Prezzi a partire da 150€.', price: 150 },
          { id: 14, name: 'Configurazione Rete Aziendale', description: 'Installazione e ottimizzazione di reti LAN/Wi-Fi per aziende. Preventivo personalizzato.', price: 'preventivo' },
        ];
        this.pageContent = "La sezione Supporto offre Assistenza Tecnica Remota con un costo orario di 50 euro, Ripristino Dati a partire da 150 euro, e Configurazioni Rete Aziendale su preventivo.";
        break;
      default:
        this.products = [];
        this.pageContent = "Nessuna informazione disponibile per questo servizio.";
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}