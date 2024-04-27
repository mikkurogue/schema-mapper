import React, { ReactNode, useMemo, useState } from "react";
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { generateCols } from "./TableUtil";
import { IconDownload, IconPlus } from "@tabler/icons-react";

type TableProps = {
  data: any;
  activeSheet: string;
  selector?: ReactNode;
};

const Table = ({ data, activeSheet, selector }: TableProps) => {
  const [editedRows, setEditedRows] = useState<Record<string, any>>({});
  const [validations, setValidations] = useState<any>({});

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return generateCols(data, setEditedRows, editedRows, activeSheet);
  }, [activeSheet]);

  const table = useMantineReactTable({
    columns,
    data: data[activeSheet],
    editDisplayMode: "cell",
    onCreatingRowSave: () => {},
    onEditingRowSave: () => {},
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <>
          <button
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Add new row
          </button>

          {/* todo: create the converter function */}
          <button onClick={() => {}}>
            <IconDownload /> Download as excel
          </button>
        </>
      );
    },
    renderBottomToolbarCustomActions: () => {
      return (
        <>
          {/* todo: create the save row button */}
          <button
            disabled={Object.keys(editedRows).length === 0}
            onClick={() => {}}
          >
            Save row
          </button>
          {selector}
        </>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;