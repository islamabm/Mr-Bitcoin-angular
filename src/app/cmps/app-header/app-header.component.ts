import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../../services/svg.service';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  showMenu = false;
  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer
  ) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  close(): void {
    this.showMenu = !this.showMenu;
  }
  getSvgIcon(): string {
    if (this.showMenu) {
      return 'noMenu';
    } else {
      return 'menu';
    }
  }
  getMenuIcon(): SafeHtml {
    return this.svgService.getBitcoinSvg(this.getSvgIcon());
  }
}
