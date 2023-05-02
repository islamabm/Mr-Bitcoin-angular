import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  fullname: string = '';

  constructor(private userService: UserService, private router: Router) {}

  doSignup(event: Event): void {
    event.preventDefault();
    this.userService.signup(this.fullname);
    this.router.navigate(['/']);
  }

  handleFullnameChange(event: any): void {
    this.fullname = event.target.value;
  }
}
