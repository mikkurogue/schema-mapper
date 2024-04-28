import React, { ReactNode, useMemo, useState } from "react";
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { generateCols } from "./TableUtil";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { exportToExcel } from "./exportToExcel";
import { merge } from "lodash";

type TableProps = {
  data: any;
  updateData: any;
  activeSheet: string;
  selector?: ReactNode;
};

const Table = ({ data, updateData, activeSheet, selector }: TableProps) => {
  const [editedRows, setEditedRows] = useState<Record<string, any>>({});

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return generateCols(data, setEditedRows, editedRows, activeSheet);
  }, [activeSheet]);

  const handleCreateRow: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    exitCreatingMode,
  }) => {
    const shallowSheetCopy = data[activeSheet];

    const shallowNewValues = merge({}, shallowSheetCopy, {
      [Object.keys(shallowSheetCopy).length]: values,
    });
    console.log("new sheet values", shallowNewValues);

    updateData((prev: any) => {
      return merge({}, prev, {
        [activeSheet]: shallowNewValues,
      });
    });
  };

  const table = useMantineReactTable({
    columns,
    data: data[activeSheet],
    editDisplayMode: "cell",
    onCreatingRowSave: handleCreateRow,
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
          <button
            onClick={() => {
              exportToExcel("Sheet.xlsx", data);
            }}
          >
            <IconDownload /> Download as excel
          </button>
        </>
      );
    },
    renderBottomToolbarCustomActions: () => {
      return (
        <>
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
