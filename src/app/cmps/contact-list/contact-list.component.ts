import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  // animations: [
  //   trigger('listAnimation', [
  //     transition('void => *', [
  //       style({ opacity: 0, transform: 'translateY(-15px)' }),
  //       animate(
  //         '550ms ease-out',
  //         style({ opacity: 1, transform: 'translateY(0px)' })
  //       ),
  //     ]),
  //     transition('* => void', [animate('50ms', style({ opacity: 0 }))]),
  //   ]),
  // ],
  animations: [
    trigger('listAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('550ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('* => void', [
        animate('50ms', style({ opacity: 0, transform: 'scale(0.5)' })),
      ]),
    ]),
  ],
  // animations: [
  //   trigger('listAnimation', [
  //     transition('void => *', [
  //       style({ opacity: 0, transform: 'rotate(-90deg)' }),
  //       animate(
  //         '550ms ease-out',
  //         style({ opacity: 1, transform: 'rotate(0deg)' })
  //       ),
  //     ]),
  //     transition('* => void', [
  //       animate('50ms', style({ opacity: 0, transform: 'rotate(90deg)' })),
  //     ]),
  //   ]),
  // ],
})
export class ContactListComponent {
  @Input() contacts!: Contact[] | null;
  @Output() remove = new EventEmitter<string>();
}
