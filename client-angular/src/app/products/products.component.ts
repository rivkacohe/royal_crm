import { Component,NgModule, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { environment } from 'src/environments/environment';
import { FilePath, Product,Sort, sortColumn } from '../shared/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
 products! : Array<Product>;
 tableSort!: Sort;
 product!:Product;
searchFieldValue!:string;
deletedProduct!: number;


constructor(private apiService: ApiService) { }

ngOnInit(): void {
  this.getProducts();
  this.tableSort = {
    column: 'name',
    dirAsc: true
  };
}

getProducts() {
  this.apiService.getProductsList().subscribe({
    next: (data: Array<Product>) => { this.products = data },
    error: (err) => console.error(err),
    // complete: () => console.log(`complete`)
  })
}

imagePath(image:string |null): string{
  return !image ? '' :`../../assets/images/${image}`
}

productsTotal(): number {
  return this.products ? this.products.length : 0;
}

sortProducts(column: sortColumn) {
  if (this.tableSort.column === column) {
    this.tableSort.dirAsc = !this.tableSort.dirAsc;
}
else {
    this.tableSort.column = column;
    this.tableSort.dirAsc = true;
}

const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';

  this.apiService.getSortedProducts(column, direction).subscribe({
      next: (data: Array<Product>) => { this.products = data },
      error: (err) => console.error(err)
  })
}
clearSearch() {
  this.searchFieldValue = '';
  this.getProducts();
}
displaySort(column: sortColumn): string {
  if (this.tableSort.column === column) {
    return this.tableSort.dirAsc ? 'bi-chevron-up' : 'bi-chevron-down';
  }
  return 'bi-chevron-expand';
}

delteProduct(productId:number){
      this.apiService.deleteProduct(productId).subscribe({
        next: (data:number)=>{
          this.deletedProduct= data;
     this.getProducts()
        }
      }) 
}

exportProductsData() {
  this.apiService.exportProducts().subscribe({
      next: (data: FilePath) => {
          window.open(`${environment.serverUrl}/${data.name}`);
      },
      error: (err) => console.error(err),
  })
}
}
 