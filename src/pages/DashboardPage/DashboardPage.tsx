import { ApexChart } from "./components/ApexChart";
import { InvoiceWidget } from "./components/InvoiceWidget";
import { PaymentItem } from "./components/PaymentItem";
import { CHART_DATA } from "@constants";
import { ChartState } from "@types";
import { useState } from "react";

export const DashboardPage: React.FC = () => {
  const [state] = useState<ChartState>(CHART_DATA);

  return <section className="md:p-9 md:pt-4 px-2 pt-20 md:max-h-[calc(100dvh-50px)] w-full flex gap-5 flex-col sm:max-w-[98%] max-w-full mx-auto overflow-y-auto h-[100dvh]">
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-16 gap-2">
      <InvoiceWidget label="Total Invoice" amount={182} />
      <InvoiceWidget label="Total Invoice" amount={182} />
      <InvoiceWidget label="Total Invoice" amount={182} />
      <InvoiceWidget label="Total Invoice" amount={182} />
    </div>

    <div className={`bg-basicWhite border-[1px] rounded-xl relative sm:px-4 -z-10`}>
      <h1 className="font-semibold z-0 w-fit text-[20px] absolute top-3 left-5">Invoices For Payment</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <div className="py-8 pt-12 sm:border-t-0 border-t sm:pt-16 px-5">
          <PaymentItem title="Late" mainAmount="KM 0" subAmount="KM 1200 (2)" status="Unpaid" />
        </div>
        <div className="py-8 px-5 sm:border-t-0 border-t sm:pt-16">
          <PaymentItem title="Late" mainAmount="KM 0" subAmount="KM 1200 (2)" status="Unpaid" />
        </div>
        <div className="py-8 px-5 sm:border-t-0 border-t sm:pt-16">
          <PaymentItem title="Late" mainAmount="KM 0" subAmount="KM 1200 (2)" status="Unpaid" />
        </div>
        <div className="lg:border-l sm:border-t-0 border-t h-full py-8 sm:pt-16 px-6">
          <PaymentItem title="Late" mainAmount="KM 0" subAmount="KM 1200 (2)" status="Unpaid" />
        </div>
      </div>
    </div>

    <div className={`bg-basicWhite rounded-lg border-[1px] p-4`}>
      <h1 className="font-semibold w-fit text-[20px]">Workflow</h1>
    </div>

    <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
      <div className="bg-basicWhite border-[1px] p-3 w-full rounded-lg">
        <h1 className="font-semibold w-fit text-[20px]">Best Suppliers</h1>
        <ApexChart state={state} />
      </div>
      <div className={`bg-basicWhtie border-[1px] p-3 w-full rounded-lg`}>
        <h1 className="font-semibold w-fit text-[20px]">Workflow</h1>
        <ApexChart state={state} />
      </div>
      <div className={`bg-basicWhtie border-[1px] p-3 w-full rounded-lg`}>
        <h1 className="font-semibold w-fit text-[20px]">Workflow</h1>
        <ApexChart state={state} />
      </div>
    </div>

  </section >
}

export default DashboardPage