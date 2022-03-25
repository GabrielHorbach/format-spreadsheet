const XLSX = require("xlsx");

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
  XLSX.writeFile(newWb, "./data/formatado.xlsx");
}

function formatSpreadsheet() {
  const data = getDataFromFile("./data/test.xlsx");
  const formattedData = removeNumbersFromBeginningOfLine(data);
  writeNewSpreadsheet(formattedData);
  console.log("Done! File: /data/formatado.xlsx created.");
}

formatSpreadsheet();

module.exports = {
  getDataFromFile,
  removeNumbersFromBeginningOfLine,
  writeNewSpreadsheet,
  formatSpreadsheet,
};
