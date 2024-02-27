import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { countryCodes } from "./countryCodes";

const errorCellStyle = {
  backgroundColor: "rgba(255, 99, 71, 0.5)",
  height: "35px",
  width: "100%",
  minHeight: "35px",
  minWidth: "100px",
  borderRadius: "6px",
};

/**
 * Generate all existing columns from input file
 */
export function generateColumnNamesFromFile(input: any, setter: any, editedRows: any, validation: { validations: any; setValidations: any }): MRT_ColumnDef<any>[] {
  if (!input) {
    return [];
  }

  const { validations, setValidations } = validation;

  return Object.keys(input[0]).map((item) => {
    // check if column is date
    // here we should check if the event.target.value is valid?
    // figure out cell styling?
    if (item.includes("date")) {
      return {
        accessorKey: item,
        header: item,
        Cell: ({ cell }) => {
          const value = cell.getValue() as string;

          const isValidDate = !isNaN(new Date(value).getDate());
          const isError = !isValidDate || !value || value === "";

          return <td style={isError ? errorCellStyle : {}}>{value}</td>;
        },
        mantineEditTextInputProps: ({ cell, row }) => {
          return {
            error: validations.date,
            type: "text",
            required: true,
            onChange: (event: { currentTarget: { value: any } }) => {
              const value = event.currentTarget.value;

              if (!value) {
                setValidations((prev: any) => ({ ...prev, date: "Date is required" }));
              } else if (isNaN(new Date(value).getDate())) {
                setValidations((prev: any) => ({ ...prev, date: "Invalid date format" }));
              } else {
                delete validations.date;
                setValidations({ ...validations });
              }
            },
            onBlur: (event) => {
              const value = event.target.value;

              setter(() => {
                notify(cell);
                return { ...editedRows, [row.id]: { ...row.original, [cell.column.id]: value } };
              });
            },
          };
        },
      };
    }

    // check for country code as input (origin/destination)
    if (item.includes("country_code")) {
      return {
        accessorKey: item,
        header: item,
        editVariant: "select",
        mantineEditSelectProps: ({ cell, row }: any) => {
          return {
            data: countryCodes,
            onChange: (value: any) => {
              setter(() => {
                notify(cell);
                return { ...editedRows, [row.id]: { ...row.original, [cell.column.id]: value } };
              });
            },
          };
        },
      };
    }

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
