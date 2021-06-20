const router = require('express').Router();
const isAuth = require('../middlewares/isAuthorized');
const courseService = require('../services/courseService');
const moment = require('moment');

router.get('/', (req, res, next) => {
    if (req.user) {
        courseService.getAll(req.query.search)
            .then(courses => {
                courses = courses.map(x => ({...x, createdAt: moment(x.createdAt).format('MMM Do YY, h:mm:ss a')}))
                res.render('home', { courses });
            })
        .catch(next);
    } else {

        courseService.getTopThree(3)
            .then(courses => {
                res.render('home', { courses })
            })
            .catch(next)            
    }
   
})

router.get('/secret-action', isAuth, (req, res) => {
    res.send('secret content')
})

module.exports = router;