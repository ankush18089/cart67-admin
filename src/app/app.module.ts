import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SerializePipe } from './serialize.pipe';
import { DatePipe } from '@angular/common';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token-interceptor.service';
import { EditproductComponent } from './editproduct/editproduct.component';
import { HeaderComponent } from './header/header.component';
import { StoreMessageComponent } from './store-message/store-message.component';
import { OffersComponent } from './offers/offers.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MasterProductComponent } from './master-product/master-product.component';
import { PopupmessageComponent } from './popupmessage/popupmessage.component';
import { CollectionsComponent } from './collections/collections.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
@NgModule({
  declarations: [
    ProfileComponent,
    EditprofileComponent,
    HeaderComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    SerializePipe,
    EditproductComponent,
    StoreMessageComponent,
    OffersComponent,
    AddOfferComponent,
    MasterProductComponent,
    PopupmessageComponent,
    CollectionsComponent,
    EditCollectionComponent,
    DashboardComponent,
    EditDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  entryComponents: [
    PopupmessageComponent,
    EditproductComponent,
    EditprofileComponent,
    EditDashboardComponent,
    EditCollectionComponent,
    AddOfferComponent
  ],
  providers: [
    DatePipe,
    SerializePipe,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
