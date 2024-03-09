import express from 'express';
import morgan from 'morgan';
import handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import __dirname from './dirname.util.js';

import './dao/db/db.js';
import routesProducts from './routes/products.routes.js';
import routesCarts from './routes/carts.routes.js';
import routesViews from './routes/views.routes.js';
import routesContact from './routes/contact.routes.js';
import routesAuth from './routes/auth.routes.js';
import routesLogin from './routes/login.routes.js';

import { sockets } from './sockets/sockets.js';


const PORT = 8080;

const app = express();
const server = createServer(app);
const socketServer = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

app.use(cookieParser());
app.use(session({
    store: mongoStore.create({
        mongoUrl: "mongodb+srv://ecommerce:7zrPwBUSYfhVYqPj@practicaintegradoraclus.ghxzurn.mongodb.net/ecommerce",
        ttl: 300
    }),
    secret: "cursoNodeCoder",
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use("/api", routesProducts);
app.use("/api", routesCarts);
app.use("/api", routesViews);
app.use("/api", routesContact);
app.use("/api", routesAuth);
app.use("/api", routesLogin);

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

sockets(socketServer);