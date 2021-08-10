const Tarea = require("./tarea");
const colors = require("colors");

class Tareas {
  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  dataFromArr(tareas = []) {
    tareas.map((data) => (this._listado[data.id] = data));
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = { ...tarea };
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const index = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado =
        completadoEn != null ? "completado".green : "pendiente".red;
      console.log(`${index} ${desc} :: ${estado}`);
    });
  }

  listaPendienteCompletada(completada = true) {
    let index = 1;
    console.log();
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "completado".green : "pendiente".red;
      if (completada) {
        if (completadoEn) {
          console.log(
            `${index.toString().green}. ${desc} :: ${completadoEn.green}`
          );
          ++index;
        }
      } else {
        if (completadoEn == null) {
          console.log(`${index.toString().green}. ${desc} :: ${estado}`);
          ++index;
        }
      }
    });
  }

  completarTareas(ids = []) {
    ids.forEach((id) => {
      if (!this._listado[id].completadoEn) {
        this._listado[id].completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
