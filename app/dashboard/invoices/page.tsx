import Table from "@/app/ui/invoices/table";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Invoices',
};

// Page组件可以接收一个searchParams的prop 当前URL的搜索参数
export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div>
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
