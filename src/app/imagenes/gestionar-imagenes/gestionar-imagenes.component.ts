import { Component,  OnInit } from '@angular/core';
import { Imagen } from '../models/imagen';
import { ImagenesService } from '../service/imagenes.service';
declare var $: any;

@Component({
  selector: 'app-gestionar-imagenes',
  templateUrl: './gestionar-imagenes.component.html',
  styles: [
  ]
})
export class GestionarImagenesComponent implements OnInit {

  id: number = 125;
  imagenPrincipalSubida: Imagen[] = [];
  imagenesSecundariasSubidas: Imagen[] = [];
  imagenPrincipalASubir: Imagen = new Imagen();
  archivoPrincipalASubir!: File;
  imagenesSecundariasASubir: Imagen[] = [];
  archivosSecundariosASubir: File[] = [];

  constructor(private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.getImagenPrincipal();
    this.getImagenesSecundarias();
  }

  seleccionarImagen(e: any): any {
    this.imagenPrincipalASubir = new Imagen();
    for (let index = 0; index < e.target.files.length; index++) {
      let imagen = new Imagen();
      imagen.nombre = e.target.files[index].name;
      imagen.url = URL.createObjectURL(e.target.files[index]);
      this.imagenPrincipalASubir = imagen;
      this.archivoPrincipalASubir = e.target.files[index];
    }
  }

  deseleccionarImagen(imagen: Imagen): void {
    //Eliminamos la imagen y el archivo selecionado
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }

  seleccionarImagenes(e: any): void {
    this.imagenesSecundariasASubir = [];
    this.archivosSecundariosASubir = [];
    for (let index = 0; index < e.target.files.length; index++) {
      let imagen = new Imagen();
      imagen.nombre = e.target.files[index].name;
      imagen.url = URL.createObjectURL(e.target.files[index]);
      this.imagenesSecundariasASubir.push(imagen);
      this.archivosSecundariosASubir.push(e.target.files[index]);
    }
  }

  deseleccionarImagenes(imagen: Imagen): void {
    //Eliminamos la imagen del array de selección de Imagenes
    let arrayCambio: Imagen[] = [];
    this.imagenesSecundariasASubir.forEach(element => {
      if (element !== imagen) {
        arrayCambio.push(element);
      }
    })
    this.imagenesSecundariasASubir = arrayCambio;
    //Eliminamos la imagen del array de selección de Archivos
    let arrayCambio2: File[] = [];
    this.archivosSecundariosASubir.forEach(element => {
      if (element.name !== imagen.nombre) {
        arrayCambio2.push(element);
      }
    })
    this.archivosSecundariosASubir = arrayCambio2;
    document.getElementById('uploader2');
    $("#files").val('');
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

  subirImagenPrincipal(): void {
    if (this.imagenPrincipalSubida[0]) {
      this.imagenesService.deleteImage(this.imagenPrincipalSubida[0], this.id);
    }
    this.imagenesService.subirImagen(this.archivoPrincipalASubir, this.id, "principal");
    this.imagenesService.getImagenPrincipal(this.id).subscribe(response => {
      this.imagenPrincipalSubida = response;
    })
    this.restartSeleccionImagen();
    this.getImagenPrincipal();
  }

  subirImagenesSecundarias(): void {
    this.archivosSecundariosASubir.forEach(element => {
      this.imagenesService.subirImagen(element, this.id, "secundaria");
    })
    this.imagenesService.getImagenesSecundarias(this.id).subscribe(response => {
      this.imagenesSecundariasSubidas = response;
      console.log("Respuesta secundarias service:", response)
    })
    this.restartSeleccionImagenes();
    
    setTimeout(()=>{this.getImagenesSecundarias();}, 4000)
    
  }

  eliminarImagen(imagen: Imagen): void {
    this.imagenesService.deleteImage(imagen, this.id);
    this.getImagenPrincipal();
    this.getImagenesSecundarias();
  }

  restartSeleccionImagen(): void {
    this.imagenPrincipalASubir = new Imagen();
    this.archivoPrincipalASubir = new File([], "");
    $("#file").val('');
  }
  restartSeleccionImagenes(): void {
    this.imagenesSecundariasASubir = [];
    this.archivosSecundariosASubir = [];
    $("#files").val('');
  }
}
