import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();
 /* ----------------------------- agregar imagen ----------------------------- */
const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

/*configuracion de add  agregar una persona*/
router.get('/add', (req, res) => {
    res.render('personas/add')
});

/* ------------------------ configuracion guardar img ----------------------- */

router.post('/add', upload.single('file') , async (req, res) => {
    try {
        const { name, last_name, age } = req.body
        let newPersona = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newPersona = {name, last_name, age, imagen}
        }else{
            newPersona = {name, last_name, age, }
        }
        await pool.query('INSERT INTO persona SET ?', [newPersona]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*----resultado consulta----*/
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM persona');
        res.render('personas/list', { personas: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/*elimina los datos n la base de datos desde boton eliminar en web*/

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM persona WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------- configuracion que traiga los datos aactualizados ------------- */

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [persona] = await pool.query('SELECT * FROM persona WHERE id = ?', [id]);
        const personaEdit = persona[0]
        res.render('personas/edit', { persona: personaEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ---------------- configuracion para la base de datos edit ---------------- */
router.post('/edit/:id', upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, last_name, age,  } = req.body
/* ------------------------- editar  al agregar img ------------------------- */
        let editPersona = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editPersona= {name, last_name, age, imagen}
            
        }else{
            editPersona= {name, last_name, age, }
        }
    
        await pool.query('UPDATE persona SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;