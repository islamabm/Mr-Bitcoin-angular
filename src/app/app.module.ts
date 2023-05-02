import { environment } from '../environments/environment';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contatc-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { UserComponent } from './views/user/user.component';

import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRecordComponent } from './cmps/app-record/app-record.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { TextEffectComponent } from './views/text-effect/text-effect.component';
import { HomePageComponent } from './views/home-page/home-page.component';

import { SignupComponent } from './views/signup/signup.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoinAnimationComponent } from './cmps/coin-animations/coin-animations.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEffectComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    UserComponent,

    HomePageComponent,

    AppHeaderComponent,
    AppRecordComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    SignupComponent,
    TransferFundComponent,
    MovesListComponent,
    CoinAnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
