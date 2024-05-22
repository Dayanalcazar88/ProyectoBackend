import {Router} from 'express'
import pool from '../database.js'

const router = Router();


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

export default router;