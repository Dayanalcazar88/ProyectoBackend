/* -------------------------- importar dependencias ------------------------- */
import express from 'express'
import morgan from 'morgan'
import {join,dirname, extname} from 'path'
import {fileURLToPath} from 'url'
import {engine} from 'express-handlebars'
import personasRoutes from './routers/personas.routes.js'

/* ----------------------------- initialization (framewor)----------------------------- */
const app = express();
/* evita colisiones de nombre de variable */
const __dirname = dirname(fileURLToPath(import.meta.url)); 

/* -------------------------setting (configurar servidor y de el manejador de plantillas,asignando puerto)-------------------------------- */
app.set('port',process.env.PORT || 4000)
app.set('views', join(__dirname,'views'));
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts') ,
    partialsDir:  join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set ('view engine','.hbs');

/* ------------------------------- middlewares(utilizar el morgan y ver las peticiones q llegan) ------------------------------ */
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())




/* --------------------------------- routes (crear rutas necesarias para el proyecto--------------------------------- */
app.get('/', (req,res) => {
    res.render('index')

});

app.use(personasRoutes);



/* ------------------------------ public files(configiuracion para leer carpeta publica) ------------------------------ */

app.use(express.static(join(__dirname,'public')))


/* ------------------------------- run server (encender el servidor)------------------------------- */
app.listen(app.get('port'), ()=>{
    console.log ('server listening on port', app.get('port'));

});