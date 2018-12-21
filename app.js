//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        console.log('========= Por Hacer ========='.green);

        for (let tarea of listado) {
            console.log('Tarea:', tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('============================='.green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);

        if (actualizado) {
            console.log('Tarea actualizada');
        } else {
            console.log('No se pudo encontrar la tarea especificada');
        }

        break;

    case 'eliminar':
        let eliminado = porHacer.eliminar(argv.descripcion, argv.all);

        if (eliminado == true) {
            console.log('Tarea eliminada');
        } else {
            console.log(eliminado);
        }
        break;

    default:
        console.log('Comando no reconocido');
}