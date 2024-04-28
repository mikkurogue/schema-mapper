import * as XLSX from "xlsx";

export function exportToExcel(filename: string, data: any) {
  console.log(data);

  var workbook = XLSX.utils.book_new();

  for (var sheet in data) {
    var sheetData = XLSX.utils.json_to_sheet(data[sheet]);
    XLSX.utils.book_append_sheet(workbook, sheetData, sheet);
  }

  XLSX.writeFile(workbook, filename);
}
