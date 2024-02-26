import { MRT_ColumnDef } from "mantine-react-table";

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
          setter({ ...editedRows, [row.id]: { ...row.original, [cell.column.id]: event.target.value } });
        },
      }),
    };
  });
}
