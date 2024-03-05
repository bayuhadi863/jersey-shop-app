/* eslint-disable react/prop-types */
// react import
import React from "react";
//component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/Dashboard/PageTitle";
import CreateSizeForm from "./Partials/CreateSizeForm";

const ProductDetailPage = ({ product, auth }) => {
  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <PageTitle>Detail Produk</PageTitle>
      <p>{product.name}</p>

      <div className="mt-6">
        <CreateSizeForm product_id={product.id} sizes={product.product_size} />
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
