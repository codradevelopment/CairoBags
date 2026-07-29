import { Link } from "react-router-dom";
import { useLocale } from "../layout/LanguageSwitcher.jsx";
import { DataTable } from "./DataTable.jsx";
import { StatusBadge } from "./StatusBadge.jsx";
import { formatOrderDate } from "../../utils/orderHelpers.js";
import { formatPrice } from "../../utils/productHelpers.js";

export function RecentOrdersTable({ orders = [], loading }) {
  const { locale } = useLocale();

  const columns = [
    {
      key: "orderNumber",
      header: locale === "ar" ? "رقم الطلب" : "Order",
      render: (row) => (
        <Link
          to={`/admin/orders/${row.orderId ?? row.OrderId}`}
          className="font-medium text-brand-accent hover:text-brand-primary"
        >
          {row.orderNumber ?? row.OrderNumber}
        </Link>
      ),
    },
    {
      key: "customer",
      header: locale === "ar" ? "العميل" : "Customer",
      render: (row) => row.customerName ?? row.CustomerName,
    },
    {
      key: "status",
      header: locale === "ar" ? "الحالة" : "Status",
      render: (row) => (
        <StatusBadge
          status={row.orderStatus ?? row.OrderStatus}
          paymentStatus={row.paymentStatus ?? row.PaymentStatus}
        />
      ),
    },
    {
      key: "total",
      header: locale === "ar" ? "الإجمالي" : "Total",
      render: (row) => formatPrice(row.totalAmount ?? row.TotalAmount, locale),
    },
    {
      key: "date",
      header: locale === "ar" ? "التاريخ" : "Date",
      render: (row) => formatOrderDate(row.createdAt ?? row.CreatedAt, locale),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={orders}
      loading={loading}
      getRowKey={(row) => row.orderId ?? row.OrderId}
      emptyMessage={locale === "ar" ? "لا توجد طلبات حديثة" : "No recent orders"}
    />
  );
}
