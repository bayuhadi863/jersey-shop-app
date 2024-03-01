/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
// inertia import
import { Head, Link } from "@inertiajs/react";

const OrderListPage = ({ auth, orders }) => {
  return (
    <HomeLayout authenticatedUser={auth.user}>
      <Head title="Pesanan Saya" />

      <PageTitle>Pesanan saya</PageTitle>
      <Container>
        <div className="py-4">
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {orders.map((order) => (
                <Link href={route("order.show", order.id)} key={order.id}>
                  {order.id}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 italic">Belum ada pesanan.</p>
          )}
        </div>
      </Container>
    </HomeLayout>
  );
};

export default OrderListPage;
