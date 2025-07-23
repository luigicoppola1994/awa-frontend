// src/app/components/voice-assistant/voice-assistant.component.ts

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

@Component({
  selector: 'app-voice-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voice-assistant.component.html',
  styleUrls: ['./voice-assistant.component.scss']
})
export class VoiceAssistantComponent implements OnInit, OnDestroy {
  @Input() pageContent: string = '';

  // isActive non è più per la finestra di chat, ma per indicare lo stato "attivo" del microfono
  isListening: boolean = false; // Nuovo stato per indicare se l'assistente è in ascolto
  messages: { text: string; type: 'user' | 'assistant' }[] = []; // Mantenuto per la logica dell'assistente, anche se non visualizzato
  currentQuery: string = '';

  private recognition: any;
  private synth: SpeechSynthesis;

  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false; // Si ferma dopo una frase
      this.recognition.interimResults = false;
      this.recognition.lang = 'it-IT';

      this.recognition.onstart = () => { // Evento quando l'ascolto inizia
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.addMessage(transcript, 'user'); // Aggiungi messaggio (anche se non visualizzato ora)
        this.processQuery(transcript);
        this.isListening = false;
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        this.addMessage('Errore di ascolto. Riprova.', 'assistant'); // Messaggio di errore
        this.isListening = false;
      };

      this.recognition.onend = () => { // Evento quando l'ascolto finisce
        this.isListening = false;
      };
    } else {
      console.warn('Web Speech API not supported in this browser.');
    }

    this.synth = window.speechSynthesis;
  }

  ngOnInit(): void {
    // Inizializzazione
  }

  ngOnDestroy(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // NUOVA FUNZIONE: per attivare/disattivare lo stato di ascolto del microfono
  toggleListeningState(): void {
    if (this.isListening) {
      this.recognition.stop();
    } else {
      // Inizia l'ascolto
      if (this.recognition) {
        this.recognition.start();
      } else {
        console.error('Riconoscimento vocale non disponibile.');
      }
    }
    // isListening viene aggiornato dagli eventi onstart/onend del recognition API
  }

  // Queste funzioni non sono più direttamente legate all'UI in questo layout,
  // ma la logica rimane per il processing della voce.
  sendMessage(): void {
    // Questa funzione potrebbe non essere più necessaria se non c'è input testuale visibile
    // o se viene usato solo per la logica interna.
    console.log("Messaggio inviato (testo):", this.currentQuery);
    if (this.currentQuery.trim()) {
      this.addMessage(this.currentQuery, 'user');
      this.processQuery(this.currentQuery);
      this.currentQuery = '';
    }
  }

  addMessage(text: string, type: 'user' | 'assistant'): void {
    this.messages.push({ text, type });
    // Non c'è più una chat window da scrollare in questo layout
  }

  private processQuery(query: string): void {
    const lowerQuery = query.toLowerCase();
    let response = "Mi dispiace, al momento non ho informazioni specifiche su questo. Prova a riformulare la domanda o a navigare nella pagina.";

    if (this.pageContent) {
      if (lowerQuery.includes('cosa sono') || lowerQuery.includes('spiegami') || lowerQuery.includes('parlami di')) {
        response = `Certo! Questa sezione tratta di: "${this.extractMainTopic(this.pageContent)}". Nello specifico, la pagina contiene informazioni su: ${this.pageContent}.`;
      } else if (lowerQuery.includes('prezzi')) {
        const prices = this.extractPrices(this.pageContent);
        if (prices.length > 0) {
          response = `Ho trovato alcune informazioni sui prezzi: ${prices.join(', ')}.`;
        } else {
          response = "Non ho trovato informazioni esplicite sui prezzi in questa pagina.";
        }
      } else if (lowerQuery.includes('caratteristiche') || lowerQuery.includes('specifiche')) {
        response = "Le caratteristiche e specifiche dettagliate sono elencate nella pagina stessa. Per favore, scorri per maggiori dettagli.";
      } else {
        const keywords = lowerQuery.split(' ').filter(word => word.length > 3);
        const relevantSentences = this.pageContent.split('. ').filter(sentence => {
          return keywords.some(keyword => sentence.toLowerCase().includes(keyword));
        });

        if (relevantSentences.length > 0) {
          response = "Ho trovato queste informazioni rilevanti nella pagina: " + relevantSentences.join('. ');
        }
      }
    }

    this.addMessage(response, 'assistant');
    this.speak(response);
  }

  private extractMainTopic(content: string): string {
    const firstSentence = content.split('.')[0].trim();
    return firstSentence.length > 0 ? firstSentence : "il contenuto di questa pagina";
  }

  private extractPrices(content: string): string[] {
    const priceRegex = /€\s*\d+(?:[.,]\d{1,2})?|prezzo:\s*(\d+(?:[.,]\d{1,2})?)|costo\s*(?:orario)?:\s*(\d+(?:[.,]\d{1,2})?€)|preventivo/gi;
    const matches = content.match(priceRegex);
    return matches ? matches.map(match => match.trim()) : [];
  }

  private speak(text: string): void {
    if (this.synth) {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      this.synth.speak(utterance);
    }
  }
}