import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { MainComponent } from './shell/main/main.component';
import { FooterComponent } from './shell/footer/footer.component';
import { ImagenesModule } from '../imagenes/imagenes.module';


@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ImagenesModule
  ],
  exports: [
    ShellComponent
  ]
})
export class CoreModule { }
