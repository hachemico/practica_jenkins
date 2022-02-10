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
<hr>

<a name="item3"></a>
## TESTS CYPRESS

![Captura de pantalla de 2022-02-09 21-07-55](https://user-images.githubusercontent.com/62303274/153281808-0364eb5f-a466-4357-ac37-6132f861924e.png)


> Es un framework centrado en la realización de pruebas e2e, pero tambien permite la realización de pruebas unitarias.
> Las pruebas End-to-End es una metodología de aseguramiento de calidad de software para probar el flujo de la aplicación desde el inicio hasta el final. El objetivo es simular al máximo el comportamiento de un usuario real y validar la integridad y fiabilidad del sistema.

#### STAGE
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
<hr>

<a name="item4"></a>
## UPDATE README

>Ejecutará un script que se encargará de modificar el README.MD del proyecto añadiendo un Badge.

```
SUCCESS --> https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg
FAILURE --> https://img.shields.io/badge/test-failure-red
```
#### STAGE

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
Conoce más... 
> https://nodejs.dev/learn/reading-files-with-nodejs

> https://www.mejorcodigo.com/p/98900.html 


El resultado de esta Stage actualiza el README.md. introduciendo el badge. Pero para nosotros solo será visible cuando se realize el Stage que describimos a continuación.
<br>
<hr>

<a name="item5"></a>
## UPDATE CHANGES "PUSH TO REMOTE"

> Ejecutará un script encargado de ejecutar el "Add", "commit" y "Push" de los cambios del readme a nuestro repositorio de código.

#### STAGE

![Captura de pantalla de 2022-02-10 10-27-56](https://user-images.githubusercontent.com/62303274/153378754-baaeaf6f-d7a6-4e18-9db9-1faf7586ce7a.png)

```
Como en el stage anterior para ejecutar un script primero tiene que tener permisos de ejecución.
withCredentials => Hay proceso que necesitan de credenciales de usuario para ser ejecutados. Es una forma de declarar valores
                   que no sean visibles en el código. A continuación vemos como se declaran.
gitconfig => configuramos el usuario que va a realizar el add,commit, push.
git remote => seleccionamos el remoto sobre el que realizar las acciones.
git add . => importante el signo de puntiacion ".". Añadimos los archivos de la localización actual.
git commit => realiza un commit sobre lo antes indicado.
git push => sube los archivos al remoto indicados. Importante la anotación HEAD:nombre_rama_remota.
RES_PUSH => Obtiene valor "1/0"  del status del test.
```
#### SCRIPT

>Se ha eliminado el script porque estaba dando problemas, así que se ha aplicado todo el proceso,
>directamente sobre el Stage.

#### CREDENTIALS

<strong>Administrar_Jenkins / </strong>

![Captura de pantalla de 2022-02-10 10-43-23](https://user-images.githubusercontent.com/62303274/153380610-4ccfc111-bbe3-456a-96ad-a528ea721b5f.png)
 
 <strong>/ Manage_Credentials /
 
![Captura de pantalla de 2022-02-10 10-44-56](https://user-images.githubusercontent.com/62303274/153380793-a29b6ca8-aebe-4e59-b205-2f9677d552c7.png)

<strong>/Stores Scopet to Jenkins (global) /</strong>

![Captura de pantalla de 2022-02-10 10-45-50](https://user-images.githubusercontent.com/62303274/153381113-c1ba3a4e-79bf-4eaf-b9c5-32601a8939c0.png)

<strong>/Global Credentiarls/</strong>

![Captura de pantalla de 2022-02-10 10-47-15](https://user-images.githubusercontent.com/62303274/153381293-57ded2d5-3cbe-46bc-8211-5a7f3f3825aa.png)

<strong>/Add Credentials/</strong>

![Captura de pantalla de 2022-02-10 10-48-31](https://user-images.githubusercontent.com/62303274/153381501-1bb60d09-fd8e-4f10-833d-367938c169d4.png)

En este caso se trata de Usuario y Password pero existen otras opciones.

![Captura de pantalla de 2022-02-10 10-50-57](https://user-images.githubusercontent.com/62303274/153381960-b6d29851-9b74-474c-9399-d78aa97096e3.png)

<strong>Para tener un token de github lo tenemos que generar en github e importarlo.</strong>

  
 Como resultado de este Stage y el anterior tenemos que el badge Aparece en el Readme:
 
 ####BADGE UPDATE README.MD
 
 <!---Start place for the badge -->

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
 
<!---End place for the badge -->
 
<hr>
 
<a name="item6"></a>
## DEPLOY VERCEL

 ![Captura de pantalla de 2022-02-10 11-05-11](https://user-images.githubusercontent.com/62303274/153384542-9ecac552-ab72-4ddf-8f15-5f3183e3be01.png)
 
#### INTRO
 
``` 
Vercel es una plataforma para marcos frontend y sitios estáticos , creada para integrarse con su contenido, comercio o base de datos sin cabeza.

Brindamos una experiencia de desarrollador sin fricciones para encargarse de las cosas difíciles: implementar instantáneamente, escalar automáticamente y brindar contenido personalizado en todo el mundo.

Facilitamos a los equipos frontend el desarrollo, la vista previa y el envío de experiencias de usuario agradables, donde el rendimiento es el valor predeterminado.
``` 
 > https://vercel.com/docs/get-started
 
>Ejecutará un script encargado de publicar el proyecto en la plataforma de vercel. Se ejecutará solo si el resto de Stages anteriores han sido satisfactorias.
 
#### STAGE

 ![Captura de pantalla de 2022-02-10 11-07-04](https://user-images.githubusercontent.com/62303274/153384830-b6a0a00c-b1e2-45bd-9937-d35a4600a8cb.png)

 ```
 withCredentials => Al igual que en el Stage anterior, requerimos un token, que obtendremos una vez registrados en el sitio web de vercel.
 vercl . => ejecuta vercel.
 -- token => asigna el token que hemos generado en vercel. En este caso es un credencial declarada como hemos visto anteriormente.
 --confirm => acepta todos los proceso en la llamada.
 --name => asigna un nombre al deploy en la plataforma de vercel.
 ```
 
 Si todos los Stages anteriores son satisfactorios se desplega el proyecto en vercel. Cuando te registras en vercel, puedes realizar un deploy de prueba
 importando el proyecto directamente desde github y ejecutandolo manualmente. Puedes registrarte con tu correo o con github.
  
 ![Captura de pantalla de 2022-02-10 11-14-55](https://user-images.githubusercontent.com/62303274/153386042-84ba257b-d32a-468a-995c-34f0d71179bb.png)
 
![Captura de pantalla de 2022-02-10 11-15-36](https://user-images.githubusercontent.com/62303274/153386147-5f9f33bf-0a28-4053-9714-defd4ce853c3.png)
 
 > ENLACE AL DEPLOY : https://practica-jenkins-8eqr0hg9s-hachemico.vercel.app/
 
<hr>
 
<a name="item7"></a>
## NOTIFICACIONES
 ![Captura de pantalla de 2022-02-10 11-23-15](https://user-images.githubusercontent.com/62303274/153387467-0ec45519-fe54-488e-8ea0-b0dbff677e86.png)

#### INTRO
 
 Nodemailer es un módulo para aplicaciones Node.js que permite enviar correos electrónicos de forma sencilla. El proyecto comenzó en 2010 cuando no había una opción sensata para enviar mensajes de correo electrónico, hoy en día es la solución a la que recurren la mayoría de los usuarios de Node.js de forma predeterminada.
 
> URL: https://nodemailer.com/about/
 
> Se encargara de enviar un correo.
#### STAGE

![Captura de pantalla de 2022-02-10 11-31-40](https://user-images.githubusercontent.com/62303274/153389063-b0793faa-bc3f-4a03-9ee9-e3d45a80dbf8.png)

```
 npm install nodemailer => instala nodemailer.
 withCredentials => Para enviar correo en este caso a traves de Gmail, tenemos que obtener un token del propio Gmail.
                    Aqui se explica como: https://mailtrap.io/blog/nodemailer-gmail/
                    Connfigurar una credencial como hemos visto anteriormente.
node jenkinsScripts/Email.js => ejecuta el script de la ruta indicada.
&RES_LINT, &RES_TEST, &RES_UPDATE, $RES_DEPLOY, $GTOKEN, "params.correo_notificacion son parametros de entrada del script.
 
```
 #### SCRIPT
 
 ![Captura de pantalla de 2022-02-10 11-38-24](https://user-images.githubusercontent.com/62303274/153390102-6d24edbc-7c12-4f36-8aae-8494db9f8bdc.png)

 ```
 El scripts requiere de "nodemailer".
 Declaramos los parametros de entrada y los asignamos a variables.
 Asignamos los valores o variables en los campos correspondientes.
 En el apartado text o html, definimos el cuerpo del mensaje que queremos mostrar.
 ```
 Con la ejecucion del Stage y el correspondiente Script obtenemos un correo.
 

![Captura de pantalla de 2022-02-10 11-41-48](https://user-images.githubusercontent.com/62303274/153390720-c0fd8679-e043-4830-8d06-a25be4948045.png)
