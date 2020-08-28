import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  tags: any[] = [];
  selectedTagId = 0;
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (this.data.action === 'update') {

      this.categoryForm = this.formBuilder.group({
        name: [this.data.category.name, Validators.required],
        id: [this.data.category.id, Validators.required],
        image: [this.data.category.image, [Validators.required, Validators.pattern(this.reg)]],
        store_id: [this.data.category.store_id, Validators.required],
        sequence: [this.data.category.sequence, Validators.required],
        active: [this.data.category.active, Validators.required],
        bg_color: [this.data.category.bg_color, Validators.required],
      });
    } else {
      this.categoryForm = this.formBuilder.group({
        name: ['', Validators.required],
        image: ['', [Validators.required, Validators.pattern(this.reg)]],
        store_id: ['', Validators.required],
        sequence: ['', Validators.required],
        active: ['', Validators.required],
        bg_color: ['', Validators.required],
      });
    }
  }

  create() {
    if (this.categoryForm.invalid) {
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Invalid values ,please try again !!' }
      });
      return;
    }
    this.spinner.show();
    if (this.data.action === 'update') {
      this.product.updateCategory(this.data.category.id, JSON.stringify(this.categoryForm.value)).subscribe(res => {
        console.log('updated successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        console.log('error occurred while getting data from server : ' + error.status);
        this.spinner.hide();
      });
    } else {
      //add new category
    }
  }
}
