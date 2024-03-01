/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import CartList from "./Partials/CartList";
import SelectedCart from "./Partials/SelectedCart";
import PageTitle from "@/Components/Home/PageTitle";
// mantine import

const CartListPage = ({ data, auth }) => {
  const [selectedCartId, setSelectedCartId] = useState([]);
  // console.log(selectedCartId, "selected")

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <PageTitle>Keranjang Saya</PageTitle>
      <Container>
        <div className="grid grid-cols-3 gap-10 mt-4">
          <div className="col-span-2">
            <CartList data={data} setSelectedCartId={setSelectedCartId} />
          </div>
          <div>
            <SelectedCart selectedCartId={selectedCartId} data={data} />
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default CartListPage;
