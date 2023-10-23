# React/Redux/Router Starter Project

> Provided for the students of the [Bottega Code School](https://bottega.tech/)

*Fork from [es6-webpack2-starter](https://github.com/micooz/es6-webpack2-starter)*

# Proyecto final > RECUERDOS
Aplicación para ver y subir fotos a la web, poder etiquetar a los usuarios registrados en las fotos, poder poner si una foto te gusta y poder añafir historias a una foto.

## Notas
1.- Los únicos que pueden ver y subir fotos son los usuarios registrados en la aplicación. Este registro se ha hecho de manera manual. La aplicación no contempla el registro de usuarios, sólo su autentificación.

2.- Cada foto puede tener historias relacionadas creadas por cualquier usuario.

3.- Todos los usuarios pueden ver todas las historias de una foto pero sólo pueden borrar las historias creadas por él.No se pueden borrar las historias de otros usuarios.

4.- Cada foto puede tener etiquetadas a las personas que aparecen en la foto. Sólo se puede etiquetar a usuarios registrados.

5.- Un usuario puede darle a **me gusta** en una foto. Un usuario puede darle a **me gusta** a una foto suya.

6.- Un usuario sólo puede editar o borrar sus propias fotos, no las de los demás. O sea, al entrar en el menú **Recuerdo Manager** sólo aparecerán las fotos subidas por el usuario logeado en ese momento.

## Datos para poder probar la aplicación
> El BackEnd se ha hecho en Python con Flask y API REST y los datos se guardan en una BD MySql.

> El FrontEnd se ha realizado en React, JavaScript, HTML5 y CSS3.

> Las fotos se almacenan en Cloudinary que es una plataforma para almacenar fotos.

 Para usar Cloudinary hay que registrarse.
 
 En src/components/utils el fichero apis ejemplo.js debe ser renombrado a apis.js e introducir los siguientes datos :
 
   const datosapis = {
       "cloudinary": {
           "cloudName": "Name of cloud name in cloudinary",
           "uploadPreset": "Folder in cloudinary of images",
           "apiKey": "Apikey in cloudinary",
           "apiSecret": "Api secret in cloudinary"
       },
       "urlapi": "http://127.0.0.1:3001/api/"
   }



 
