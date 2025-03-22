import { DATE_FOMRAT } from "@constants";
import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  const formats = [
    "YYYYMMDD",       // 20231229
    "YYMMDD",         // 231229
    "YYYY-MM-DD",     // 2023-12-29
    "DD-MM-YYYY",     // 29-12-2023
    "DD/MM/YYYY",     // 29/12/2023
    "MM/DD/YYYY",     // 12/29/2023
    "YYYY/MM/DD",     // 2023/12/29
    "DD.MM.YYYY",     // 29.12.2023
    "DD.MM.YY",       // 29.12.23
    "YY.MM.DD",       // 23.12.29
    "YYYY MM DD",     // 2023 12 29
    "DD MM YYYY",     // 29 12 2023
    "MMM D, YYYY",    // Dec 29, 2023
    "MMMM D, YYYY",   // December 29, 2023
    "D MMM YYYY",     // 29 Dec 2023
    "D MMMM YYYY",    // 29 December 2023
    "YYYYMM",         // 202312 (defaults to first day of the month)
    "MM-YYYY",        // 12-2023
    "MM/YYYY",        // 12/2023
  ];

  const parsedDate = dayjs(dateString, formats, true);

  if (!parsedDate.isValid()) {
    return "Invalid Date";
  }

  return parsedDate.format(DATE_FOMRAT);
}
