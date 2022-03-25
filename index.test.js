const {
  formatSpreadsheet,
  getDataFromFile,
  removeNumbersFromBeginningOfLine,
} = require(".");
const path = require("path");

describe("format spreadsheet functionality", () => {
  it("should contain the same number of rows after formatting", () => {
    const filePathToFormat = path.resolve("data", "dash.xlsx");
    const dataBefore = getDataFromFile(filePathToFormat);
    formatSpreadsheet();
    const filePathFormatted = path.resolve("data", "formatado.xlsx");
    const dataAfter = getDataFromFile(filePathFormatted);
    expect(dataBefore.length).toEqual(dataAfter.length);
  });

  it("should not have numbers in the beginnig of row", () => {
    const values = [
      ["1/2TESTE"],
      ["12/05TESTANDO"],
      ["2TESTISSIMO"],
      ["08TESTEIRO"],
      [" 1/2TESTONHO"],
      [" 12/05TESTAAQUI"],
      [" 2TESTADINHO"],
      [" 08TESTICE"],
      ["1T04KAF1"],
      [""],
    ];
    const formattedValues = removeNumbersFromBeginningOfLine(values);
    expect(formattedValues[0][0]).toEqual("TESTE");
    expect(formattedValues[1][0]).toEqual("TESTANDO");
    expect(formattedValues[2][0]).toEqual("TESTISSIMO");
    expect(formattedValues[3][0]).toEqual("TESTEIRO");
    expect(formattedValues[4][0]).toEqual("TESTONHO");
    expect(formattedValues[5][0]).toEqual("TESTAAQUI");
    expect(formattedValues[6][0]).toEqual("TESTADINHO");
    expect(formattedValues[7][0]).toEqual("TESTICE");
    expect(formattedValues[8][0]).toEqual("T04KAF1");
    expect(formattedValues[9][0]).toEqual("");
  });
});
