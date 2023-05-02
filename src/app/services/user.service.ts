import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject } from 'rxjs'; // Add this import
import { storageService } from './async-storage.service';
import { ContactService } from './contact.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private movesSubject = new BehaviorSubject<any[]>([]);
  public moves$ = this.movesSubject.asObservable();
  constructor() {}

  signup(name: string): UserModel {
    const user = new UserModel(
      name,
      100,
      [],
      'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png'
    );
    storageService.save('user', user);
    return user;
  }

  getLoggedinUser(): UserModel {
    return storageService.load('user');
  }

  private createMove(contact: any, amount: number) {
    const newMove = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    };
    return newMove;
  }

  transferCoins(amount: number, contact: any): UserModel {
    const loggedInUser = storageService.load('user');
    const newMove = this.createMove(contact, amount);
    loggedInUser.moves.unshift(newMove);
    loggedInUser.coins -= amount;
    storageService.save('user', loggedInUser);
    this.movesSubject.next(loggedInUser.moves);
    return loggedInUser;
  }

  async getMovesForContact(contactId: string) {
    const loggedInUser = this.getLoggedinUser();
    const moves = loggedInUser.moves.filter((move) => move.toId === contactId);
    return moves;
  }
}
