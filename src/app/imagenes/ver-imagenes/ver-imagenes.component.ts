import { Component, OnInit } from '@angular/core';
import { Imagen } from '../models/imagen';
import { ImagenesService } from '../service/imagenes.service';

@Component({
  selector: 'app-ver-imagenes',
  templateUrl: './ver-imagenes.component.html',
  styles: [
  ]
})
export class VerImagenesComponent implements OnInit {
  id: number = 125;
  imagenPrincipalSubida: Imagen[] = [];
  imagenesSecundariasSubidas: Imagen[] = [];

  constructor(private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.getImagenPrincipal();
    this.getImagenesSecundarias();
  }

  getImagenPrincipal(): void {
    this.imagenesService.getImagenPrincipal(this.id).subscribe(response => {
      console.log("Respuesta principal service", response);
      this.imagenPrincipalSubida = response;

    })
  }

  getImagenesSecundarias(): void {
    this.imagenesService.getImagenesSecundarias(this.id).subscribe(response => {
      this.imagenesSecundariasSubidas = [];
      console.log("Respuesta secundarias service", response)
      this.imagenesSecundariasSubidas = response;
    })
  }


}
