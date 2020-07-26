### DESCRIPCIÓN
Sistema Web para buscar Personas, Peliculas, Canciones, Shows de Televisión y eBooks.


### CONFIGURACIÓN

Para el correcto funcionamiento debemos dirigirnos al archivo libs/js/ajaxModules/moduleApi.js y modificar la línea 5 (this.url)

 this.url = "http://localhost/tribalMnC/Controllers/search.php";

 Esto con el fin de reemplazar la sección "localhost" con la URL donde tengamos alojados nuestra API.


### REQUERIMIENTOS DEL PROYECTO (UBUNTU)

- APACHE
- PHP 7.2

#### Instalación de APACHE 

Abrir una terminal y ejecutar los siguientes comandos:

 $ sudo apt-get update

 $ sudo apt-get install apache2

La instalación solicitará autorización para instalar los paquetes, para continuar debe presiones "S" o "Y" dependiendo del idioma configurado en su Sistema Operativo.

Al terminar la instalación para verificar que el servidor está funcional puede abrir una ventana en un navegador web y dirigirse a la url http://127.0.0.1 o http://localhost (solo para servidores locales).

Fuente: https://phoenixnap.com/kb/how-to-install-apache-web-server-on-ubuntu-18-04

(Pasos 1 y 2)

#### Instalación de PHP 7.2

Abrir una terminal y ejecutar los siguientes comandos:

 $ apt-get install python-software-properties

 $ sudo add-apt-repository ppa:ondrej/php

 $ apt-get update

 $ sudo apt-get install php7.2

 $ update-alternatives --set php /usr/bin/php7.2

 $ a2enmod php7.2

 $ systemctl restart apache2

Fuente: https://www.linuxadictos.com/instalar-php-7-2-ubuntu-debian.html
