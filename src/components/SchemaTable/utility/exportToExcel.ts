import * as XLSX from "xlsx";

export function exportToExcel(filename: string, data: any) {
  console.log(data);
  var shipments = XLSX.utils.json_to_sheet(data[0].shipments);

  var emissionAssets = XLSX.utils.json_to_sheet(data[0].emissionAssets); // todo: figure out the emissionAssets sheet from data
  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, shipments, "Shipments");
  XLSX.utils.book_append_sheet(workbook, emissionAssets, "Emission assets"); // todo: figure out the emissionAssets sheet from data
  XLSX.writeFile(workbook, filename);
}
