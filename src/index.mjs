import express from 'express';
import exphbs from 'express-handlebars'
import __dirname from './utils.mjs';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 3000;

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: '.hbs',
  });

// Estructura de directorios 
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname + '/views')); 

// Ajuste de la ruta para apuntar correctamente a node_modules en la raíz del proyecto
const nodeModulesPath = path.join(fileURLToPath(import.meta.url), '..', '..', 'node_modules');

// Configuración de archivos estáticos externos
app.use('/css', express.static(path.join(nodeModulesPath, 'bootstrap/dist/css')));
app.use('/js', express.static(path.join(nodeModulesPath, 'bootstrap/dist/js')));
app.use('/js', express.static(path.join(nodeModulesPath, 'jquery/dist')));

// Configuración de archivos estáticos 
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/img', express.static(path.join(__dirname, '/public/img')));


// Aquí va el resto de tu configuración de la aplicación

console.log(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
    res.render("home",
    {
        title: "Home",
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);