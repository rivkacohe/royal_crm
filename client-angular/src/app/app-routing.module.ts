import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'home-component',component:HomeComponent},
  {path:'customers-component',component: CustomersComponent},
  {path:'products-component',component: ProductsComponent},
  {path:'orders-component',component: OrdersComponent},
  {path:'signin-component',component: SigninComponent},
  {path:'login-component', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
