/* eslint-disable react/prop-types */
// react import
import React, { useState } from "react";
// inertia import
import { useForm } from "@inertiajs/react";
//component import
import DashboardLayout from "@/Layouts/DashboardLayout";
import PageTitle from "@/Components/Dashboard/PageTitle";
import CreateSizeForm from "./Partials/CreateSizeForm";
import Container from "@/Components/Home/Container";
import TableSize from "./Partials/TableSize";
// mantine import
import { Carousel } from "@mantine/carousel";
import { Image, Select } from "@mantine/core";

const EditDetailPage = ({ product, selectCategoriesData, auth }) => {
  console.log(product);
  const productImages = product.product_image;

  const [value, setValue] = useState("");
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    category_id: "",
    price: "",
    image: [],
    description: "",
  });

  return (
    <DashboardLayout authenticatedUser={auth.user}>
      <PageTitle>Detail Produk</PageTitle>
      <p>{product.name}</p>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div>
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
          </div>


          <div>
            <h1 className="text-3xl font-medium">{product.name}</h1>
            <div className="mt-6">
              {/* SELECT CATEGORY START */}
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Klub:</p>
              <Select
                size="md"
                placeholder="Pilih kategori"
                data={selectCategoriesData}
                value={value ? value.value : ""}
                error={errors.category_id ? errors.category_id : false}
              />
              </div>
              {/* SELECT CATEGORY END */}
              
              <p className="mb-2 mt-4 font-semibold">Deskripsi:</p>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-sm mt-6"
              />
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};

export default EditDetailPage;
