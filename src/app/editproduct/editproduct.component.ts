import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  varientForm: FormGroup;
  varient: any;
  mrp:number;
  constructor(
    private spinner: NgxSpinnerService,
    private product: ProductService,
    private bottomSheetRef: MatBottomSheet,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.varientForm = this.formBuilder.group({
      id: [102, Validators.required],
      price: ['',Validators.required],
      mrp: ['', Validators.required],
      stock: ['', Validators.required],
      is_active: [''],
      is_available: [''],
      is_allow_backorder: ['']
    });


    this.product.getVarient(this.data.varient.id).subscribe(res => {
      this.varientForm.get('price').setValue(res['price']);
      this.varientForm.get('mrp').setValue(res['mrp']);
      this.varientForm.get('stock').setValue(res['stock']);
      this.varientForm.get('is_active').setValue(res['is_active']);
      this.varientForm.get('is_available').setValue(res['is_available']);
      this.varientForm.get('is_allow_backorder').setValue(res['is_allow_backorder']);
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  save() {
    this.spinner.show();
    this.product.updateProduct(this.data.varient.id, JSON.stringify(this.varientForm.value)).subscribe(res => {
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log('error occurred while getting data from server   : ' + error.status);
    });
    this.bottomSheetRef.dismiss(true);
  }
  close() {
    this.bottomSheetRef.dismiss(false);
  }
}
