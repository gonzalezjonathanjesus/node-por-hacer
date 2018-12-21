const completado = {
    alias: 'c',
    default: true
};

const descripcion = {
    demand: true,
    alias: 'd'
};

const descripcionOpcional = {
    alias: 'd'
};

const all = {
    alias: 'a',
    default: false
};

const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('listar', 'Muestra la lista de tareas', {
        descripcion: descripcionOpcional,
        completado
    })
    .command('actualizar', 'Actualiza el estado de un elemento', {
        descripcion,
        completado
    })
    .command('eliminar', 'Elimina un elemento', {
        descripcion: descripcionOpcional,
        all
    })
    .help()
    .argv;

module.exports = {
    argv
}