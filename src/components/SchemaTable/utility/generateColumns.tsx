import { notifications, showNotification } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";

/**
 * Generate all existing columns from input file
 */
export function generateColumnNamesFromFile(input: any, setter: any, editedRows: any): MRT_ColumnDef<any>[] {
  if (!input) {
    return [];
  }

  return Object.keys(input[0]).map((item) => {
    return {
      accessorKey: item,
      header: item,
      mantineEditTextInputProps: ({ cell, row }) => ({
        type: "text",
        onBlur: (event) => {
          setter(() => {
            notifications.show({
              title: `Success`,
              message: `Edited cell ${cell.column.id} successfully`,
              color: "green",
              icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            });

            return { ...editedRows, [row.id]: { ...row.original, [cell.column.id]: event.target.value } };
          });
        },
      }),
    };
  });
}
