import { sendRequest } from "@helpers";

export const invoiceServices = {
  extractData: (data: unknown) => sendRequest({
    url: `/invoice/data-extraction`,
    method: "POST",
    data,
    isAuthIncluded: true,
  }),
  getInvoices: () => sendRequest({
    url: "/invoice",
    method: "GET",
    isAuthIncluded: true
  }),
  updateInvoice: (invoiceId: string, data: unknown) => sendRequest({
    url: `/invoice/${invoiceId}`,
    method: "PUT",
    isAuthIncluded: true,
    data
  }),
  postInvoice: (data: unknown) => sendRequest({
    url: `/invoice`,
    method: "POST",
    isAuthIncluded: true,
    data
  }),
}