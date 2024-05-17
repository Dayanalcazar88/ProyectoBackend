/* -------------------------- importar dependencias ------------------------- */
import express from 'express'

/* ----------------------------- initialization (framewor)----------------------------- */
const app = express();

/* -------------------------setting (configurar servidor y de el manejador de plantillas,asignando puerto)-------------------------------- */
app.set('port',process.env.PORT || 3000)

/* ------------------------------- middlewares(utilizar el morgan y ver las peticiones q llegan) ------------------------------ */




/* --------------------------------- routes (crear rutas necesarias para el proyecto--------------------------------- */




/* ------------------------------ public files(configiuracion para leer carpeta publica) ------------------------------ */




/* ------------------------------- run server (encender el servidor)------------------------------- */
app.listen(app.get('port'), ()=>{
    console.log ('server listening on port', app.get('port'));

});