import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../services/svg.service';
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
@Component({
  selector: 'app-record',
  templateUrl: './app-record.component.html',
  styleUrls: ['./app-record.component.scss'],
})
export class AppRecordComponent implements OnInit, OnDestroy {
  @Output() transcriptChanged: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() deleteCommand: EventEmitter<void> = new EventEmitter<void>();

  transcript = '';
  isRecording = false;

  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {}

  private Recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  private sr = new this.Recognition();

  ngOnInit(): void {
    this.sr.continuous = true;
    this.sr.interimResults = true;

    this.sr.onstart = () => {
      console.log('SR Started');
      this.isRecording = true;
      this.cd.detectChanges();
    };

    this.sr.onend = () => {
      console.log('SR Stopped');
      this.isRecording = false;
      this.cd.detectChanges();
      this.emitTranscript(this.transcript);
    };

    this.sr.onresult = (evt: any) => {
      for (let i = 0; i < evt.results.length; i++) {
        const result = evt.results[i];

        if (result.isFinal) this.checkForCommand(result);
      }

      const t = Array.from(evt.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      this.transcript = t;
      this.emitTranscript(this.transcript);
    };
  }

  ngOnDestroy(): void {
    this.sr.stop();
  }

  toggleMic(): void {
    if (this.isRecording) {
      this.sr.stop();
    } else {
      this.sr.start();
    }
  }

  getRecordIcon(): SafeHtml {
    return this.svgService.getBitcoinSvg('record');
  }

  private checkForCommand(result: any): void {
    const t = result[0].transcript;
    let shouldEmitTranscript = true;

    if (t.includes('stop recording')) {
      this.sr.stop();
    } else if (
      t.includes('what is the time') ||
      t.includes("what's the time")
    ) {
      this.sr.stop();
      alert(new Date().toLocaleTimeString());
      setTimeout(() => this.sr.start(), 100);
    } else if (t.includes('delete')) {
      // Add this condition to handle the 'delete' word
      this.transcript = ''; // Clear the input
      this.deleteCommand.emit(); // Emit the deleteCommand event
      shouldEmitTranscript = false;
    }

    if (shouldEmitTranscript) {
      this.emitTranscript(this.transcript); // Emit the updated transcript
    }
  }
  private emitTranscript(text: string): void {
    this.transcriptChanged.emit(text);
  }
}
