# PRACTICA JENKINS
## ¿Que es Jenkins ?

Jenkins es un servidor open source para la integración continua. Es una herramienta que se utiliza para compilar y probar proyectos de software de forma continua, lo que facilita a los desarrolladores integrar cambios en un proyecto y entregar nuevas versiones a los usuarios. Escrito en Java, es multiplataforma y accesible mediante interfaz web. Es el software más utilizado en la actualidad para este propósito.

Con Jenkins, las organizaciones aceleran el proceso de desarrollo y entrega de software a través de la automatización. Mediante sus centenares de plugins, se puede implementar en diferentes etapas del ciclo de vida del desarrollo, como la compilación, la documentación, el testeo o el despliegue.

Para desarrollar mas el concepto de Integración continua....  

```
https://sentrio.io/blog/que-es-jenkins/
```


### Objetivo

Partiendo del proyecto aportado, creado con el framework [NEXT.JS](https://github.com/dawEstacio/nextjs-blog-practica), creamos un Repositorio GitHub y añadimos un archivo JENKINSFILE, que ejecuta una PIPELINE con las especificaciones indicadas.


### Contenido

 [TRIGGER](#item1)
 
 [LINTER](#item2)
 
 [TESTS CYPRESS](#item3)
  - Introduccion Cypress
  - Contenido.

 [ACTUALIZAR README](#item4)
 
 [SUBIR CAMBIOS AL REPOSITORIO "PUSH"](#item5)
 
 [DEPLOY CON VERCEL](#item6)
  - Introducion Vercel.
  - Contenido.
 [NOTIFICACIONES](#item7)
  - Introduccion NodeMailer
  - Contenido.
<hr>

<a name="item1"></a>
## TRIGGER

> El trigger verificará cada 3 horas si se han producido cambios en el repositorio y de ser así ejecutara la PIPELINE.

Funcionamiento CRON:

![Captura de pantalla de 2022-02-09 20-48-30](https://user-images.githubusercontent.com/62303274/153279151-7d19f010-3559-4088-b731-fdeda2c9b32c.png)

Definimos el cron con el uso de POLLSCM (valor CRON)

![Captura de pantalla de 2022-02-09 20-51-20](https://user-images.githubusercontent.com/62303274/153279322-96cb140d-9062-4b75-b503-a60696e5a556.png)


<a name="item2"></a>
## LINTER

<a name="item3"></a>
## TESTS CYPRESS

<a name="item4"></a>
## UPDATE README

<a name="item5"></a>
## UPDATE CHANGES "PUSH TO REMOTE"

<a name="item6"></a>
## DEPLOY VERCEL

<a name="item7"></a>
## NOTIFICACIONES

<!---Start place for the badge -->

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<!---End place for the badge -->


PRUEBA DE QUE NO BORRA TEXTO DE FUERA!!!
