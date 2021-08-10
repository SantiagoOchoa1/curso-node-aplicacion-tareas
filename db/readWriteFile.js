const fs = require("fs");

const ruta = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(ruta, JSON.stringify(data));
};

const leerDB = () => {
  if (!fs.existsSync(ruta)) {
    return null;
  }
  const data = fs.readFileSync(ruta, { encoding: "utf-8" });
  return JSON.parse(data);
};

module.exports = {
  guardarDB,
  leerDB,
};
