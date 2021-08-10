require("colors");

const { guardarDB, leerDB } = require("./db/readWriteFile");
const {
  showMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmar,
  completarTareas,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasEnDB = leerDB();

  if (tareasEnDB) {
    tareas.dataFromArr(tareasEnDB);
  }

  do {
    opt = await showMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción de la tarea:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listaPendienteCompletada(true);
        break;
      case "4":
        tareas.listaPendienteCompletada(false);
        break;
      case "5":
        const ids = await completarTareas(tareas.listadoArr);
        tareas.completarTareas(ids);
        break;
      case "6":
        const id = await listarTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const siNo = await confirmar("¿Desea borrar la tarea?");
          if (siNo) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }
    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
