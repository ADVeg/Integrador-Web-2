import path from "path";
import { fileURLToPath } from 'url';
import { dbcontroller } from "./controldb.js";
import { paisesController } from "./paisescontrol.js";
import e from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let paises = [];
let paises10 = [];
let capitalesdif = [];
let paisesdif = [];
let cont = 0;
let contC = 0;
let contP = 0;
let puntuacion = 0;
let user;
let contResp = 0;
let ps;
let contverif = 0;
async function cargar() {
    cont = 0;
    contC = 0;
    contP = 0;
    puntuacion = 0;
    contResp = 0;
    contverif = 0;
    await paisesController.paisesall()
        .then((data) => {
            paises = data; //obtener paises all
            paises10 = paisesController.pais10(paises); //obtener 10 paises aleatorios
            capitalesdif = paisesController.capitalesdif(paises10, paises); //obtener capitales diferentes
            capitalesdif = paisesController.mezclarmatriz(capitalesdif); //mezclar capitales
            paisesdif = paisesController.paisesdif(paises10, paises); //obtener paises diferentes
            paisesdif = paisesController.mezclarmatriz(paisesdif); //mezclar paises
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


async function home(req, res) {
    await cargar();
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

async function post(req, res) {
    user = req.body.nombre;
    ps = paises10[cont].name.common;
    console.log(ps);
    if (user.length > 5) {
        const respu = await dbcontroller.buscarnombre(user);
        if (respu === 0) {
            res.json({ respuesta: `${respu}`, img: paises10[cont].flags.png, opciones: paisesdif[contP], op: 0 }); ///resp paises primera vez
            contResp++;
            contP++;
        } else {
            res.json({ respuesta: 1 });
        }
    } else {
        res.json({ respuesta: 1 });
    }
}

async function postP(req, res) {
    if (contverif < 2) {
        const re = req.body.respuesta;
        if (ps === re) {
            puntuacion++;
        }
        cont++;
        contResp++;
        if (contResp > 10) {
            dbcontroller.agregarJugador(user, puntuacion);
            res.json({ respuesta: 3, nombre: user, puntuacion: puntuacion, op: 2 }); //si ha respondido 10 veces
        } else {
            ps = paises10[cont].name.common;
            if (cont % 2 === 0) {
                res.json({ img: paises10[cont].flags.png, opciones: paisesdif[contP], op: 0 }); ///resp paises
                contP++;
            } else {
                res.json({ img: paises10[cont].flags.png, opciones: capitalesdif[contC], psa: ps, op: 1 }); ///resp capitales
                contC++;
                ps = paises10[cont].capital[0];
            }
        }
        console.log(ps)
        contverif = 0;
    } else {
        res.redirect('/');
    }
    
}

async function verif(req, res) {
    if (contverif == 0) {
        if (typeof ps==='undefined') {
            res.json({ respuesta: 'No tiene' });
        } else {
            res.json({ respuesta: ps });
        }
        contverif++;
    } else {
        res.redirect('/');
    }
}

async function puestos(req, res) {
    const puest = await dbcontroller.obtenerJugadores();
    res.json({ puestos: puest });
}

export const indexcontroller = {
    home,
    post,
    postP,
    verif,
    puestos
}