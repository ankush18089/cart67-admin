import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  varientForm: FormGroup;
  varient: any;
  constructor(
    private product: ProductService,
    private bottomSheetRef: MatBottomSheet,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.varientForm = this.formBuilder.group({
      id: [102, Validators.required],
      price: [this.data.varient.price, Validators.required],
      mrp: [this.data.varient.mrp, Validators.required],
      stock: [this.data.varient.stock, Validators.required],
      is_active: [this.data.varient.is_active],
      is_available: [this.data.varient.is_available],
      is_allow_backorder: [this.data.varient.is_allow_backorder]
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
    console.log(JSON.stringify(this.varientForm.value));
    this.product.updateProduct(this.data.varient.id, JSON.stringify(this.varientForm.value)).subscribe(res => {
    });
    this.bottomSheetRef.dismiss();
  }
  close() {
    this.bottomSheetRef.dismiss();
  }

}
