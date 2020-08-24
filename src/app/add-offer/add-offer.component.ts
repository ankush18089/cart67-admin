import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOffer: FormGroup;
  constructor(
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.data.action === 'update') {
      this.addOffer = this.formBuilder.group({
        name: [this.data.offer.name, Validators.required],
        title: [this.data.offer.title, Validators.required],
        picture: [this.data.offer.picture, Validators.required],
        sub_text: [this.data.offer.sub_text, Validators.required],
        type: [this.data.offer.type, Validators.required]
      });

    } else {
      this.addOffer = this.formBuilder.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        picture: ['', Validators.required],
        sub_text: ['', Validators.required],
        type: ['']
      });
    }

  }
  create() {
    this.spinner.show();
    if (this.data.action === 'update') {
      this.product.updateOffer(this.data.offer.id, JSON.stringify(this.addOffer.value)).subscribe(res => {
        console.log('updated successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      });
    } else {
      this.product.createOffer(JSON.stringify(this.addOffer.value)).subscribe(res => {
        console.log('Added successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      });
    }
  }

}
