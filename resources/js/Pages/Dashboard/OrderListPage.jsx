/* eslint-disable react/prop-types */
import React from "react";

// Component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/Dashboard/PageTitle";
import OrderDatatable from "./Partials/OrderDatatable";

// Inertia import
import { Head } from "@inertiajs/react";

const OrderListPage = ({ data, auth }) => {
  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <Head title="Daftar Pesanan" />

      <PageTitle>Daftar Pesanan</PageTitle>

      <div className="mt-6">
        <OrderDatatable data={data} />
      </div>
    </DashboardLayout>
  );
};

export default OrderListPage;
