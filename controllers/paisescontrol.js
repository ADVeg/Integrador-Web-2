import fetch from 'node-fetch';

async function paisesall() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags', {
            method: 'GET',
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo obtener la lista de países.');
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    return data;
}

function pais10(arr) {
    // Copia el array para no modificar el original
    const copia = [...arr];

    // Función para mezclar aleatoriamente el array
    function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    mezclarArray(copia);

    // Toma los primeros 10 elementos del array mezclado
    return copia.slice(0, 10);
}

function capitalesdif(paises10, paises) {
    const capitalesdif = [];

    for (let i = 1; i < paises10.length; i += 2) { // Paises en posiciones impares
        const paisActual = paises10[i];
        const capitalesDiferentes = [paisActual.capital];

        // Agregar 3 capitales diferentes de otros países
        while (capitalesDiferentes.length < 4) {
            const capitalAleatoria = obtenerCapitalAleatoria(paises, capitalesDiferentes);
            capitalesDiferentes.push(capitalAleatoria);
        }

        capitalesdif.push(capitalesDiferentes);
    }

    // Función para obtener una capital aleatoria diferente
    function obtenerCapitalAleatoria(paises, exclusiones) {
        let capitalAleatoria;
        do {
            const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
            capitalAleatoria = paisAleatorio.capital;
        } while (exclusiones.includes(capitalAleatoria));
        return capitalAleatoria;
    }
    return capitalesdif;
}

function paisesdif(paises10, paises) {
    const paisesdif = [];

    for (let i = 0; i < paises10.length; i += 2) { // Paises en posiciones pares
        const paisActual = paises10[i];
        const nombresDiferentes = [paisActual.name];

        // Agregar 3 nombres diferentes de otros países
        while (nombresDiferentes.length < 4) {
            const nombreAleatorio = obtenerNombreAleatorio(paises, nombresDiferentes);
            nombresDiferentes.push(nombreAleatorio);
        }

        paisesdif.push(nombresDiferentes);
    }

    // Función para obtener un nombre aleatorio diferente
    function obtenerNombreAleatorio(paises, exclusiones) {
        let nombreAleatorio;
        do {
            const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
            nombreAleatorio = paisAleatorio.name;
        } while (exclusiones.includes(nombreAleatorio));
        return nombreAleatorio;
    }
    return paisesdif;
}

function filtpaises(dat) {
    return dat.map(({ name, flags }) => ({ name, flags }));
}

function mezclarmatriz(matriz) {
    const copiaMatriz = [...matriz];
  copiaMatriz.forEach(sublista => {
    sublista.sort(() => Math.random() - 0.5);
  });
  return copiaMatriz;
}

export const paisesController = {
    paisesall,
    pais10,
    capitalesdif,
    filtpaises,
    paisesdif,
    mezclarmatriz
};