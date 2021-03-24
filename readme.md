# Gestion de usuarios

## Prueba Tecnica
Login/signup de usuarios con bcrypt y jwt, esos usuarios pueden modificar sus datos (nombre apellido dni), y además pueden cargar N hijos, esos hijos se pueden loguear y solo ver sus propios datos  y los padres pueden modificar los datos de sus propios hijos (nombre apellido y dni)
 y un endpoint que traiga un listado con todos los hijos, con un limite de 10 para que vea el tema del skip and limit

 ## Resolucion
 ### Inicio del proyecto
 Se inicio el proyecto generando un pequeño servidor, 
 progresivamente se fueron añadiendo endpoinst para la creacion, actualizacion de usuarios,
 listado de usuarios, etc.

#### Server.js
 - server 
#### User.js
 - createUser
 - updateUser

### Conexión a la base de datos
Se crea la configuracion de variables de ambiente y conexion a la base de datos
### mongoose-connection.js  

### Signup y signin
Una vez establecido el funcionamiento minimos necesario se implementaron los enpoints de signup y signin utilizando la libreria bcrypt.

#### auth-controller.js
- signin
- signup
#### user-controller.js
- createUser
- updateUser

### Routing
Se establecieron los routers para los enpoints de usuarios, signup y signin

#### auth-router
- auth-routes
#### user-router
- user-routes

### Json Web Tokens
Se utilizo la libreria jsonwebtoken para la creacion de tokens de acceso para permitir la verificacion de identidad y privilegios de un usuario.

#### auth-controller
- signin
- signup
#### auth-jwt
- verifyToken

### Control de acceso
Se añadio la creacion de un usuario administrador y roles por omisíon, se implemento el control de acceso a los endpoints segun el rol del usuario.

#### auth-jwt
- verifyToken
- isParent
- isAdmin