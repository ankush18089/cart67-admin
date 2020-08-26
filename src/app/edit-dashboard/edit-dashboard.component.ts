import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {
  addDashBoardItem: FormGroup;
  itemForm: FormGroup;
  type: string='';
  collections: any[] = [];
  selectedCollection :any;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.type = this.data.dashboard.item.type;
    
    if (this.data.action === 'update') {
      if (this.type == 'Collection') {
        this.itemForm = this.formBuilder.group({
          type: [this.data.dashboard.item.type, Validators.required],
          title: [this.data.dashboard.item.title, Validators.required],
          img_url: ['', [Validators.required,Validators.pattern(this.reg)]],
          id: [this.data.dashboard.item.id, Validators.required],
          expanded: [this.data.dashboard.item.expanded, Validators.required]
        });
        this.addDashBoardItem = this.formBuilder.group({
          sequence: [this.data.dashboard.sequence, Validators.required],
          active: [this.data.dashboard.active, Validators.required],
          item: this.itemForm
        });
      } else {
        this.itemForm = this.formBuilder.group({
          type: [this.data.dashboard.item.type, Validators.required],
          title: [this.data.dashboard.item.title, Validators.required]
        });
        this.addDashBoardItem = this.formBuilder.group({
          sequence: [this.data.dashboard.sequence, Validators.required],
          active: [this.data.dashboard.active, Validators.required],
          item: this.itemForm
        });
      }
    } else {
      if (this.type == 'Collection') {
        this.itemForm = this.formBuilder.group({
          type: ['', Validators.required],
          title: ['', Validators.required],
          img_url: ['', [Validators.required,Validators.pattern(this.reg)]],
          id: [0, Validators.required],
          expanded: [true, Validators.required]
        });
        this.addDashBoardItem = this.formBuilder.group({
          sequence: ['', Validators.required],
          active: [true, Validators.required],
          item: this.itemForm
        });
      } else {
        this.itemForm = this.formBuilder.group({
          type: ['', Validators.required],
          title: ['', Validators.required]
        });

        this.addDashBoardItem = this.formBuilder.group({
          sequence: ['', Validators.required],
          active: [true, Validators.required],
          item: this.itemForm
        });
      }
    }
    this.spinner.show();
    this.product.getCollectionsList().subscribe((res: any[]) => {
      this.spinner.hide();
      this.collections = res;
      if (this.type == 'Collection' && this.data.action === 'update') {
        this.collections.forEach(collection => {
          if (collection.id === this.data.dashboard.item.id) {
            this.selectedCollection = collection;
            this.itemForm.get('img_url').setValue(this.selectedCollection.image_url);
          }
        });
      }
    }, error => {
      this.spinner.hide();
      console.log('error occurred while getting data from server   : ' + error.status);
    });


  }
  collectionChange(){
    this.itemForm.get('img_url').setValue(this.selectedCollection.image_url);
  }

  typeChange() {
    if (this.type == 'Collection') {
      this.itemForm = this.formBuilder.group({
        type: ['', Validators.required],
        title: ['', Validators.required],
        img_url: ['', [Validators.required,Validators.pattern(this.reg)]],
        id: [0, Validators.required],
        expanded: [true, Validators.required]
      });
      this.addDashBoardItem = this.formBuilder.group({
        sequence: ['', Validators.required],
        active: ['', Validators.required],
        item: this.itemForm
      });
    } else {
      this.itemForm = this.formBuilder.group({
        type: [this.type, Validators.required],
        title: ['', Validators.required]
      });

      this.addDashBoardItem = this.formBuilder.group({
        sequence: ['', Validators.required],
        active: [true, Validators.required],
        item: this.itemForm
      });
    }
  }
  create() {
    if (this.type === 'Collection') {
      this.itemForm.get('id').setValue(this.selectedCollection.id);
      this.itemForm.get('type').setValue(this.type);
    }
   
    if(this.addDashBoardItem.invalid || this.itemForm.invalid){
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Invalid values ,please try again !!' }
      });
      return;
    }
    this.spinner.show();
    if (this.data.action === 'update') {
      this.product.updateDashboardItem(this.data.dashboard.id, JSON.stringify(this.addDashBoardItem.value)).subscribe(res => {
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        this.spinner.hide();
        console.log('error occurred while getting data from server   : ' + error.status);
      });
    } else {
      this.product.createDashboardItem(JSON.stringify(this.addDashBoardItem.value)).subscribe(res => {
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        this.spinner.hide();
        console.log('error occurred while getting data from server   : ' + error.status);
      });
    }
  }

}
