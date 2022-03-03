const express = require('express');
const router = express.Router();

// Models
const Level = require('../models/Level');
const Lesson = require('../models/Lesson');
const Event = require('../models/Event');
const Enrollment = require('../models/Enrollment');

const Days = { mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab', su: 'Dom' };

// Helpers
const { isAuthenticated } = require('../helpers/auth');

/*
===========================================================================
Vistas administrativas del Rio de Dios. (Discipulos, Facilitadores, reportes)
=========================================================================== */
router.get('/adi', isAuthenticated, async(req, res) => {

    res.render('adi/principal')
})

router.get('/adi/teachers', isAuthenticated, (req, res) => {
    res.render('adi/pupils');
});

router.get('/adi/reports', isAuthenticated, (req, res) => {
    res.render('adi/pupils');
});
//_________________________________________________________________________//

/*
===========================================================================
Vistas administrativas del Rio de Dios. Alumnos
=========================================================================== */


router.get('/adi/pupils/studiying', isAuthenticated, (req, res) => {
    res.render('adi/pupils');
});

router.get('/adi/pupils/graduated', isAuthenticated, (req, res) => {
    res.render('adi/pupils');
});

//_________________________________________________________________________//

/*
===========================================================================
Niveles del Rio de Dios
=========================================================================== */
//Crear Nivel - Vista
router.get('/adi/level-add', isAuthenticated, (req, res) => {
    res.render('adi/level-add');
});
//Crear Nivel - Guardado en DB
router.post('/adi/level-add', isAuthenticated, async(req, res) => {
    if (req.files != null) {
        for (let i = 0; i < req.files.length; i++) {
            req.body.img = '/uploads/' + req.files[i].filename;
        }
    }

    console.log(req.files)
    const newlevel = new Level(req.body);
    req.body.status == "on" ? newlevel.status = true : newlevel.status = false;
    newlevel.user = req.user.id;

    try {
        const result = await newlevel.save();
        req.flash('success_msg', 'Nivel creado satisfactoriamente');
        res.redirect('/');
    } catch (err) {
        console.log(err.message);

        res.render('adi/level-add', {
            newlevel
        });
        req.flash('error', err.message);
    }
});
//Visualizar Nivel
router.get('/adi/level/:id', isAuthenticated, async(req, res) => {
    let level = await Level.findById(req.params.id)

    res.render('adi/level-show', { level: level });
});
//Editar NIvel - Vista
router.get('/adi/level/edit/:id', isAuthenticated, async(req, res) => {
    const shift = await Shift.findById(req.params.id);
    res.render('adi/edit-adi', { shift });
});
//Editar NIvel - Guardado en db
router.put('/adi/level/edit/:id', isAuthenticated, async(req, res) => {
    if (req.days != null) {
        req.days
    } else { req.days = null }
    await Shift.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'shift Updated Successfully');
    res.redirect('/adi');
});
//_________________________________________________________________________//

/*
===========================================================================
Clases de Cada Nivel
=========================================================================== */
//Crear Lección - Vista
router.get('/adi/lesson-add', isAuthenticated, (req, res) => {
    res.render('adi/lesson-add');
});

//Crear Lección - Guardado en DB
router.post('/adi/lesson-add', isAuthenticated, async(req, res) => {
    if (req.file != null) {
        req.body.pdf = '/uploads/' + req.file.filename;
    }
    const newlesson = new Lesson(req.body);
    req.body.status == "on" ? newlesson.status = true : newlesson.status = false;
    newlesson.user = req.user.id;

    try {
        const result = await newlesson.save();
        req.flash('success_msg', 'Lección creado satisfactoriamente');
        res.redirect('/');
    } catch (err) {
        console.log(err.message);

        res.render('adi/lesson-add', {
            newlesson
        });
        req.flash('error', err.message);
    }
});

//Visualizar Lección
router.get('/adi/lesson/:id', isAuthenticated, (req, res) => {
    res.render('adi/pupils');
});

//Editar Lección - Vista
router.get('/adi/lesson/edit/:id', isAuthenticated, async(req, res) => {
    const shift = await Shift.findById(req.params.id);
    res.render('adi/edit-adi', { shift });
});

//Editar Lección - Guardado en db
router.put('/adi/lesson/edit/:id', isAuthenticated, async(req, res) => {
    if (req.days != null) {
        req.days
    } else { req.days = null }
    await Shift.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'shift Updated Successfully');
    res.redirect('/adi');
});
//_________________________________________________________________________//

/*
===========================================================================
Calendario
=========================================================================== */
router.get('/adi/calendar', isAuthenticated, async(req, res) => {

    res.render('adi/calendar')

})


//_________________________________________________________________________//

// Get All adi
router.get('/adi', isAuthenticated, async(req, res) => {
    const adi = await Shift.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('adi/adi', { adi });
});


// Delete adi
router.delete('/adi/delete/:id', isAuthenticated, async(req, res) => {
    await Shift.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'shift Deleted Successfully');
    res.redirect('/adi');
});

module.exports = router;