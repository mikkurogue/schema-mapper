import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { useEffect, useMemo, useState } from "react";
import { MRT_TableOptions, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { generateColumnNamesFromFile } from "./SchemaTable/utility/generateColumns";
import { Button } from "@mantine/core";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { exportToExcel } from "./SchemaTable/utility/exportToExcel";

type Props = {
  data: any;
  sheets: string[];
  activeSheet: string;
  fileName: string;
};

const SchemaTable = (props: Props) => {
  // Memoize the columns we generate from our input file
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    if (props.activeSheet === "Shipments") {
      return generateColumnNamesFromFile(props.data.shipments);
    }

    if (props.activeSheet === "Emission assets") {
      return generateColumnNamesFromFile(props.data.emissionAssets);
    }

    return [];
  }, [props.activeSheet]);

  const [tableData, setTableData] = useState<any[]>(props.data.shipments || []);

  const handleCreateRow: MRT_TableOptions<any>["onCreatingRowSave"] = async ({ values, exitCreatingMode }) => {
    setTableData((prev: any) => {
      return [...prev, values];
    });

    exitCreatingMode();
  };

  const convertAndDownloadExcel = () => {
    exportToExcel(props.fileName, tableData);
  };

  // TODO: figure out how we can maintain data and not re-set it each time we swap
  useEffect(() => {
    if (props.activeSheet === "Shipments") {
      setTableData(props.data.shipments);
    }

    if (props.activeSheet === "Emission assets") {
      setTableData(props.data.emissionAssets);
    }
  }, [props.activeSheet]);

  const table = useMantineReactTable({
    columns,
    data: tableData,
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
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default SchemaTable;
