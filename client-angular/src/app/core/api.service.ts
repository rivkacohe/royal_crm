import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AddCustomer, Country, Customer, FilePath, Login, Product, RegisterUser, User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private token ='';

  setToken(value:string){
    this.token = value;
  }

  getCountries(): Observable<Array<Country>> {
    return this.GET<Array<Country>>(`countries`)

}

  constructor(private http: HttpClient) { }

  getCustomersList(): Observable<Array<Customer>> {
    return this.GET<Array<Customer>>(`customers`)
  } 
  
  getProductsList(): Observable<Array<Product>> {
    return this.GET<Array<Product>>(`products`)
  }

  getSortedCustomers(column: string, direction: string): Observable<Array<Customer>> {
      return this.GET<Array<Customer>>(`customers?column=${column}&sort=${direction}`)
  }

  getSortedProducts(column: string, direction: string): Observable<Array<Product>> {
      return this.GET<Array<Product>>(`Products?column=${column}&sort=${direction}`)
  }
  
  exportProducts(): Observable<FilePath> {
 return this.GET<FilePath>(`products/export`)
  }
  
  exportCustomers(): Observable<FilePath> {
    return this.http.get<FilePath>(`${environment.serverUrl}/customers/export`);
  }

  findCustomer(searchTerm: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers/find?search=${searchTerm}`)
  }

  addCustomer(customer: AddCustomer): Observable<Customer> {
    return this.POST<Customer>(`customers`, customer)
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.serverUrl}/products`, product, { headers: { 'Content-Type': 'application/json' } })
  }

  deleteProduct(productId: Number): Observable<number> {
    return this.http.delete<number>(`${environment.serverUrl}/products?id=${productId}`)
  }

login(detailes: Login): Observable<User>{
  return this.POST<User>(`login`, detailes)
}

register(user: RegisterUser): Observable<User>{
  return this.POST<User>(`register`, user)
}

GET<T>(url:string): Observable<T>{
return this.http.get<T>(
  `${environment.serverUrl}/${url}`,
  { headers: {'x-auth-token': this.token}}
)
}

POST<T>(url:string, data: object):Observable<T>{
  return this.http.post<T>(
    `${environment.serverUrl}/${url}`,
    data,
    {headers:{
      'Content-Type': 'application/json',
      'x-auth-token': this.token
    }}
  )
}
}