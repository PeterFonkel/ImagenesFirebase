import { ComponentFactoryResolver, Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import { environment } from 'src/environments/environment';
import { Imagen } from '../models/imagen';
import { Observable, of } from 'rxjs';

const app = firebase.initializeApp(environment.firebaseConfig);



@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor() { }

  getImagenPrincipal(id: number): Observable<Imagen[]> {
    let imagenes: any[] = [];
    //Creo la referencia al nodo que quiero recuperar
    var imagenPrincipalRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/principal`);
    //Recupero la informacion y la asigno al array de imagenes
    imagenPrincipalRef.on("value", (snapshot) => {
      let data = snapshot.val();
      console.log("Data: ", data)
      for (var key in data) {
        let imagen = new Imagen();
        imagen.url = data[key].url;
        imagen.nombre = data[key].nombre;
        imagen.tipo = data[key].tipo;
        imagenes.push(imagen);
      }
    });
    return of(imagenes);
  }

  getImagenesSecundarias(id: number): Observable<Imagen[]> {
    let secundarias: Imagen[] 
    secundarias = [];
    console.log("Recien creado array:", secundarias)
    //Creo la referencia al nodo que quiero recuperar
    var imagenesSecundariasRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/secundaria`);
    //Recupero la informacion y la asigno al array de imagenes
    let onDataChange = imagenesSecundariasRef.on("value", (snapshot) => {
      let data = snapshot.val();
      console.log("Data: ", data);
      console.log("Secundarias antes del for", secundarias)
      for (var key in data) {
        let imagen = new Imagen();
        imagen.url = data[key].url;
        imagen.nombre = data[key].nombre;
        imagen.tipo = data[key].tipo;
        secundarias.push(imagen);
      }
      imagenesSecundariasRef.off("value", onDataChange);
      console.log("Secundarias despues del for", secundarias);
    });
    return of(secundarias);
  }

  subirImagen(file: File, id: number, tipo: string): void {
    let arrayNombre = file.name.split(".");
    //Creo una referencia en el storage
    var storageRef = firebase.storage().ref().child(`imagenes/${id}/${tipo}/${arrayNombre[0]}`);
    //Subir el archivo al storage
    storageRef.put(file).then(data => {
      //Creo una referencia en la base de datos
      var databaseRef = firebase.database().ref().child(`imagenes/${id}/${tipo}/${arrayNombre[0]}`)
      storageRef.getDownloadURL().then((url) => {
        //Con la url del storage introduzco datos en la referencia de la base de datos
        databaseRef.set({
          nombre: file.name,
          url: url,
          tipo: tipo
        });
      })
    });
  }

  deleteImage(imagen: Imagen, id: number): void {
    console.log("en delete")
    let nombreSinPunto = imagen.nombre.split(".")[0];
    let imagenRef = firebase
      .database()
      .ref()
      .child(`imagenes/${id}/${imagen.tipo}/${nombreSinPunto}`);
    let imagenStorageRef = firebase
      .storage()
      .ref()
      .child(`imagenes/${id}/${imagen.tipo}/${nombreSinPunto}`);
    imagenRef.remove();
    imagenStorageRef.delete();
  }
  //Metodo para borrar un nodo dela base de datos de Firebase
  deleteNode(id: number): void {
    let nodeRef = firebase.database().ref().child(`imagenesFB/${id}/`);
    nodeRef.remove();
    //Borrado de la carpeta correspondiente en Storage
    this.deleteFolderContents(`imagenes/${id}/`);
  }

  //Metodo para borrar una carpeta entera del Strorage
  deleteFolderContents(path: string) {
    const ref = firebase.storage().ref(path);
    ref
      .listAll()
      .then((dir) => {
        dir.items.forEach((fileRef) => {
          this.deleteFile(ref.fullPath, fileRef.name);
        });
        dir.prefixes.forEach((folderRef) => {
          this.deleteFolderContents(folderRef.fullPath);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteFile(pathToFile: string, fileName: string) {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete();
  }
}
