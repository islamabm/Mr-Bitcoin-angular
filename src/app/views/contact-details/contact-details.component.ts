import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { combineLatest } from 'rxjs';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contactId: string;
  moves!: any[];
  coinCount: number = 0;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private userService: UserService,

    private router: Router
  ) {
    this.contactId = this.route.snapshot.paramMap.get('id')!;
  }

  location = inject(Location);
  contact: Contact | null = null;
  contact$!: Observable<Contact>;
  contacts$!: Observable<Contact[]>;
  private contacts: Contact[] = []; // Add this line
  private subscriptions: Subscription[] = []; // Add this line

  ngOnInit(): void {
    this.contacts$ = this.contactService.loadContacts();

    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          filter((params) => !!params.get('id')),
          tap((params) => {
            const contactId = params.get('id');
            this.contact$ = this.contactService.getContactById(contactId!);
          }),
          switchMap(() => combineLatest([this.contact$, this.contacts$]))
        )
        .subscribe(([contact, contacts]) => {
          this.contact = contact;
          this.contacts = contacts;
        })
    );

    this.subscriptions.push(
      this.userService.moves$.subscribe((moves) => {
        this.moves = moves.filter((move) => move.toId === this.contactId);
      })
    );

    this.userService.getMovesForContact(this.contactId).then((moves) => {
      this.moves = moves;
    });
  }

  onBack() {
    this.router.navigateByUrl('/');
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onPrevious() {
    const currentIndex = this.contacts.findIndex(
      (contact) => contact._id === this.contact?._id
    );

    if (currentIndex > 0) {
      const previousContact = this.contacts[currentIndex - 1];
      this.router.navigate(['/contact', previousContact._id]);
    }
  }
  handleTransferFund(amount: number) {
    console.log('Transferring funds:', amount);
    const updatedUser = this.userService.transferCoins(amount, this.contact);
    console.log('Updated user:', updatedUser);
    this.coinCount = amount;
  }

  onNext() {
    const currentIndex = this.contacts.findIndex(
      (contact) => contact._id === this.contact?._id
    );

    if (currentIndex < this.contacts.length - 1) {
      const nextContact = this.contacts[currentIndex + 1];
      this.router.navigate(['/contact', nextContact._id]);
    }
  }
}
