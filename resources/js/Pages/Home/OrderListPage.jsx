/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
import OrderList from "./Partials/OrderList";
// inertia import
import { Head } from "@inertiajs/react";

const OrderListPage = ({ auth, data }) => {
  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Pesanan Saya" />

      <PageTitle>Pesanan saya</PageTitle>
      <Container>
        <div className="py-4">
          <OrderList data={data} />
        </div>
      </Container>
    </HomeLayout>
  );
};

export default OrderListPage;
