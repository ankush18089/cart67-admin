import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-product-info',
  templateUrl: './edit-product-info.component.html',
  styleUrls: ['./edit-product-info.component.css']
})
export class EditProductInfoComponent implements OnInit {
  productForm: FormGroup;
  varient: any;
  mrp: number;
  collections: any[] = [];
  categories: any[] = [];
  selectedCategory: any = null;
  constructor(
    private spinner: NgxSpinnerService,
    private product: ProductService,
    private bottomSheetRef: MatBottomSheet,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      store_id: ['', Validators.required],
      picture: [''],
      tags: [''],
      variants: [''],
      category: [''],
      product_type: [''],
      brand: [''],
      active: [''],
      featured: ['']
    });
    this.product.getProduct(this.data.product.id).subscribe((res: any) => {
      this.productForm.get('id').setValue(res.id);
      this.productForm.get('name').setValue(res.name);
      this.productForm.get('store_id').setValue(res.store_id);
      this.productForm.get('picture').setValue(res.picture);
      this.productForm.get('tags').setValue(res.tags);
      this.productForm.get('variants').setValue(res.variants);
      this.productForm.get('category').setValue(res.category);
      this.productForm.get('product_type').setValue(res.product_type);
      this.productForm.get('brand').setValue(res.brand);
      this.productForm.get('active').setValue(res.active);
      this.productForm.get('featured').setValue(res.featured);
    });


    this.product.getCollections('0', '200').subscribe(res => {
      this.collections = res['content'];
    });
    this.product.getCategories().subscribe((res: any[]) => {
      this.categories = res;
    });
  }
  save() {
    this.spinner.show();
    this.product.updateProduct(this.data.product.id, JSON.stringify(this.productForm.value)).subscribe(res => {
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
