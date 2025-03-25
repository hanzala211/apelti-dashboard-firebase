import { DATE_FOMRAT } from "@constants";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const convertDateToISO = (dateStr: string) => {
  return dayjs.utc(dateStr, DATE_FOMRAT).toISOString();
}
