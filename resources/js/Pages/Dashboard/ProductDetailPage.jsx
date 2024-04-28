/* eslint-disable react/prop-types */
// react import
import React from "react";
//component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/Dashboard/PageTitle";
import CreateSizeForm from "./Partials/CreateSizeForm";
import Container from "@/Components/Home/Container";
import TableSize from "./Partials/TableSize";
// mantine import
import { Carousel } from "@mantine/carousel";
import { Image, Badge } from "@mantine/core";

const ProductDetailPage = ({ product, auth }) => {
  console.log(product);
  const productImages = product.product_image;
  const productCategory = product.category;

  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <PageTitle>Detail Produk</PageTitle>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Product Images */}
          {productImages.length === 1 ? (
            <Image
              src={`/storage/product_images/${productImages[0].image}`}
              w={400}
              fit="contain"
              alt="Gambar produk"
            />
          ) : (
            <Carousel loop>
              {productImages.map((item, i) => (
                <Carousel.Slide key={i}>
                  <div className="flex justify-center">
                    <Image
                      src={`/storage/product_images/${item.image}`}
                      w={400}
                      fit="contain"
                      alt="Gambar produk"
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          )}
          {/* End of Product Images */}

          <div>
            <h1 className="text-3xl font-medium">{product.name}</h1>
            <div className="mt-6">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Klub:</p>
                <Badge variant="outline" color="blue" radius="sm">
                  {productCategory.name}
                </Badge>
              </div>
              <div className="flex mt-4 gap-2 items-center">
                <p className="font-semibold">Price:</p>
                <p>{product.price}</p>
              </div>
              <p className="mb-2 mt-4 font-semibold">Deskripsi:</p>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Tambah Ukuran dan Stok Produk
        </h2>
        <TableSize productSizes={product.product_size} />
        <CreateSizeForm product_id={product.id} sizes={product.product_size} />
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
