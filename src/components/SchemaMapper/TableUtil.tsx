import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";

const errorCellStyle = {
  backgroundColor: "rgba(255, 168, 168,1)",
  height: "35px",
  width: "100%",
  minHeight: "35px",
  minWidth: "100px",
  borderRadius: "6px",
  display: "block",
};

export function generateCols(
  input: any,
  setter: any,
  editedRows: any,
  currentSheet: string
): MRT_ColumnDef<any>[] {
  if (!input) {
    console.error(
      "No input found for uploaded spreadsheet. Try a different file."
    );
    return [];
  }

  const keys = Object.keys(input[currentSheet][0]);

  return keys.map((item) => {
    return {
      accessorKey: item,
      header: item,
      mantineEditTextInputProps: ({ cell, row }) => {
        return {
          type: "text",
          onBlur: (event) => {
            setter(() => {
              notify(cell);
              return {
                ...editedRows,
                [row.id]: {
                  ...row.original,
                  [cell.column.id]: event.target.value,
                },
              };
            });
          },
        };
      },
    };
  });
}

function notify(cell: { column: { id: string } }) {
  notifications.show({
    title: `Success`,
    message: `Edited cell ${cell.column.id} successfully`,
    color: "green",
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
  });
}

function reduceObject(data: any[]): any {
  return data.reduce((acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== "") {
        if (!acc[key]) {
          acc[key] = [];
        }
        if (!acc[key].includes(value)) {
          acc[key].push(value);
        }
      }
    });
    return acc;
  }, {});
}
