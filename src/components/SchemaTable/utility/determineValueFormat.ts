import { ExpectedFormat } from "./types";

export function determineValueFormat(columnValue: string): ExpectedFormat {
  // Determine the format of the value

  // for now as example - we need to add logic here
  return {
    type: "date",
    format: "dd/mm/yyyy",
  };
}
