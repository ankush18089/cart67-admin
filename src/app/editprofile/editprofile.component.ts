import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
  providers: [DatePipe]
})
export class EditprofileComponent implements OnInit {
  profile: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService
  ) { }
 
  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      name: [this.data.user.name, Validators.required],
      email: [this.data.user.email, Validators.required],
      gender: [this.data.user.gender, Validators.required],
      phone: [{ value: this.data.user.mobile, disabled: true }, Validators.required],
      dob: [new Date(Date.parse(this.data.user.dob))]
    });
  }
  save() {
    if (this.profile.invalid) {
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Invalid' }
      });
      return;
    }
    this.spinner.show();
    const user = new User();
    user.name = this.profile.get('name').value;
    user.dob = this.datePipe.transform(this.profile.get('dob').value, 'yyyy-MM-dd');
    user.email = this.profile.get('email').value;
    user.gender = this.profile.get('gender').value;
    this.product.updateProfile(JSON.stringify(user)).subscribe(() => {
      this.spinner.hide();
      this.bottomSheet.dismiss();
    });
  }

}
export class User {
  name: string;
  gender: string;
  dob: string;
  email: string;
}
