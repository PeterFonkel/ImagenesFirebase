import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { FormsModule } from '@angular/forms';
import { ImagenComponent } from './gestionar-imagenes/imagen/imagen.component';
import { GestionarImagenesComponent } from './gestionar-imagenes/gestionar-imagenes.component';
import { VerImagenesComponent } from './ver-imagenes/ver-imagenes.component';


@NgModule({
  declarations: [
    ImagenComponent,
    GestionarImagenesComponent,
    VerImagenesComponent,
  ],
  imports: [
    CommonModule,
    ImagenesRoutingModule,
    FormsModule
  ],
  exports: [
    GestionarImagenesComponent,
    VerImagenesComponent
  ]
})
export class ImagenesModule { }
