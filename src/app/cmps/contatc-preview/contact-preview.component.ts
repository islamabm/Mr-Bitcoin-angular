import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../services/svg.service';
@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent {
  @Input() contact!: Contact;
  @Output() remove = new EventEmitter<string>();
  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer
  ) {}

  onRemoveContact() {
    this.remove.emit(this.contact._id);
  }
  getTrashIcon(): SafeHtml {
    return this.svgService.getBitcoinSvg('trash');
  }
  getEditIcon(): SafeHtml {
    return this.svgService.getBitcoinSvg('edit');
  }
}
