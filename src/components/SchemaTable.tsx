import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { MRT_TableOptions, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { generateColumnNamesFromFile } from "./SchemaTable/utility/generateColumns";
import { Button } from "@mantine/core";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { exportToExcel } from "./SchemaTable/utility/exportToExcel";

type Props = {
  data: any;
  shipments: any[];
  emissionAssets: any[];

  setShipments: any;
  setEmissionAssets: any;

  sheets: string[];
  activeSheet: string;
  fileName: string;
  selector: ReactNode;
};

const SchemaTable = (props: Props) => {
  const [combinedData, setCombinedData] = useState<any[]>([{ shipments: props.shipments, emissionAssets: props.emissionAssets }] || []);
  const [editedRows, setEditedRows] = useState<Record<string, any>>({});
  // Memoize the columns we generate from our input file
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    if (props.activeSheet === "Shipments") {
      return generateColumnNamesFromFile(props.shipments, setEditedRows, editedRows);
    }

    if (props.activeSheet === "Emission assets") {
      return generateColumnNamesFromFile(props.emissionAssets, setEditedRows, editedRows);
    }

    return [];
  }, [props.activeSheet]);

  const handleCreateRow: MRT_TableOptions<any>["onCreatingRowSave"] = async ({ values, exitCreatingMode }) => {
    if (props.activeSheet === "Shipments") {
      props.setShipments((prev: any) => [...prev, values]);
    }
    if (props.activeSheet === "Emission assets") {
      props.setEmissionAssets((prev: any) => [...prev, values]);
    }

    setCombinedData([
      {
        shipments: props.shipments,
        emissionAssets: props.emissionAssets,
      },
    ]);

    exitCreatingMode();
  };

  const convertAndDownloadExcel = () => {
    console.log(combinedData);
    // exportToExcel(props.fileName, combinedData);
  };

  // TODO: figure out how we can maintain data and not re-set it each time we swap
  //   useEffect(() => {
  //     if (props.activeSheet === "Shipments") {
  //       setTableData(props.shipments);
  //     }

  //     if (props.activeSheet === "Emission assets") {
  //       setTableData(props.emissionAssets);
  //     }
  //   }, [props.activeSheet]);

  const table = useMantineReactTable({
    columns,
    data: props.activeSheet === "Shipments" ? props.shipments : props.emissionAssets,
    editDisplayMode: "cell",
    createDisplayMode: "row",
    onCreatingRowSave: handleCreateRow,
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <>
          <Button
            variant="outline"
            rightSection={<IconPlus />}
            onClick={() => {
              table.setCreatingRow(true);
            }}>
            Add new row
          </Button>

          <Button rightSection={<IconDownload />} onClick={convertAndDownloadExcel} variant="outline">
            Download as excel
          </Button>
        </>
      );
    },
    // todo: figure out how we can apply the save to the sheet.
    renderBottomToolbarCustomActions: () => {
      return (
        <>
          {/* <Button variant="outline" disabled={editedRows.length === 0} onClick={handleSaveEditedRows}>
            Save
          </Button> */}
          {props.selector}
        </>
      );
    },
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default SchemaTable;
