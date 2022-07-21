import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './core/auth.service';

const routes: Routes =  [
  
          { path: 'signin-component', component: SigninComponent },
          { path: 'login-component', component: LoginComponent },
          {
              path: '',
              canActivateChild: [AuthService],
              children: [
                  { path: 'home-component', component: HomeComponent },
                  { path: 'customers-component', component: CustomersComponent },
                  { path: 'products-component', component: ProductsComponent },
                  { path: 'orders-component', component: OrdersComponent },
              ]
          }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
