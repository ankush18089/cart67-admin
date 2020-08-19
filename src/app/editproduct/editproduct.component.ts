import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  varientForm: FormGroup;
  constructor(
    private bottomSheetRef: MatBottomSheet,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit(): void {
    this.varientForm = this.formBuilder.group({
      price: [this.data.varient.price, Validators.required],
      qty: ['Ankush', Validators.required],
      active: ['']
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
    alert(JSON.stringify(this.varientForm.value));
    this.bottomSheetRef.dismiss();
  }
  close() {
    this.bottomSheetRef.dismiss();
  }

}
