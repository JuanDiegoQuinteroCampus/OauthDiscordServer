import express from 'express';
import session from 'express-session';
import passportHelper from './helpers/passportHelper.js';
import authRouter from './router/authRouter.js';
import checkAuthentication from './helpers/authentication.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();
let config = JSON.parse(process.env.MY_CONFIG);
app.use(express.json());
app.use(session({
    secret: 'ey', // Esta clave secreta debería estar en un archivo de configuración
    resave: false, // No vuelve a guardar si no hay cambios
    saveUninitialized: false // No guarda una sesión si no hay datos
}))
app.use(passportHelper.initialize()); // Inicializa passport
app.use(passportHelper.session()); // Permite que passport use "express-session" para almacenar la sesión del usuario

app.use(express.static('public'))



app.get('/', (req, res) => res.redirect('/Bienvenidos'), (err,data)=>{
    if (err) {
       res.send("error al cargar el archivo")
    }else{
        res.send(data);
    }
});
app.use('/Bienvenidos', authRouter);
app.get('/dashboard', checkAuthentication,  (req, res) => {res.sendFile('dashboard.html', { root: './public' })});


app.listen(config, ()=> {
    console.log(`http://${config.hostname}:${config.port}`);
})

/* import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: CLAVE_SECRETA_ENV, 
    resave: false, 
    saveUninitialized: false 
}))
 */