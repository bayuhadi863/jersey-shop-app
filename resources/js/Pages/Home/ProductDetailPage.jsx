/* eslint-disable react/prop-types */
// react import
import React from "react";
// component import
import HomeLayout from "@/Layouts/HomeLayout";
import Container from "@/Components/Home/Container";
import PageTitle from "@/Components/Home/PageTitle";
import CreateCartForm from "./Partials/CreateCartForm";
// mantine import
import { Carousel } from "@mantine/carousel";
import { Image, Badge } from "@mantine/core";

const ProductDetailPage = ({ product, selectSizeData, auth }) => {
  const productImages = product.product_image;
  const productCategory = product.category;

  return (
    <HomeLayout authenticatedUser={auth.user}>
      <PageTitle>Detail Produk</PageTitle>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div>
            <Carousel loop>
              {productImages.map((item, i) => (
                <Carousel.Slide key={i}>
                  <div className="flex justify-center">
                    <Image
                      src={`/storage/product_images/${item.image}`}
                      w={300}
                      fit="contain"
                      alt="Gambar produk"
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div>
            <h1 className="text-3xl font-medium">{product.name}</h1>
            <div className="mt-6">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Klub:</p>
                <Badge variant="outline" color="blue" radius="sm">
                  {productCategory.name}
                </Badge>
              </div>
              <p className="mb-2 mt-4 font-semibold">Deskripsi:</p>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl mb-6">Pilih ukuran dan jumlah</h1>
            <CreateCartForm selectSizeData={selectSizeData} product={product} />
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
};

export default ProductDetailPage;
