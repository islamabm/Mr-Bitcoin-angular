import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { contactResolver } from './services/conatct.resolver';
import { ChartComponent } from './cmps/chart/chart.component';
import { SignupComponent } from './views/signup/signup.component';
import { UserComponent } from './views/user/user.component';
const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'about',
    component: HomePageComponent,
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
  },

  {
    path: '',
    component: ContactIndexComponent,
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: contactResolver },
      },
      { path: 'edit', component: ContactEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
