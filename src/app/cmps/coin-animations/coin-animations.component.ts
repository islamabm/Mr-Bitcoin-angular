import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'coin-animations',
  templateUrl: './coin-animations.component.html',
  styleUrls: ['./coin-animations.component.scss'],
})
export class CoinAnimationComponent implements OnInit, OnChanges {
  @Input() count: number = 0;
  coins: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['count'] &&
      changes['count'].currentValue !== changes['count'].previousValue
    ) {
      this.createCoins();
    }
  }

  createCoins() {
    this.coins = [];
    const topPosition = '69vw';
    const leftPosition = '33vh';
    const delayBetweenCoins = 0.8;

    for (let i = 0; i < this.count; i++) {
      const coin = {
        style: {
          left: topPosition,
          top: leftPosition,
          animationDuration: `${Math.random() * 0.5 + 0.5}s`,
          animationDelay: `${i * delayBetweenCoins}s`,
        },
        hidden: false,
      };
      this.coins.push(coin);
    }

    setTimeout(() => {
      this.coins.forEach((coin) => {
        coin.hidden = true;
      });
    }, (this.count * delayBetweenCoins + 1) * 1000);
  }
}
