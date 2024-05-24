import {Router} from 'express'
import pool from '../database.js'

const router = Router();

/*configuracion de add  agregar una persona*/
router.get('/add', (req,res)=>{
    res.render('personas/add')
})


router.post('/add', async (req,res) =>{

    try {
        const{name,last_name,age}= req.body
        const newpersona = {name,last_name,age}

        await pool.query('insert into persona set ?', [newpersona]);
        res.redirect('/list');


    }catch(error) {
        res.status(500).json({message: error.message});
    }

    });

/*----resultado consulta----*/
router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM persona');
        res.render('personas/list', {personas: result})
    } catch (error) {
        res.status(500).json({message: error.message});
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
router.get('/edit/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const [persona] = await pool.query('SELECT * FROM persona WHERE id = ?', [id]);
        const personaEdit = persona[0]
        res.render('personas/edit', { persona: personaEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

/* ---------------- configuracion para la base de datos edit ---------------- */
router.post('/edit/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const{name,last_name,age} =req.body
        const editpersona ={
                                name,
                                last_name,
                                age
                            }

        await pool.query('update persona set ?  WHERE id = ?', [editpersona,id]);
        res.redirect('/list');

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
