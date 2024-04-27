import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { countryCodes } from "../SchemaTable/utility/countryCodes";

const errorCellStyle = {
  backgroundColor: "rgba(255, 168, 168,1)",
  height: "35px",
  width: "100%",
  minHeight: "35px",
  minWidth: "100px",
  borderRadius: "6px",
  display: "block",
};

export function generateCols(input: any, setter: any, editedRows: any, validation?: { validations: any; setValidations: any }): MRT_ColumnDef<any>[] {
  if (!input) {
    return [];
  }

  const { validations, setValidations } = validation as { validations: any; setValidations: any };

  const vals = Object.values(input) as any[][];
  console.log("col vals");

  return Object.keys(vals[0][0]).map((item) => {
    return {
      accessorKey: item,
      header: item,
      mantineEditTextInputProps: ({ cell, row }) => {
        return {
          type: "text",
          onBlur: (event) => {
            setter(() => {
              notify(cell);
              return { ...editedRows, [row.id]: { ...row.original, [cell.column.id]: event.target.value } };
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
