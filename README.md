# Imagenes en Firebase

Este proyecto contiene los componentes básicos para cargar, ver y gestionar imagenes en firebase.

## Configuración Firebase

### Creación de un proyecto Firebase

[Documentación Firebase](https://firebase.google.com/docs/web/setup?authuser=0)

### Archivo de configutración (enviroments/firebase.ts)

En la carpeta enviroments creamos el archivo firebase.ts con la configuración de nuestro proyecto Firebase. Esta información se encuentra en el icono ⚙️ al lado de "Descripción general del proyecto" > "configuración del proyecto".

`export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };`

Estas claves son privadas. Añadir a gitignore antes de subir a github.

## Implementación

### ImagenesService
Encargado de todas las funciones con Firebase.

### Ver Imágenes
Componente de visualización de umagenes con un id común,

### Gestionar Imágenes
Subir/Editar/Eliminar imagenes con un id.
