import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class SvgService {
  constructor(private sanitizer: DomSanitizer) {}
  private readonly misterBitcoinSvgs: { [key: string]: string } = {
    homeIconActive: `<svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 gQUQL home-active-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 96 960 960" width="48"><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>`,
    noMenu: `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`,
    record: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24"><path d="M480 633q-43 0-72-30.917-29-30.916-29-75.083V276q0-41.667 29.441-70.833Q437.882 176 479.941 176t71.559 29.167Q581 234.333 581 276v251q0 44.167-29 75.083Q523 633 480 633Zm0-228Zm-30 531V800q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571 742 635.5 680 700 618 700 527h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521 527V276q0-17-11.788-28.5Q497.425 236 480 236q-17.425 0-29.212 11.5Q439 259 439 276v251q0 19 11.5 32.5T480 573Z"/></svg>`,
  };

  getBitcoinSvg(iconName: string): SafeHtml {
    const svg = this.misterBitcoinSvgs[iconName];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
