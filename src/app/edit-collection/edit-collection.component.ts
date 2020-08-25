import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  collectionForm: FormGroup;
  constructor(
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (this.data.action === 'update') {
      this.collectionForm = this.formBuilder.group({
        name: [this.data.collection.name, Validators.required],
        image_url: [this.data.collection.image_url, Validators.required],
        store_id: [this.data.collection.store_id, Validators.required],
        sequence: [this.data.collection.sequence, Validators.required],
        active: [this.data.collection.active, Validators.required],
        featured: [this.data.collection.featured, Validators.required],
        show_on_search: [this.data.collection.show_on_search, Validators.required]
      });

    } else {
     
      this.collectionForm = this.formBuilder.group({
        name: ['', Validators.required],
        image_url: ['', Validators.required],
        store_id: [localStorage.getItem('store'), Validators.required],
        sequence: ['', Validators.required],
        active: ['', Validators.required],
        featured: ['', Validators.required],
        show_on_search: ['', Validators.required]
      });
    }
  }
  create() {
    this.spinner.show();
    if (this.data.action === 'update') {
      this.product.updateCollections(this.data.collection.id, JSON.stringify(this.collectionForm.value)).subscribe(res => {
        console.log('updated successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        console.log('error occurred while getting data from server : ' + error.status);
        this.spinner.hide();
      });
    } else {
      this.product.createCollection(JSON.stringify(this.collectionForm.value)).subscribe(res => {
        console.log('added successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        console.log('error occurred while getting data from server : ' + error.status);
        this.spinner.hide();
      });
    }
  }

}
