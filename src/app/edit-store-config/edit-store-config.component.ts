import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-store-config',
  templateUrl: './edit-store-config.component.html',
  styleUrls: ['./edit-store-config.component.css']
})
export class EditStoreConfigComponent implements OnInit {
  storeForm: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({
      name: [this.data.store.name, Validators.required],
      min_amount: [this.data.store.min_amount, Validators.required],
      open: [this.data.store.open, Validators.required],
      delivery_charges: [this.data.store.delivery_charges, Validators.required],
      delivery_free_above: [this.data.store.delivery_free_above, Validators.required]
    });
  }
  save() {
    if(this.storeForm.invalid){
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Invalid values ,please try again !!' }
      });
      return;
    }
    this.spinner.show();
    this.product.updateStore(this.data.store.id, JSON.stringify(this.storeForm.value)).subscribe((res) => {
      this.spinner.hide();
      this.bottomSheet.dismiss(true);
    }, error => {
      console.log('error occurred while getting data from server : ' + error.status);
      this.spinner.hide();
    });
  }

}
