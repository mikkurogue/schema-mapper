import { useState } from "react";
import Input from "@/components/SchemaMapper/Input";
import Table from "@/components/SchemaMapper/Table";
import SheetSelector from "@/components/SchemaMapper/SheetSelector";

export default function Home() {
  const [activeSheet, setActiveSheet] = useState<string>("Sheet1");
  const [excelData, setExcelData] = useState<any>(null);

  console.log("edata", excelData);

  return (
    <>
      <Input
        processTracker={function (inp: boolean) {
          console.log("nyi");
        }}
        setFile={setExcelData}
      />

      {excelData && (
        <Table
          data={excelData}
          updateData={setExcelData}
          activeSheet={activeSheet}
          selector={
            <SheetSelector
              sheet={activeSheet}
              setSheet={setActiveSheet}
              all={Object.keys(excelData)}
            />
          }
        />
      )}
    </>
  );
}
