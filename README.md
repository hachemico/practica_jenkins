# PRACTICA JENKINS 
## ¿Que es Jenkins ?![Captura de pantalla de 2022-02-09 20-56-30](https://user-images.githubusercontent.com/62303274/153280094-0b762177-baca-4193-aeb7-e3bbcf93b585.png)


Jenkins es un servidor open source para la integración continua. Es una herramienta que se utiliza para compilar y probar proyectos de software de forma continua, lo que facilita a los desarrolladores integrar cambios en un proyecto y entregar nuevas versiones a los usuarios. Escrito en Java, es multiplataforma y accesible mediante interfaz web. Es el software más utilizado en la actualidad para este propósito.

Con Jenkins, las organizaciones aceleran el proceso de desarrollo y entrega de software a través de la automatización. Mediante sus centenares de plugins, se puede implementar en diferentes etapas del ciclo de vida del desarrollo, como la compilación, la documentación, el testeo o el despliegue.

Para desarrollar mas el concepto de Integración continua....  

```
https://sentrio.io/blog/que-es-jenkins/
```


### Objetivo

Partiendo del proyecto aportado, creado con el framework [NEXT.JS](https://github.com/dawEstacio/nextjs-blog-practica), creamos un Repositorio GitHub y añadimos un archivo JENKINSFILE, que ejecuta una PIPELINE con las especificaciones indicadas.


### Contenido

- [TRIGGER](#item1)
 
- [LINTER](#item2)
 
- [TESTS CYPRESS](#item3)
  - Introduccion Cypress
  - Contenido.

- [ACTUALIZAR README](#item4)
 
- [SUBIR CAMBIOS AL REPOSITORIO "PUSH"](#item5)
 
- [DEPLOY CON VERCEL](#item6)
  - Introducion Vercel.
  - Contenido.
- [NOTIFICACIONES](#item7)
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

>Los linters son herramientas de programación que examinan el código del programador y lo ayudan a corregir errores de sintaxis, código incorrecto, malas prácticas o incluso ayudarlo a seguir unas normas de estilo, favoreciendo escribir código de calidad y acostumbrando al usuario a solventar ciertos problemas comunes en fases tempranas (y no tan tempranas) como programador.


En nuestro proyecto utilizamos ESLint.

![Captura de pantalla de 2022-02-09 21-01-47](https://user-images.githubusercontent.com/62303274/153280884-99dc1fdf-ffe4-478b-914c-d360b0a78bc4.png)

Dentro de cada step utilizamos un script{} para definir las acciones que realizamos.

RES_LINT = sh( script: "npm run lint", returnStatus: true)

```
RES_LINT= nos devuelve el estado de la ejecucion del linter.
npm run lint => ejecuta el linter, cada vez que detecte errores de sintaxis establecido nos devuelve un valor 1. 
En el caso de superar el linter devuelve 1.
```

<a name="item3"></a>
## TESTS CYPRESS

![Captura de pantalla de 2022-02-09 21-07-55](https://user-images.githubusercontent.com/62303274/153281808-0364eb5f-a466-4357-ac37-6132f861924e.png)


> Es un framework centrado en la realización de pruebas e2e, pero tambien permite la realización de pruebas unitarias.
> Las pruebas End-to-End es una metodología de aseguramiento de calidad de software para probar el flujo de la aplicación desde el inicio hasta el final. El objetivo es simular al máximo el comportamiento de un usuario real y validar la integridad y fiabilidad del sistema.


![Captura de pantalla de 2022-02-09 21-13-52](https://user-images.githubusercontent.com/62303274/153282663-10cc5181-732c-4d62-913c-d326edae4b4f.png)

```
npm install cypress -g => Instala todas las actualizaciones necesarias en modo Global.
npm ci -y     => Instala cypress, aceptando todos los mensajes que aparecen.
npm run dev & => Realiza el build de cypress. 
                 "&" nos asegura que se ejecuta en segundo plano, de modo que se puedan ejecutar los stages posteriores.
NO_COLOR=1    => Nos permite escapar los simbolos en la ejecución.
./node_modules/.bin/cypress run  => arranca los test de cypress.
RES_TEST => Obtiene valor "1/0"  del status del test.
```

<a name="item4"></a>
## UPDATE README

>Ejecutará un script que se encargará de modificar el README.MD del proyecto añadiendo un Badge.

```
SUCCESS --> https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg
FAILURE --> https://img.shields.io/badge/test-failure-red
```

![Captura de pantalla de 2022-02-09 21-24-09](https://user-images.githubusercontent.com/62303274/153284402-36ac7c99-35fd-4454-a021-935c8c95eafc.png)

```
chmod 777 -R /ruta/script => Bastaría con dar permiso de ejecucion al script "+x".
node jenkinsScripts/Update_readme.js => Ejecuta el script. Para poder enviar parametros al script se añaden al final con &nombre_parametro.
RES_UPDATE => Obtiene valor "1/0"  del status del test.
```
#### SCRIPT

![Captura de pantalla de 2022-02-10 10-11-39](https://user-images.githubusercontent.com/62303274/153374959-2aafab81-1e76-47c3-b2f2-2c2c3d8c5046.png)

```
Se declaran los parametros de entrada con process.argv[2]
fs.readfile => Se encarga de leer un archivo.
data.replace => Busca dentro del documento, la parte que coincide con la expresión:
                /(?<=\[!\[Cypress.io\]\()[\s\S]*(?=\)\])/gm y lo sustituye por uno de los badges.
fs.Writefile => aplica los cambios al archivo.
```
> Conoce más... https://nodejs.dev/learn/reading-files-with-nodejs 


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
