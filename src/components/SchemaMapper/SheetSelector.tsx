import React from "react";

type SheetSelectorProps = {
  sheet: string;
  setSheet: any;
  all: string[];
};

const SheetSelector = ({ sheet, setSheet, all }: SheetSelectorProps) => {
  return (
    <div>
      {all.map((s) => (
        <button
          style={{
            border: s === sheet ? "1px solid violet" : "",
            borderRadius: 4,
          }}
          key={s}
          onClick={() => {
            setSheet(s);
          }}>
          {s}
        </button>
      ))}
    </div>
  );
};

export default SheetSelector;
