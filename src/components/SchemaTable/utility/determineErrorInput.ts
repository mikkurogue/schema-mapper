import { determineValueFormat } from "./determineValueFormat";
import { ExpectedFormat } from "./types";

export function determineErrorInput(columnValue: string, expectedColumnValueFormat: ExpectedFormat) {
  const currentFormat = determineValueFormat(columnValue);

  if (currentFormat === expectedColumnValueFormat) {
    return true;
  }

  // Determine the actual error here if the format isn't correct
  return false;
}
