import { Router } from "express";
import passportHelper from "../helpers/passportHelper.js";
import passport from "../helpers/passportHelper.js";

const router = Router();

router.get('/', (req, res) => {
    res.sendFile('Bienvenidos.html', { root: './public' })
})
router.get('/logout', (req, res) => {
    req.logout({}, err => console.log(err));
    res.redirect('/Bienvenidos');
})



router.get('/discord', passportHelper.authenticate('discord'/* , { scope: ['email'] } */))
router.get('/discord/callback', passportHelper.authenticate('discord', { failureRedirect: '/Bienvenidos', successRedirect: '/dashboard'}))



/* router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/secretstuff'); if (err) {
        res.send("mala ahi")
    }else{res.send("excelente")}// Successful auth
}); */

/* router.get("/discord", passportHelper.authenticate("discord", { permissions: 66321471 })); */

export default router;