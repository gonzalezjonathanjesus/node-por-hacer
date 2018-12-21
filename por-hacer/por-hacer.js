const fs = require('fs');

const fileName = 'data.json';
const filePath = `./db/${fileName}`;

let listadoPorHacer = [];

const cargarDB = () => {
    try {
        // El require automáticamente convierte JSON a objeto de JS
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //Convierte un objeto en JSON

    fs.writeFile(filePath, data, (e) => {
        if (e) throw new Error('No se pudo grabar', e);
    });
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

/*const eliminar = (descripcion = '', all) => {
    if (all) {
        listadoPorHacer = [];
        guardarDB();
    } else if (descripcion != '') {
        cargarDB();

        let index = listadoPorHacer.findIndex(tarea => {
            return tarea.descripcion === descripcion;
        });

        if (index >= 0) {
            listadoPorHacer.splice(index, 1);
            guardarDB();
            return true;
        } else {
            return `No se pudo encontrar la tarea especificada '${descripcion}'`;
        }
    } else {
        return 'Debe ingresar una opción válida'.red + ', para ayuda: node app --help';
    }
}*/

/* Forma del chabonsito */

const eliminar = (descripcion = '', all) => {
    if (all) {

        listadoPorHacer = [];
        guardarDB();

    } else if (descripcion != '') {
        cargarDB();

        let nuevoListado = listadoPorHacer.filter(tarea => {
            return tarea.descripcion !== descripcion;
        });

        if (listadoPorHacer.length === nuevoListado.length) {
            return `No se pudo encontrar la tarea especificada '${descripcion}'`;
        } else {
            listadoPorHacer = nuevoListado;
            guardarDB();
            return true;
        }
    } else {
        return 'Debe ingresar un parámetro válido para <node app eliminar>'.red + ', para ayuda: node app --help';
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}