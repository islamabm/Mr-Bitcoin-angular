import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: UserModel;
  moves!: any[];
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}

  async ngOnInit() {
    this.user = this.userService.getLoggedinUser(); // Change this line
    this.bitcoinService.getRate(this.user.coins).subscribe((rate) => {
      this.user.bitcoinRate = rate;
    });
    const loggedInUser = this.userService.getLoggedinUser(); // Change this line
    console.log('user', loggedInUser);
    this.moves = loggedInUser.moves.slice(0, 3);
  }
}
