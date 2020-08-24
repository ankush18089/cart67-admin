import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { StoreMessageComponent } from './store-message/store-message.component';
import { OffersComponent } from './offers/offers.component';
import { MasterProductComponent } from './master-product/master-product.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'master', component: MasterProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'nostore', component: StoreMessageComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
