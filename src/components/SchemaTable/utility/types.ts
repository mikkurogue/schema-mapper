export type ExpectedFormat = DateFormat | DecimalSeparatorFormat | ThousandSeparatorFormat;

export type DateFormat = {
  type: "date";
  format: "dd/mm/yyyy";
};
export type DecimalSeparatorFormat = { type: "decimal"; format: "," };
export type ThousandSeparatorFormat = { type: "thousand"; format: "." };
