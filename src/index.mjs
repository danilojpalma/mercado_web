import express from 'express';
import exphbs from 'express-handlebars'
import __dirname from './utils.mjs';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 3000;

// Middlewares 
//app.use(express.json());
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
app.use('/font', express.static(path.join(nodeModulesPath, 'bootstrap-icons/font')));

// Configuración de archivos estáticos 
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/img', express.static(path.join(__dirname, '/public/img')));


// Aquí va el resto de tu configuración de la aplicación

console.log(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
    const product = [
        { name: 'Banana', img: 'banana.png', price: '3.500', desc: 'Dulce y nutritiva, alto en proteinas ideal para un snack saludable. '},
        { name: 'Cebollas', img: 'cebollas.png', price: '2.300', desc: 'Añade sabor y aroma a tus platos, perfecta para guisos y sofritos.'},
        { name: 'Lechuga', img: 'lechuga.png', price: '1.500', desc: 'Verde crujiente y deliciosa, la base perfecta para tus ensaladas y sándwiches.'},
        { name: 'Papas', img: 'papas.png', price: '5.600', desc: 'Versátil y reconfortante, un acompañamiento ideal para cualquier plato.'},
        { name: 'Pimenton', img: 'pimenton.png', price: '1.100', desc: 'Colorido y sabroso, una explosión de sabor en tus ensaladas y asados.'},
        { name: 'Tomate', img: 'tomate.png', price: '3.000', desc: 'Jugoso y sabroso, un ingrediente imprescindible en la cocina mediterránea.'}
    ]
    res.render('dashboard', { product });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);