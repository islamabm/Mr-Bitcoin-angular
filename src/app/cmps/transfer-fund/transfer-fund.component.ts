import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent {
  amount = 0;
  logoUrl = 'assets/bitcoin-audio/money.mp3';
  @Output() transferFund = new EventEmitter<number>();

  handleAmountChange(event: Event) {
    this.amount = parseFloat((event.target as HTMLInputElement).value);
  }

  onTransferFund(event: Event) {
    event.preventDefault();
    this.playSound();
    this.transferFund.emit(this.amount);
  }
  playSound(): void {
    let audio = new Audio(this.logoUrl);
    audio.play();
  }
}
