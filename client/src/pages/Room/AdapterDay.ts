import dayjs, { Dayjs } from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(buddhistEra);

interface NewAdapterOptions {
  locale: string;
  formats?: Record<string, string>;
}

export default class NewAdapter extends AdapterDayjs {
  constructor({ locale, formats }: NewAdapterOptions) {
    super({ locale, formats });
  }

  formatByString = (value: Dayjs, formatString: string): string => {
    const newFormat: string = formatString.replace(/\bYYYY\b/g, "BBBB");
    return this.dayjs(value).format(newFormat);
  };
}
