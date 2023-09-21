import conn from "../todo/dbconfig.js";

const agregarJugador = async (nom, punt) => {
    try {
        const sql = "INSERT INTO jugadores (nombre, puntuacion) VALUES (?, ?);";
        const values = [nom, punt];
        let result = await conn.query(sql, values);
        return result.affectedRows;
    } catch (error) {
        return 0;
    }
}

const obtenerJugadores = async () => {
    try {
        const sql = "SELECT * FROM jugadores order by puntuacion desc, id desc limit 20;";
        let result = await conn.query(sql);
        return result;
    } catch (error) {
        return 0;
    }
    
}

const buscarnombre = async (nom) => {
    try {
        const sql = "SELECT * FROM jugadores where nombre=?";
        const values = [nom];
        let result = await conn.query(sql, values);
        const r =result.length;
        return r;
    } catch (error) {
        return 0;
    }

}

export const dbcontroller = {
    agregarJugador,
    obtenerJugadores,
    buscarnombre
}