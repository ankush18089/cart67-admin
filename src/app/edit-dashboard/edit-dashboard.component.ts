import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  addDashBoardItem: FormGroup;
  itemForm: FormGroup;
  type = 'Collection';
  collections: any[] = [];
  selectedCollection: any=null;
  constructor(
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.product.getCollectionsList().subscribe((res: any[]) => {
      this.collections = res;
      if (this.type == 'Collection' && this.data.action === 'update') {
        this.collections.forEach(collection => {
          if (collection.id === this.data.dashboard.item.id) {
            this.selectedCollection = collection;
          }
        });
      }
    }, error => {
      console.log('error occurred while getting data from server   : ' + error.status);
    });
    this.type = this.data.dashboard.item.type;
    if (this.data.action === 'update') {
      if (this.type == 'Collection') {
        this.itemForm = this.formBuilder.group({
          type: [this.data.dashboard.item.type, Validators.required],
          title: [this.data.dashboard.item.title, Validators.required],
          img_url: [this.data.dashboard.item.img_url, Validators.required],
          id: [this.data.dashboard.item.id, Validators.required],
          expanded: [this.data.dashboard.item.expanded, Validators.required]
        });
        this.addDashBoardItem = this.formBuilder.group({
          sequence: [this.data.dashboard.sequence, Validators.required],
          active: [this.data.dashboard.active, Validators.required],
          item: this.itemForm
        });


      } else {
        this.addDashBoardItem = this.formBuilder.group({
          sequence: [this.data.dashboard.sequence, Validators.required],
          active: [this.data.dashboard.active, Validators.required],
          item: this.formBuilder.group({
            type: [this.data.dashboard.item.type, Validators.required],
            title: [this.data.dashboard.item.title, Validators.required]
          })
        });
      }
    } else {
      if (this.type == 'Collection') {
        this.itemForm = this.formBuilder.group({
          type: ['', Validators.required],
          title: ['', Validators.required],
          img_url: ['', Validators.required],
          id: ['', Validators.required],
          expanded: ['', Validators.required]
        });
        this.addDashBoardItem = this.formBuilder.group({
          sequence: ['', Validators.required],
          active: ['', Validators.required],
          item: this.itemForm
        });
      } else {
        this.addDashBoardItem = this.formBuilder.group({
          sequence: ['', Validators.required],
          active: ['', Validators.required],
          item: this.formBuilder.group({
            type: ['', Validators.required],
            title: ['', Validators.required]
          })
        });
      }
    }
  }

  typeChange() {
    if (this.type == 'Collection') {
      this.itemForm = this.formBuilder.group({
        type: ['', Validators.required],
        title: ['', Validators.required],
        img_url: ['', Validators.required],
        id: ['', Validators.required],
        expanded: ['', Validators.required]
      });
      this.addDashBoardItem = this.formBuilder.group({
        sequence: ['', Validators.required],
        active: ['', Validators.required],
        item: this.itemForm
      });
    } else {
      this.addDashBoardItem = this.formBuilder.group({
        sequence: ['', Validators.required],
        active: ['', Validators.required],
        item: this.formBuilder.group({
          type: ['', Validators.required],
          title: ['', Validators.required]
        })
      });
    }
  }
  create() {
    this.spinner.show();
    if (this.type == 'Collection') {
      console.log(this.selectedCollection.id);
      this.itemForm.get('id').setValue(this.selectedCollection.id);
      console.log(this.itemForm.value);
    }

    if (this.data.action === 'update') {
      console.log(JSON.stringify(this.addDashBoardItem.value));
      this.product.updateCollections(this.data.dashboard.id, JSON.stringify(this.addDashBoardItem.value)).subscribe(res => {
        console.log('updated successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      });
    } else {
      console.log(JSON.stringify(this.addDashBoardItem.value));
      this.product.createCollection(JSON.stringify(this.addDashBoardItem.value)).subscribe(res => {
        console.log('Added successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      });
    }
  }

}
