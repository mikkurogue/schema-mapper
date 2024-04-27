import React from "react";
import { ALLOWED_FILE_TYPES } from "./constants";
import * as XLSX from "xlsx";

type InputProps = {
  processTracker: (inp: boolean) => any;
  setFile: (inp: any) => any;
};

const Input = ({ processTracker, setFile }: InputProps) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    processTracker(true);
    if (!e.target.files) throw new TypeError("No file can be found in DOM Event");

    let spreadsheetFile = e.target.files[0];

    if (!ALLOWED_FILE_TYPES.includes(spreadsheetFile.type)) {
      throw new TypeError("Only spreadsheets are allowed, for instance xlsx or csv files.");
    }

    let reader = new FileReader();
    reader.readAsArrayBuffer(spreadsheetFile);
    reader.onload = async (e) => {
      await processSpreadsheet(e.target?.result);
    };
    processTracker(false);
  };

  const processSpreadsheet = async (spreadsheetData: string | ArrayBuffer | null | undefined) => {
    // if there is no data then we just return nothing
    if (spreadsheetData === null || spreadsheetData === undefined) return null;

    const workbook = XLSX.read(spreadsheetData, { type: "buffer" });

    const sheets: { [key: string]: unknown[] } = {};

    for (var sheet in workbook.Sheets) {
      sheets[`${sheet}`] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "" });
    }

    setFile(sheets);
  };

  return (
    <input
      type="file"
      placeholder="Upload spreadsheet"
      required
      onAbort={() => {}}
      onChange={async (e) => {
        await handleUpload(e);
      }}
    />
  );
};

export default Input;
