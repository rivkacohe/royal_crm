import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { PhonePipe } from './pipes/phone.pipe';
import { PricePipe } from './pipes/price.pipe';
import { ExportComponent } from './export/export.component';
import { PageTitleComponent } from './page-title/page-title.component';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    PhonePipe,
    PricePipe,
    ExportComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    PhonePipe,
    PricePipe,
    ExportComponent,
    PageTitleComponent,
  ]
})
export class SharedModule { }
