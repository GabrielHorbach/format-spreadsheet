const XLSX = require("xlsx");
const path = require("path");

function getDataFromFile(path) {
  const wb = XLSX.readFile(path, { type: "array" });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  return XLSX.utils.sheet_to_json(ws, { header: 1 });
}

function removeNumbersFromBeginningOfLine(data) {
  return data.map((row) => {
    const cell = row[0];
    if (!cell) return [""];
    return [cell.replace(/^[\s]?\d+\/?\d+|^[\s]?\d+/, "")];
  });
}

function writeNewSpreadsheet(data) {
  const newWs = XLSX.utils.aoa_to_sheet(data);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, newWs, "Planilha 1");
  const filePath = path.resolve(".", "data", "formatado.xlsx");
  XLSX.writeFile(newWb, filePath);
}

function formatSpreadsheet() {
  const filePath = path.resolve(".", "data", "dash.xlsx");
  const data = getDataFromFile(filePath);
  const formattedData = removeNumbersFromBeginningOfLine(data);
  writeNewSpreadsheet(formattedData);
  console.log(
    "Finalizado! Novo arquivo 'formatado.xlsx' criado dentro de 'data'."
  );
}

formatSpreadsheet();

module.exports = {
  getDataFromFile,
  removeNumbersFromBeginningOfLine,
  writeNewSpreadsheet,
  formatSpreadsheet,
};
