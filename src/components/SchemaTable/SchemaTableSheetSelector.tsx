import { Button } from "@mantine/core";
import React from "react";

type Props = {
  activeSheet: string;
  setActiveSheet: any;
  allSheets: string[];
};

const SchemaTableSheetSelector = (props: Props) => {
  const { allSheets, activeSheet, setActiveSheet } = props;
  return (
    <div>
      {allSheets.map((sheet) => (
        <Button
          key={sheet}
          variant={sheet === activeSheet ? "outline" : "subtle"}
          onClick={() => {
            setActiveSheet(sheet);
          }}>
          {sheet}
        </Button>
      ))}
    </div>
  );
};

export default SchemaTableSheetSelector;
