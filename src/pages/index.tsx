import SchemaTable from "@/components/SchemaTable";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { Alert, Container, FileInput, Flex, Group } from "@mantine/core";
import SchemaTableSheetSelector from "@/components/SchemaTable/SchemaTableSheetSelector";

export default function Home() {
  // onchange states
  const [typeError, setTypeError] = useState<any>(null);

  const [sheets, setSheets] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [excelData, setExcelData] = useState<any>(null);

  const [shipments, setShipments] = useState<any[]>([]);
  const [emissionAssets, setEmissionAssets] = useState<any[]>([]);

  const [filename, setFilename] = useState<string>("input.xlsx");

  const handleFile = async (e: any) => {
    let fileTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = async (e) => {
          // Move the file processing logic to a separate function to handle it asynchronously
          await processExcelFile(e?.target?.result);
        };

        setFilename(selectedFile.name);
      } else {
        setTypeError("Please select only excel file types");
      }
    } else {
      console.log("Please select your file");
    }
  };

  // Function to process the Excel file asynchronously
  const processExcelFile = async (excelData: string | ArrayBuffer | null | undefined) => {
    const workbook = XLSX.read(excelData, { type: "buffer" });

    setSheets(workbook.SheetNames);
    setActiveSheet(workbook.SheetNames[0]);

    // Make sure we set that any non-value becomes an empty string, so we can process columns without values too
    const shipments = XLSX.utils.sheet_to_json(workbook.Sheets["Shipments"], { defval: "" });
    const emissionAssets = XLSX.utils.sheet_to_json(workbook.Sheets["Emission assets"], { defval: "" });

    setExcelData({ shipments, emissionAssets });

    setShipments(shipments);
    setEmissionAssets(emissionAssets);
  };

  return (
    <>
      <Group p={15}>
        <input type={"file"} placeholder={"Upload excel file"} required onChange={async (e) => await handleFile(e)} />
      </Group>
      <Flex direction={"column"} p={15} gap={10}>
        {typeError && <Alert color="red">{typeError}</Alert>}

        {excelData && (
          <SchemaTable
            data={excelData}
            shipments={shipments}
            emissionAssets={emissionAssets}
            setShipments={setShipments}
            setEmissionAssets={setEmissionAssets}
            sheets={sheets}
            activeSheet={activeSheet}
            fileName={filename}
            selector={<SchemaTableSheetSelector activeSheet={activeSheet} setActiveSheet={setActiveSheet} allSheets={sheets} />}
          />
        )}
      </Flex>
    </>
  );
}
