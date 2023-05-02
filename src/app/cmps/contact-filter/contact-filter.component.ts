import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactFilter } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent {
  constructor(private contactService: ContactService) {}
  destroySubject$ = new Subject<null>();
  filterSubject$ = new Subject();
  contactFilter = {} as ContactFilter;

  ngOnInit(): void {
    this.contactService.contactFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((contactFilter) => {
        this.contactFilter = contactFilter;
      });

    this.filterSubject$
      .pipe(
        takeUntil(this.destroySubject$),
        debounceTime(0), // Change the debounceTime to 0
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.contactService.setFilter(this.contactFilter);
      });
  }
  onTranscriptChanged(transcript: string) {
    this.contactFilter.term = transcript;
    this.onSetFilter(transcript);
  }
  onSetFilter(val: string) {
    // console.log('val:', val)
    // this.petService.setFilter(this.petFilter)
    this.filterSubject$.next(val);
  }
  onDeleteCommand() {
    this.contactFilter.term = '';
    this.onSetFilter('');
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
}
