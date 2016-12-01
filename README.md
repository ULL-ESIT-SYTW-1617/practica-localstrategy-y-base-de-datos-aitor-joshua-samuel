#Práctica Passport y localStorage

##¿Que se hace en esta práctica?

* El servidor proveído por el plugin ```iaas-ull-es``` deberá autenticar al lector del libro usando ```LocalStrategy``` y una base de datos en la que se guarda la información acerca de los usuarios.
**La práctica se ha hecho en el plugin iaas-ull-es.** Debido a que hemos usado MySQL.
* Para esta práctica se usara el paquete Passport-local para que el usuario acceda al contenido del libro haciendo login con su nombre de usuario y contraseña.

##Instrucciones

* Instalar [```gitbook-start-aitor-joshua-samuel```](https://www.npmjs.com/package/gitbook-start-aitor-joshua-samuel) y desplegar con el comando ```gitbook-start -n milibro```
* Desplegar el plugin iaas-ull-es con ```gitbook-start -d iaas-ull-es -p db```Para desplegar iaas con la estrategia Local con base de datos.
* Ejecutar ```gitbook-build``` para construir los ```HTML```
* Conectarse a ```mysql``` mediante el comando ```mysql -u root -p``` Con esto arrancamos con el usuario root y nos pide que introduzcamos una contraseña para la base de datos.
* Rellenamos el fichero que se encuentra en ```db/dataBase.json```:

```json
{
  "dbHost": "localhost",
  "dbUser": "root",
  "dbPassword": "mypassword",
  "dbDatabase": "sytw"
}
```

* Dentro de ```mysql``` ejecutamos ```source usuario.sql``` y creamos la base de datos ```sytw``` y la tabla ```login```.
* Ejecutamos ```node server.js```.

##Autores

1. [Aitor Bernal Falcón](http://chinegua.github.io/)
2. [Samuel Ramos Barroso](http://losnen.github.io/)
3. [Joshua Pérez García](http://joshuape.github.io/)


##Repositorio

* [Repositorio del main](https://github.com/ULL-ESIT-SYTW-1617/crear-repositorio-en-github-aitor-joshua-samuel)
* [Repositorio del plugin iaas](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-aitor-joshua-samuel)
* [Enlace a NPM del main](https://www.npmjs.com/package/gitbook-start-aitor-joshua-samuel)
* [Enlace a NPM del plugin iaas](https://www.npmjs.com/package/gitbook-start-iaas-ull-es-aitor-joshua-samuel)

##Enlaces de interés
* [La práctica en gitbook](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaplugin.html)
