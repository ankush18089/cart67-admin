import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-edit-product-info',
  templateUrl: './edit-product-info.component.html',
  styleUrls: ['./edit-product-info.component.css']
})
export class EditProductInfoComponent implements OnInit {

  visible = true;
  separatorKeysCodes: string[] = ['COMMA'];
  filteredFruits: Observable<string[]>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  productForm: FormGroup;
  varient: any;
  mrp: number;
  tags: any[] = [];
  categories: any[] = [];
  selectedCategory: any = null;
  selectedTags: any[] = [];
  productsTags: any[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private product: ProductService,
    private bottomSheetRef: MatBottomSheet,
    private formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.product.getCollections('0', '200').subscribe(res => {
      this.tags = res['content'];
    });
    this.product.getCategories().subscribe((res: any[]) => {
      this.categories = res;
    });

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
      if (res.tags) {
        this.productsTags = res.tags;
        this.tags.forEach(alltag => {
          this.productsTags.forEach(productTag => {
            if (productTag.id === alltag.id) {
              this.selectedTags.push(productTag);
            }
          });
        });
      }
      console.log(JSON.stringify(this.selectedTags));
      this.productForm.get('tags').setValue(this.selectedTags);
      this.productForm.get('variants').setValue(res.variants);
      if (res.category) {
        this.categories.forEach(element => {
          if (element.id === res.category.id) {
            this.selectedCategory = element;
          }
        });
      }
      this.productForm.get('category').setValue(this.selectedCategory);
      this.productForm.get('product_type').setValue(res.product_type);
      this.productForm.get('brand').setValue(res.brand);
      this.productForm.get('active').setValue(res.active);
      this.productForm.get('featured').setValue(res.featured);
    });
  }
  categoryChange() {
    this.productForm.get('category').setValue(this.selectedCategory);
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

  remove(tag: any): void {
    this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagInput.nativeElement.value = '';
    this.selectedTags.push(event.option.value);
    this.selectedTags = this.selectedTags.filter((n, i) => this.selectedTags.indexOf(n) === i);
  }

}
