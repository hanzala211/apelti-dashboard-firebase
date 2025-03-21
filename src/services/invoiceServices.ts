import { sendRequest } from "@helpers";

export const invoiceServices = {
  extractData: (data: unknown) => sendRequest({
    url: `/invoice`,
    method: "POST",
    data,
    isAuthIncluded: true,
  })
}